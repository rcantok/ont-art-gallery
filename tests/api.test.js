// ---- api/order ve api/notify testleri: npm test ----
// Webhook yerine testin kendi açtığı sahte bir alıcı kullanılır; gerçek adrese istek gitmez.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const received = [];
let hookStatus = 200;
const hook = http.createServer((req, res) => {
  let data = "";
  req.on("data", c => (data += c));
  req.on("end", () => {
    received.push({ headers: req.headers, body: JSON.parse(data) });
    res.writeHead(hookStatus).end("ok");
  });
});

let order, notify;
before(async () => {
  await new Promise(r => hook.listen(0, "127.0.0.1", r));
  process.env.WEBHOOK_URL = `http://127.0.0.1:${hook.address().port}/hook`;
  process.env.WEBHOOK_SECRET = "test-gizli";
  ({ POST: order } = await import("../api/order.js"));
  ({ POST: notify } = await import("../api/notify.js"));
});
after(() => hook.close());

// Her test kendi IP'sini kullanır; böylece istek sınırı testler arasında karışmaz
let ipCounter = 0;
const newIp = () => `10.0.0.${++ipCounter}`;
const post = (handler, body, ip = newIp()) => handler(new Request("http://localhost/api", {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-real-ip": ip },
  body: typeof body === "string" ? body : JSON.stringify(body)
}));

const validOrder = { name: "Ali Veli", phone: "0532 123 45 67", email: "ali@gmail.com", address: "Moda Cd. 1, Kadıköy", consent: true, items: ["ont-092"] };

test("geçerli sipariş: fiyat ve toplam sunucuda katalogdan hesaplanır, gizli anahtar başlıkta gider", async () => {
  received.length = 0;
  const res = await post(order, { ...validOrder, total: 1, price: 1, items: ["ont-092", "ont-001"] });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, order: { productName: "Beyaz Elbiseli Kadın, Sazlıklı Göl", total: 95000, email: "ali@gmail.com" } });
  assert.equal(received.length, 1);
  const { headers, body } = received[0];
  assert.equal(headers["x-ont-secret"], "test-gizli");
  assert.equal(body.total, 95000);
  assert.deepEqual(body.items.map(i => i.price), [75000, 20000]);
  assert.equal(body.payment, "card-demo");
});

for (const [label, patch, field] of [
  ["e-posta ali@gmail", { email: "ali@gmail" }, "email"],
  ["yalnız boşluk ad", { name: "   " }, "name"],
  ["yalnız boşluk adres", { address: "   " }, "address"],
  ["telefon abc", { phone: "abc" }, "phone"],
  ["metin olmayan ad", { name: { $ne: "" } }, "name"],
  ["aşırı uzun adres", { address: "x".repeat(501) }, "address"]
]) {
  test(`doğrulama: ${label} → 400, webhook'a gitmez`, async () => {
    received.length = 0;
    const res = await post(order, { ...validOrder, ...patch });
    assert.equal(res.status, 400);
    assert.ok((await res.json()).errors[field]);
    assert.equal(received.length, 0);
  });
}

for (const [label, items, status] of [
  ["boş sepet", [], 400],
  ["aynı eser iki kez", ["ont-001", "ont-001"], 400],
  ["olmayan eser", ["ont-999"], 409],
  ["sepet dizi değil", "ont-001", 400]
]) {
  test(`sepet: ${label} → ${status}`, async () => {
    received.length = 0;
    const res = await post(order, { ...validOrder, items });
    assert.equal(res.status, status);
    assert.equal(received.length, 0);
  });
}

test("JSON olmayan istek → 400", async () => {
  const res = await post(order, "bu json değil");
  assert.equal(res.status, 400);
});

test("istek sınırı: aynı IP'den dakikada 10 istek geçer, 11. istek 429 alır; başka IP etkilenmez", async () => {
  const ip = newIp();
  for (let i = 1; i <= 10; i++) assert.equal((await post(order, { ...validOrder, email: "x" }, ip)).status, 400, `${i}. istek`);
  const blocked = await post(order, validOrder, ip);
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get("Retry-After")) > 0);
  assert.equal((await post(order, validOrder)).status, 200);
});

test("istek sınırı uç başına sayılır: sipariş ucu dolunca bildirim ucu açık kalır", async () => {
  const ip = newIp();
  for (let i = 0; i < 11; i++) await post(order, {}, ip);
  assert.equal((await post(notify, { name: "Ece", email: "ece@ornek.com", consent: true, productId: "ont-001" }, ip)).status, 400);
});

test("webhook hata verirse → 502", async () => {
  hookStatus = 500;
  try { assert.equal((await post(order, validOrder)).status, 502); }
  finally { hookStatus = 200; }
});

test("WEBHOOK_URL tanımlı değilse → 502, adres yanıtta görünmez", async () => {
  const saved = process.env.WEBHOOK_URL;
  delete process.env.WEBHOOK_URL;
  try {
    const res = await post(order, validOrder);
    assert.equal(res.status, 502);
    assert.doesNotMatch(await res.text(), /http/);
  } finally { process.env.WEBHOOK_URL = saved; }
});

test("bildirim: satıştaki eser için istenemez (yalnızca satılmış eser)", async () => {
  received.length = 0;
  const res = await post(notify, { name: "Ece Deneme", email: "ece@ornek.com", consent: true, productId: "ont-001" });
  assert.equal(res.status, 400);
  assert.equal(received.length, 0);
});

test("bildirim: hatalı e-posta → 400", async () => {
  const res = await post(notify, { name: "Ece Deneme", email: "ece@ornek", consent: true, productId: "ont-001" });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).errors.email);
});

test("bildirim: satılmış eser için geçerli istek → 200, fiş sözleşmeye uygun", async () => {
  const { PRODUCTS } = await import("../data/products.js");
  const p = PRODUCTS.find(x => x.id === "ont-095");
  const saved = p.original.status;
  p.original.status = "sold"; // şu an satılmış eser yok; test süresince biri satılmış sayılır
  received.length = 0;
  try {
    const res = await post(notify, { name: " Ece Deneme ", email: "ece@ornek.com", consent: true, productId: "ont-095" });
    assert.equal(res.status, 200);
    const nb = received[0].body;
    assert.equal(nb.consent, true); assert.ok(nb.consentAt);
    delete nb.consent; delete nb.consentAt;
    assert.deepEqual(nb, { event: "stock_notify", name: "Ece Deneme", productId: "ont-095", productName: "Soyut At", item: "similar", email: "ece@ornek.com", source: "ont-art-gallery" });
  } finally { p.original.status = saved; }
});

test("rıza yok: consent eksik → 400, webhook'a gitmez", async () => {
  received.length = 0;
  const { consent, ...noConsent } = validOrder;
  const res = await post(order, noConsent);
  assert.equal(res.status, 400);
  assert.ok((await res.json()).errors.consent);
  assert.equal(received.length, 0);
});

test("rıza false → 400", async () => {
  const res = await post(order, { ...validOrder, consent: false });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).errors.consent);
});

test("rıza string 'true' sayılmaz → 400 (yalnızca gerçek boolean)", async () => {
  const res = await post(order, { ...validOrder, consent: "true" });
  assert.equal(res.status, 400);
});

test("geçerli siparişte fişe consent ve consentAt eklenir", async () => {
  received.length = 0;
  const res = await post(order, validOrder);
  assert.equal(res.status, 200);
  assert.equal(received[0].body.consent, true);
  assert.match(received[0].body.consentAt, /^\d{4}-\d{2}-\d{2}T/);
});

test("bildirimde rıza yoksa → 400", async () => {
  const res = await post(notify, { name: "Ece", email: "ece@ornek.com", productId: "ont-001" });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).errors.consent);
});
