---
name: ont-standartlari
description: ONT Art Gallery (AtölyeKart) React sayfasının kuralları — bileşen standartları ve sipariş / stok bildirimi webhook veri formatı. index.html'de bileşen yazarken ya da değiştirirken, form veya webhook kurarken kullan.
---

# ONT Art Gallery standartları

İki bölüm: **bileşenler** (`index.html`'deki her React bileşeni) ve **webhook** (Sipariş ve Benzerini Haber Ver formlarının gönderdiği veri). Projenin iş bağlamı ve `PRODUCTS` alanları CLAUDE.md'dedir.

## Bileşen standartları

**Yapı**
- Tek dosya, kurulumsuz: React 18 UMD + Babel standalone CDN'den; npm, derleme adımı ve ek dosya yok. Stiller dosyanın içindeki `<style>`'da.
- Her bileşen tek bir işi yapar ve başında tek satırlık yorum taşır: `// ---- Ad: ne yapar ----`.
- Dosya sırası: `PRODUCTS` → yardımcılar → bileşenler (sayfadaki sırayla) → `App` → `render`.

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

Site çok sayfalı bir mağazadır (hash yönlendirme: `#/`, `#/eser/<id>`, `#/sanatci`, `#/iletisim`, `#/sepet`, `#/siparis`, `#/hesap`). İki olay `POST` ile `WEBHOOK_URL`'ye tek bir JSON nesnesi olarak gider (`sendWebhook`). Baskı satışı yoktur; her eser tek orijinaldir.

### Sipariş — `event: "order"` (Sipariş sayfası, sepetin tamamı)

```json
{
  "event": "order",
  "name": "Deniz Test",
  "productId": "ont-001,ont-064",
  "productName": "Sazlıklı Göl, Kızıl Liman",
  "items": [
    { "productId": "ont-001", "productName": "Sazlıklı Göl", "price": 8000 },
    { "productId": "ont-064", "productName": "Kızıl Liman", "price": 12500 }
  ],
  "quantity": 2,
  "total": 20500,
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
| `items` | Her eser: `productId` (= `id`), `productName` (= `title`), `price` (sayı, TL) — hepsi `PRODUCTS`'tan, formdan alınmaz |
| `quantity` | Eser sayısı (her orijinal tek adet; sepete bir eser en fazla bir kez girer) |
| `total` | `items` fiyatlarının toplamı, sayı. Kargo dahil değil (onayda bildirilir) |
| `name`, `email`, `phone`, `address` | Formdan, zorunlu, baş/son boşluk kırpılır. `phone` ve `address` yalnızca siparişte |
| `payment` | Sabit `"card-demo"` |
| `item` | Yalnızca `stock_notify`'da, sabit `"similar"` |
| `source` | Sabit `"ont-art-gallery"` |

### Ödeme formu bir demodur — kart verisi asla gönderilmez

Sipariş sayfasındaki kart alanlarının `name` özniteliği yoktur ve kod tarafından okunmaz; `autoComplete="off"` taşırlar. Fişe yalnızca `"payment": "card-demo"` girer. Kart numarası, son kullanma, CVC ya da kart üzerindeki ad hiçbir koşulda payload'a, `localStorage`'a ya da konsola yazılmaz. Gerçek ödeme (iyzico, Stripe) ancak sunucu tarafında ve ödeme sağlayıcısının kendi formuyla yapılır.

### Gönderim ve geri bildirim

- Gönderim sürerken düğme pasif ve "Gönderiliyor…" yazar. `res.ok` ise onay görünür (siparişte sepet boşalır); değilse form ve yazılanlar kalır, hata metni gösterilir.
- `WEBHOOK_URL` dosyanın başında tek sabittir. Hafta 1'de webhook.site test adresidir (herkese açık, geçici): testte gerçek ad, telefon, adres kullanılmaz. Sunucuya taşıma Hafta 2'de.
- webhook.site adresinde CORS varsayılan olarak kapalıdır; `application/json` gönderimi tarayıcıda ön kontrol (OPTIONS) isteği yapar. Açmak için: `curl -X PUT https://webhook.site/token/<uuid> -H 'Content-Type: application/json' -d '{"cors": true}'`.
- Doğrulama: `window.fetch`'i test kopyasında yakalayıp payload'ı alan alan kontrol et; kart verisinin payload'da olmadığını ayrıca doğrula. Son kanıt için webhook.site'ta gelen gövdeyi aç.
