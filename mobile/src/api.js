// ---- Sunucuya form gönderimi: /api/order ve /api/notify (web sitesindeki postForm'un aynısı) ----
// Fiş (ad, fiyat, toplam) sunucuda katalogdan kurulur; uygulama yalnızca form alanlarını ve ürün kimliğini yollar.
import { API_BASE } from "./config";

export async function postForm(path, body) {
  try {
    const res = await fetch(API_BASE + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return res.ok ? { ok: true, ...data } : { ok: false, error: data.error ?? "Gönderilemedi.", errors: data.errors ?? {} };
  } catch (err) {
    return { ok: false, error: "Bağlantı kurulamadı.", errors: {} };
  }
}
