// ---- Yerel geliştirme sunucusu: npm run dev (varsayılan port 8780) ----
// Statik dosyaları ve api/<ad>.js uçlarını Vercel'deki gibi sunar; vercel.json güvenlik başlıklarını da ekler.
// .env.local'daki geliştirme değerlerini okur. Nokta ile başlayan dosyalar (.env.local vb.) asla sunulmaz.
// Aynı Wi-Fi'daki telefon (Expo Go) bu sunucuya Mac'in yerel IP adresiyle bağlanır.
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2] || process.env.PORT || 8780);
try { process.loadEnvFile(path.join(root, ".env.local")); } catch { console.warn(".env.local bulunamadı; webhook'a iletim çalışmaz"); }

let securityHeaders = {};
try {
  const config = JSON.parse(await readFile(path.join(root, "vercel.json"), "utf8"));
  securityHeaders = Object.fromEntries(config.headers.flatMap(h => h.headers.map(x => [x.key, x.value])));
} catch {}

const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json" };

http.createServer(async (req, res) => {
  for (const [k, v] of Object.entries(securityHeaders)) res.setHeader(k, v);
  const url = new URL(req.url, "http://localhost");

  if (url.pathname.startsWith("/api/")) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const mod = await import(pathToFileURL(path.join(root, "api", path.basename(url.pathname) + ".js")).href).catch(() => null);
    if (!mod?.[req.method]) { res.writeHead(mod ? 405 : 404).end(); return; }
    const headers = { ...req.headers, "x-real-ip": req.socket.remoteAddress };
    const response = await mod[req.method](new Request(url, { method: req.method, headers, body: req.method === "GET" ? undefined : Buffer.concat(chunks) }));
    res.writeHead(response.status, Object.fromEntries(response.headers)).end(Buffer.from(await response.arrayBuffer()));
    return;
  }

  const rel = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const file = path.join(root, rel);
  if (!file.startsWith(root + path.sep) || rel.split("/").some(s => s.startsWith("."))) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" }).end(data);
  } catch {
    res.writeHead(404).end();
  }
}).listen(port, "0.0.0.0", () => console.log(`hazır: http://localhost:${port}`));
