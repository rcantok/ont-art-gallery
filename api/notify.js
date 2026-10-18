// ---- POST /api/notify: satılmış eser için "Benzerini haber ver" isteğini doğrular ve webhook'a iletir ----
import { PRODUCTS } from "../data/products.js";
import { validateFields } from "../lib/validate.js";
import { json, limitOrNull, readBody, pickFields, forwardToWebhook } from "../lib/server.js";

export async function POST(request) {
  const limited = limitOrNull(request, "notify");
  if (limited) return limited;

  const body = await readBody(request);
  if (!body) return json(400, { error: "İstek okunamadı." });

  const f = pickFields(body, ["name", "email"]);
  const errors = validateFields({ ...f, consent: body.consent });
  if (Object.keys(errors).length) return json(400, { error: "Formda düzeltilmesi gereken alanlar var.", errors });

  const product = PRODUCTS.find(p => p.id === body.productId);
  if (!product || product.original.status !== "sold") return json(400, { error: "Bu eser için bildirim istenemez." });

  const payload = {
    event: "stock_notify",
    name: f.name.trim(),
    productId: product.id,
    productName: product.title,
    item: "similar",
    email: f.email.trim(),
    consent: true,
    consentAt: new Date().toISOString(),
    source: "ont-art-gallery"
  };

  if (!(await forwardToWebhook(payload))) return json(502, { error: "İstek şu an iletilemedi." });
  return json(200, { ok: true });
}
