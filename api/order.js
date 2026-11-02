// ---- POST /api/order: sipariş formunu doğrular, fişi sunucuda kurar ve webhook'a iletir ----
// Tarayıcı yalnızca iletişim bilgilerini ve sepet kalemlerini ({ productId, quantity }) gönderir.
// Ad, fiyat, stok ve adet sınırı her zaman lib/catalog.js'ten okunur; tarayıcıdan gelen fiyata güvenilmez.
import { resolveItem } from "../lib/catalog.js";
import { validateFields } from "../lib/validate.js";
import { json, limitOrNull, readBody, pickFields, forwardToWebhook } from "../lib/server.js";

const MAX_ITEMS = 20;

export async function POST(request) {
  const limited = limitOrNull(request, "order");
  if (limited) return limited;

  const body = await readBody(request);
  if (!body) return json(400, { error: "İstek okunamadı." });

  const f = pickFields(body, ["name", "phone", "email", "address"]);
  const errors = validateFields({ ...f, consent: body.consent });
  if (Object.keys(errors).length) return json(400, { error: "Formda düzeltilmesi gereken alanlar var.", errors });

  // Kalemler: [{ productId, quantity }], her ürün en fazla bir kalemde
  const raw = Array.isArray(body.items) ? body.items : [];
  const wellFormed = raw.every(i => i && typeof i === "object" && typeof i.productId === "string" && Number.isInteger(i.quantity));
  if (raw.length === 0 || raw.length > MAX_ITEMS || !wellFormed || new Set(raw.map(i => i.productId)).size !== raw.length) {
    return json(400, { error: "Sepet geçersiz." });
  }
  const lines = raw.map(i => ({ ...resolveItem(i.productId), quantity: i.quantity, known: !!resolveItem(i.productId) }));
  const missing = lines.find(l => !l.known);
  if (missing) return json(409, { error: "Sepetteki bir ürün artık katalogda yok. Sepetinizi kontrol edin." });
  const unavailable = lines.find(l => l.stock === 0);
  if (unavailable) {
    return json(409, { error: unavailable.kind === "magnet"
      ? `${unavailable.productName} tükendi. Sepetinizden çıkarıp "Stok gelince haber ver" formunu kullanabilirsiniz.`
      : `${unavailable.productName} artık satışta değil. Sepetinizi kontrol edin.` });
  }
  const badQty = lines.find(l => l.quantity < 1 || l.quantity > l.maxQty);
  if (badQty) return json(400, { error: `${badQty.productName} için en fazla ${badQty.maxQty} adet sipariş verilebilir.` });

  // Fiş ont-standartlari sözleşmesine göre; kart bilgisi hiçbir zaman fişe girmez
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const payload = {
    event: "order",
    name: f.name.trim(),
    productId: lines.map(l => l.productId).join(","),
    productName: lines.map(l => l.productName).join(", "),
    items: lines.map(l => ({ productId: l.productId, productName: l.productName, kind: l.kind, price: l.price, quantity: l.quantity, prepDays: l.prepDays })),
    quantity: lines.reduce((sum, l) => sum + l.quantity, 0),
    total,
    demo: lines.some(l => l.kind === "magnet"),
    phone: f.phone.trim(),
    email: f.email.trim(),
    address: f.address.trim(),
    payment: "card-demo",
    consent: true,
    consentAt: new Date().toISOString(),
    source: "ont-art-gallery"
  };

  if (!(await forwardToWebhook(payload))) return json(502, { error: "Sipariş şu an iletilemedi." });
  return json(200, { ok: true, order: { productName: payload.productName, total, email: payload.email, demo: payload.demo } });
}
