---
name: ont-standartlari
description: ONT Art Gallery (AtölyeKart) React sayfasının kuralları — bileşen standartları ve sipariş / stok bildirimi webhook veri formatı. index.html'de bileşen yazarken ya da değiştirirken, form veya webhook kurarken kullan.
---

# ONT Art Gallery standartları

İki bölüm: **bileşenler** (`index.html`'deki her React bileşeni) ve **webhook** (Sipariş ve Benzerini Haber Ver formlarının gönderdiği veri). Projenin iş bağlamı ve `PRODUCTS` alanları CLAUDE.md'dedir.

## Bileşen standartları

**Yapı**
- Sayfa tek dosya, kurulumsuz: React 18 UMD + Babel standalone CDN'den, derleme adımı yok, stiller dosyanın içindeki `<style>`'da. Sunucuyla ortak olanlar ayrı ES modülleridir ve sayfaya `<script type="module">` ile gelir: eser kataloğu `data/products.js` (`window.ONT_PRODUCTS`), form kuralları `lib/validate.js` (`window.ONT_VALIDATE`). Sunucu fonksiyonları `api/`, yardımcıları `lib/`, testleri `tests/` (`npm test`).
- Her bileşen tek bir işi yapar ve başında tek satırlık yorum taşır: `// ---- Ad: ne yapar ----`.
- Dosya sırası: sabitler → yardımcılar → bileşenler (sayfadaki sırayla) → `App` → `render`.

**Veri**
- Eser bilgisi yalnızca `PRODUCTS`'tan okunur; bileşenin içine ad, fiyat, ölçü, görsel yolu yazılmaz.
- Bir eseri taşıyan bileşen tek bir `product` prop'u alır; sayfalar eseri `id` ile `byId`'den bulur. Prop adı gönderen ve alan tarafta harfi harfine aynıdır — uyuşmazsa `product` `undefined` gelir ve sayfa beyaz kalır (1.4'te yaşandı).
- Ekrandaki metin veriden yardımcılarla türetilir: fiyat `formatPrice`, künye `metaLine`, etiketler `tagsOf`, durum `STATUS_LABELS`, satın alınabilirlik `isBuyable`. Aynı biçimlendirmeyi bileşende yeniden yazmak yerine yardımcıyı kullan ya da genişlet.
- Bilinmeyen bilgi `null` kalır ve ekranda "yakında" olarak görünür.

**Görsel ve stil**
- Eser görseli her yerde `ProductImage` ile, `object-fit: contain` olarak — eser kırpılmaz (yalnızca hero dekoratiftir).
- Her `<img>` betimleyici `alt`, gerçek `width` ve `height` taşır.
- Renkler `:root` değişkenlerinden (`--accent`, `--ink`, `--muted`, `--matte`); palete yeni renk eklenmez. Yazı tipleri: başlık Archivo, logo Bodoni Moda, metin Manrope.
- Metinler galeri dilinde: sade, saygılı, eseri anlatan; kampanya ve indirim dili kullanılmaz.

**Erişilebilirlik**
- Tıklanan her şey `<button>` ya da `<a>`; yazısız düğmeler `aria-label` taşır.
- Sayfa geçişleri gerçek bağlantıdır (`<a href="#/...">`); tarayıcının geri/ileri tuşu çalışır, yeni sayfada en üste kaydırılır. Etkin menü öğesi `aria-current="page"` taşır.
- Dokunma hedefleri en az 44 px.

**Değişiklikten sonra**
Headless Chrome ile ekran görüntüsü al ve konsolu oku (Babel uyarısı dışında hata olmamalı). Görünüşü değiştirmeyen bir yeniden düzenlemede ekran metinlerini ve tam sayfa görüntüsünü öncesiyle karşılaştır.

## Webhook formatı

Site çok sayfalı bir mağazadır (hash yönlendirme: `#/`, `#/eser/<id>`, `#/sanatci`, `#/iletisim`, `#/sepet`, `#/siparis`, `#/hesap`, `#/gizlilik`). Tarayıcı form alanlarını ve sepet kalemlerini (`items: [{ productId, quantity }]`) sitenin kendi API'sine yollar (`postForm` → `/api/order`, `/api/notify`). Sunucu alanları `lib/validate.js` ile yeniden doğrular, fişi `lib/catalog.js` (`resolveItem`) ile katalogdan kurar ve `WEBHOOK_URL`'ye tek bir JSON nesnesi olarak iletir (`forwardToWebhook`, `X-ONT-Secret` başlığıyla). Baskı satışı yoktur. Ürün iki türdür: orijinal eser (`ont-001`, tek adet) ve demo magnet (`mag-ont-001`, 1.000 TL, stok 2, siparişte en fazla 2).

### Sipariş — `event: "order"` (Sipariş sayfası, sepetin tamamı)

```json
{
  "event": "order",
  "name": "Deniz Test",
  "productId": "mag-ont-001,ont-001",
  "productName": "Sazlıklı Göl — Magnet, Sazlıklı Göl",
  "items": [
    { "productId": "mag-ont-001", "productName": "Sazlıklı Göl — Magnet", "kind": "magnet", "price": 1000, "quantity": 2, "prepDays": 3 },
    { "productId": "ont-001", "productName": "Sazlıklı Göl", "kind": "original", "price": 20000, "quantity": 1, "prepDays": null }
  ],
  "quantity": 3,
  "total": 22000,
  "demo": true,
  "phone": "+90 555 000 00 00",
  "email": "deniz.test@ornek.com",
  "address": "Işık Mah. Deneme Sok. No: 3 D: 4, Kadıköy / İstanbul",
  "payment": "card-demo",
  "source": "ont-art-gallery"
}
```

### Benzerini haber ver — `event: "stock_notify"` (yalnızca `original.status: "sold"` eserin sayfasında)

```json
{
  "event": "stock_notify",
  "name": "Ece Deneme",
  "productId": "ont-095",
  "productName": "Soyut At",
  "item": "similar",
  "email": "ece.deneme@ornek.com",
  "source": "ont-art-gallery"
}
```

### Alan kuralları

| Alan | Kural |
|---|---|
| `productId` / `productName` | Ödev sözleşmesi tek eser bekler; sepet birden çok eser taşıdığı için virgülle birleştirilmiş kimlik/ad. Ayrıntı `items`'ta |
| `items` | Her kalem: `productId`, `productName`, `kind` (`original` / `magnet`), `price` (birim, TL), `quantity`, `prepDays` (magnette iş günü, orijinalde `null`) — ad/fiyat/sınır `lib/catalog.js`'ten, formdan alınmaz |
| `quantity` | Toplam adet (kalem adetlerinin toplamı). Orijinal 1; magnet 1–2 ve stoktan fazla olamaz (aşılırsa 400, tükenmişse 409) |
| `total` | Σ fiyat × adet, sayı. Kargo dahil değil (onayda bildirilir) |
| `demo` | Sepette magnet varsa `true` (magnetler demo: gönderim yapılmaz) |
| `name`, `email`, `phone`, `address` | Formdan, zorunlu, baş/son boşluk kırpılır. `phone` ve `address` yalnızca siparişte |
| `payment` | Sabit `"card-demo"` (yalnızca siparişte) |
| `consent` | KVKK açık rıza; her iki olayda sabit `true` (sunucu, formdaki rıza kutusu işaretli değilse isteği reddeder) |
| `consentAt` | Rızanın alındığı an, ISO 8601; sunucu ekler |
| `item` | Yalnızca `stock_notify`'da: tükenmiş magnet için `"restock"` (`productId: "mag-…"`, ad "… — Magnet"), satılmış orijinal için `"similar"`. Diğer ürünlerde istek 400 |
| `source` | Sabit `"ont-art-gallery"` |

### Ödeme formu bir demodur — kart verisi asla gönderilmez

Sipariş sayfasındaki kart alanlarının `name` özniteliği yoktur ve kod tarafından okunmaz; `autoComplete="off"` taşırlar. Fişe yalnızca `"payment": "card-demo"` girer. Kart numarası, son kullanma, CVC ya da kart üzerindeki ad hiçbir koşulda payload'a, `localStorage`'a ya da konsola yazılmaz. Gerçek ödeme (iyzico, Stripe) ancak sunucu tarafında ve ödeme sağlayıcısının kendi formuyla yapılır.

### Gönderim ve geri bildirim

- Gönderim sürerken düğme pasif ve "Gönderiliyor…" yazar. Başarılıysa onay görünür (siparişte sepet boşalır); değilse form ve yazılanlar kalır, sunucunun Türkçe hata metni gösterilir, sunucunun döndürdüğü alan hataları alanların altına yazılır.
- `WEBHOOK_URL` ve `WEBHOOK_SECRET` yalnızca ortam değişkenidir: yerelde `.env.local` (git'e ve Vercel'e girmez), canlıda Vercel → Environment Variables. Tarayıcı koduna, `data/`'ya ya da `lib/validate.js`'e hiçbir adres veya anahtar yazılmaz. Webhook.site test adresidir: testte gerçek ad, telefon, adres kullanılmaz.
- Sunucu yanıtları: 200 başarılı, 400 hatalı alan/istek (`errors`), 409 eser artık satışta değil, 429 istek sınırı (aynı IP, aynı uç, dakikada 10; `Retry-After`), 502 webhook'a iletilemedi.
- Doğrulama: önce `npm test` (sahte alıcıyla; gerçek webhook'a gitmez). Uçtan uca denemede fişi webhook.site'ta alan alan ve `X-ONT-Secret` başlığıyla kontrol et; kart verisinin fişte olmadığını ayrıca doğrula.
