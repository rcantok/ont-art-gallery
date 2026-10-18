// ---- POST /api/order: sipariş formunu doğrular, fişi sunucuda kurar ve webhook'a iletir ----
// Tarayıcı yalnızca iletişim bilgilerini ve eser kimliklerini gönderir. Eser adı, fiyat ve toplam
// her zaman PRODUCTS'tan okunur; tarayıcıdan gelen fiyata güvenilmez.
import { PRODUCTS } from "../data/products.js";
import { validateFields } from "../lib/validate.js";
import { json, limitOrNull, readBody, pickFields, forwardToWebhook } from "../lib/server.js";

const MAX_ITEMS = 20;

export async function POST(request) {
  const limited = limitOrNull(request, "order");
  if (limited) return limited;

  const body = await readBody(request);
  if (!body) return json(400, { error: "İstek okunamadı." });

  const f = pickFields(body, ["name", "phone", "email", "address"]);
  const errors = validateFields(f);
  if (Object.keys(errors).length) return json(400, { error: "Formda düzeltilmesi gereken alanlar var.", errors });

  const ids = Array.isArray(body.items) ? body.items : [];
  if (ids.length === 0 || ids.length > MAX_ITEMS || new Set(ids).size !== ids.length) return json(400, { error: "Sepet geçersiz." });
  const items = ids.map(id => PRODUCTS.find(p => p.id === id));
  if (items.some(p => !p || p.original.status !== "available" || p.original.price == null)) {
    return json(409, { error: "Sepetteki eserlerden biri artık satışta değil. Sepetinizi kontrol edin." });
  }

  // Fiş ont-standartlari sözleşmesine göre; kart bilgisi hiçbir zaman fişe girmez
  const total = items.reduce((sum, p) => sum + p.original.price, 0);
  const payload = {
    event: "order",
    name: f.name.trim(),
    productId: items.map(p => p.id).join(","),
    productName: items.map(p => p.title).join(", "),
    items: items.map(p => ({ productId: p.id, productName: p.title, price: p.original.price })),
    quantity: items.length,
    total,
    phone: f.phone.trim(),
    email: f.email.trim(),
    address: f.address.trim(),
    payment: "card-demo",
    source: "ont-art-gallery"
  };

  if (!(await forwardToWebhook(payload))) return json(502, { error: "Sipariş şu an iletilemedi." });
  return json(200, { ok: true, order: { productName: payload.productName, total, email: payload.email } });
}
