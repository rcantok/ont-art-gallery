// ---- İstek sınırı: aynı IP'den aynı uca dakikada en fazla 10 istek ----
// Sayaç sunucu belleğinde tutulur. Vercel birden çok kopya çalıştırırsa her kopya ayrı sayar;
// bu yüzden sınır gerçekte biraz gevşektir. Kalıcı ve ortak sayaç gerekirse Upstash Redis'e taşınır.
export const LIMIT = 10;
export const WINDOW_MS = 60_000;

const windows = new Map(); // "uç:ip" -> { start, count }

// İzin verilirse null, aşıldıysa kaç saniye sonra yeniden denenebileceğini döner
export function rateLimit(key, now = Date.now()) {
  if (windows.size > 5000) {
    for (const [k, w] of windows) if (now - w.start >= WINDOW_MS) windows.delete(k);
  }
  const w = windows.get(key);
  if (!w || now - w.start >= WINDOW_MS) {
    windows.set(key, { start: now, count: 1 });
    return null;
  }
  w.count += 1;
  return w.count > LIMIT ? Math.ceil((w.start + WINDOW_MS - now) / 1000) : null;
}
