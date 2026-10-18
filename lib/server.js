// ---- Sunucu fonksiyonlarının ortak yardımcıları (yalnızca api/ kullanır) ----
import { rateLimit } from "./rate-limit.js";

export const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...headers } });

// Vercel ziyaretçinin IP'sini x-real-ip'e yazar; yerelde başlık yoksa tek bir anahtar kullanılır
const clientIp = request =>
  request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "yerel";

// Sınır aşıldıysa hazır 429 yanıtı, değilse null
export function limitOrNull(request, route) {
  const retryAfter = rateLimit(`${route}:${clientIp(request)}`);
  return retryAfter == null ? null : json(429, { error: "Çok fazla deneme yapıldı. Bir dakika sonra tekrar deneyin." }, { "Retry-After": String(retryAfter) });
}

// İstek gövdesini okur; JSON değilse ya da nesne değilse null
export async function readBody(request) {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

// Metni fişe girmeden temizler: kontrol karakterleri (satır sonu dahil) boşluğa döner, < ve > atılır.
// Fiş ileride e-postaya ya da bir panele düşerse içindeki metin HTML/kod olarak çalışamaz.
export const cleanText = s => s.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/[<>]/g, "");

// Formdan yalnızca beklenen metin alanlarını alır ve temizler; metin olmayan değer boş sayılır
export const pickFields = (body, names) => Object.fromEntries(names.map(n => [n, typeof body[n] === "string" ? cleanText(body[n]) : ""]));

// Fişi webhook'a iletir. Adres ve gizli anahtar yalnızca sunucudaki ortam değişkenlerindedir; tarayıcıya hiç gitmez.
export async function forwardToWebhook(payload) {
  const url = process.env.WEBHOOK_URL;
  if (!url) {
    console.error("WEBHOOK_URL tanımlı değil");
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-ONT-Secret": process.env.WEBHOOK_SECRET ?? "" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) console.error("webhook yanıtı", res.status);
    return res.ok;
  } catch (err) {
    console.error("webhook'a ulaşılamadı", err.name);
    return false;
  }
}
