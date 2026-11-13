// ---- n8n/ont-sheets-workflow.json: Sheets'e atomik kayıt ve yalnızca gönderim izinli Gmail ----
// n8n'in Google Sheets append node'u boş satırı kendisi hesaplar: aynı anda gelen iki sipariş aynı satıra
// yazılıp birbirini siler. Kayıt Google'ın values.append API'siyle (RAW, INSERT_ROWS) yapılır.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const wf = JSON.parse(readFileSync(new URL("../n8n/ont-sheets-workflow.json", import.meta.url), "utf8"));
const node = name => wf.nodes.find(n => n.name === name);
const next = (from, out = 0) => (wf.connections[from]?.main[out] ?? []).map(l => l.node);

// Code node'unu n8n'deki gibi çalıştırır: $json = giriş, $('ONT Webhook') = webhook gövdesi
const runCode = (name, input, body = {}) => {
  const $ = n => ({ first: () => ({ json: n === "ONT Webhook" ? { body } : {} }) });
  return vm.runInNewContext(`(function(){${node(name).parameters.jsCode}})()`, { $json: input, $input: { first: () => ({ json: input }) }, $ });
};

test("n8n'in Sheets ve tam yetkili Gmail node'ları kullanılmaz", () => {
  assert.ok(!wf.nodes.some(n => n.type === "n8n-nodes-base.googleSheets"));
  assert.ok(!wf.nodes.some(n => n.type === "n8n-nodes-base.gmail"));
  assert.ok(!JSON.stringify(wf).includes("gmailOAuth2"));
});

for (const [tab, head, rowNode, save, ok, out] of [
  ["Siparisler", "Siparisler başlıkları", "Sipariş satırı", "Siparisler'e ekle", "200 sipariş kaydedildi", 0],
  ["Bildirimler", "Bildirimler başlıkları", "Bildirim satırı", "Bildirimler'e ekle", "200 bildirim kaydedildi", 1]
]) {
  test(`${tab}: başlık satırı okunur, satır başlıklara göre dizilir, values.append (RAW) ile eklenir`, () => {
    assert.deepEqual(next("Olay türü", out), [head]);
    const h = node(head).parameters;
    assert.equal(h.method, "GET");
    assert.match(h.url, new RegExp(`^https://sheets\\.googleapis\\.com/v4/spreadsheets/[^/]+/values/${tab}!1:1$`));
    assert.deepEqual(next(head), [rowNode]);
    assert.deepEqual(next(rowNode), [save]);
    const s = node(save);
    assert.equal(s.type, "n8n-nodes-base.httpRequest");
    assert.equal(s.parameters.method, "POST");
    assert.match(s.parameters.url, new RegExp(`/values/${tab}!A1:append\\?valueInputOption=RAW&insertDataOption=INSERT_ROWS$`));
    assert.equal(s.parameters.jsonBody, "={{ JSON.stringify({ values: $json.values }) }}");
    for (const n of [head, save]) {
      assert.equal(node(n).parameters.nodeCredentialType, "googleSheetsOAuth2Api");
      assert.equal(node(n).credentials.googleSheetsOAuth2Api.name, "Google Sheets account");
    }
    assert.deepEqual(next(save), [ok]);
  });
}

test("satır kodu: değerler Sheet'teki sütun sırasına göre, bilinmeyen sütun boş, nesne JSON olur", () => {
  const body = { name: "=HYPERLINK(\"x\")", email: "a@b.co", total: 1000, demo: true, items: [{ productId: "mag-ont-001" }] };
  const [{ json }] = runCode("Sipariş satırı", { values: [["email", "name", "notlar", "total", "demo", "items"]] }, body);
  assert.deepEqual(JSON.parse(JSON.stringify(json.values)), [["a@b.co", "=HYPERLINK(\"x\")", "", 1000, true, '[{"productId":"mag-ont-001"}]']]);
});

test("satır kodu: başlık satırı yoksa kayıt yapılmaz (hata verir, sessizce boş satır eklenmez)", () =>
  assert.throws(() => runCode("Bildirim satırı", {}, { name: "x" }), /başlık/));

test("teşekkür maili yalnızca izinli adrese, gmail.send izinli bağlantıyla Gmail API'den gider", () => {
  assert.deepEqual(next("İzinli adres mi?", 0), ["Gmail ham mesaj"]);
  assert.deepEqual(next("Gmail ham mesaj"), ["Gmail: teşekkür gönder"]);
  const g = node("Gmail: teşekkür gönder");
  assert.equal(g.type, "n8n-nodes-base.httpRequest");
  assert.equal(g.parameters.url, "https://gmail.googleapis.com/gmail/v1/users/me/messages/send");
  assert.equal(g.parameters.nodeCredentialType, "googleOAuth2Api");
  assert.equal(g.credentials.googleOAuth2Api.name, "Gmail-Send-only");
  assert.equal(g.parameters.jsonBody, "={{ JSON.stringify({ raw: $json.raw }) }}");
});

test("ham mesaj: UTF-8 konu, tek alıcı, satır sonu enjeksiyonu yok", () => {
  const [{ json }] = runCode("Gmail ham mesaj", { to: "ayse@ornek.com\r\nBcc: kotu@x.co", subject: "Siparişiniz alındı\r\nBcc: y", body: "Merhaba Ayşe,\nTeşekkürler." });
  const msg = Buffer.from(json.raw.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  const [head, text] = msg.split("\r\n\r\n");
  const headers = head.split("\r\n");
  assert.ok(headers.includes("To: ayse@ornek.com"));
  assert.ok(!/^Bcc:/m.test(head));
  assert.match(head, /^From: =\?UTF-8\?B\?.+\?= <ragipcantok@gmail\.com>$/m);
  const subj = /^Subject: =\?UTF-8\?B\?(.+)\?=$/m.exec(head)[1];
  assert.equal(Buffer.from(subj, "base64").toString("utf8"), "Siparişiniz alındı Bcc: y");
  assert.equal(text, "Merhaba Ayşe,\r\nTeşekkürler.");
  assert.doesNotMatch(json.raw, /[+/=]/);
});
