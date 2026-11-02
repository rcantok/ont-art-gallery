// ---- POST /api/notify: "Stok bildirimi iste" isteğini doğrular ve webhook'a iletir ----
// İki durumda kabul edilir: tükenmiş demo magnet ("restock": stok gelince haber ver)
// ya da satılmış orijinal eser ("similar": benzeri gelince haber ver). Durum lib/catalog.js'ten okunur.
import { resolveItem } from "../lib/catalog.js";
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

  const target = resolveItem(body.productId);
  const item = !target ? null
    : target.kind === "magnet" && target.stock === 0 ? "restock"
    : target.kind === "original" && target.product.original.status === "sold" ? "similar"
    : null;
  if (!item) return json(400, { error: "Bu ürün için bildirim istenemez." });

  const payload = {
    event: "stock_notify",
    name: f.name.trim(),
    productId: target.productId,
    productName: target.productName,
    item,
    email: f.email.trim(),
    consent: true,
    consentAt: new Date().toISOString(),
    source: "ont-art-gallery"
  };

  if (!(await forwardToWebhook(payload))) return json(502, { error: "İstek şu an iletilemedi." });
  return json(200, { ok: true });
}
