---
name: ont-standartlari
description: ONT Art Gallery (AtölyeKart) React sayfasının kuralları — bileşen standartları ve sipariş / stok bildirimi webhook veri formatı. index.html'de bileşen yazarken ya da değiştirirken, form veya webhook kurarken kullan.
---

# ONT Art Gallery standartları

İki bölüm: **bileşenler** (`index.html`'deki her React bileşeni) ve **webhook** (Sipariş Ver ve Baskı Çıkınca Haber Ver formlarının gönderdiği veri). Projenin iş bağlamı ve `PRODUCTS` alanları CLAUDE.md'dedir.

## Bileşen standartları

**Yapı**
- Tek dosya, kurulumsuz: React 18 UMD + Babel standalone CDN'den; npm, derleme adımı ve ek dosya yok. Stiller dosyanın içindeki `<style>`'da.
- Her bileşen tek bir işi yapar ve başında tek satırlık yorum taşır: `// ---- Ad: ne yapar ----`.
- Dosya sırası: `PRODUCTS` → yardımcılar → bileşenler (sayfadaki sırayla) → `App` → `render`.

**Veri**
- Eser bilgisi yalnızca `PRODUCTS`'tan okunur; bileşenin içine ad, fiyat, ölçü, görsel yolu yazılmaz.
- Bir eseri taşıyan bileşen tek bir `product` prop'u alır. Prop adı gönderen ve alan tarafta harfi harfine aynıdır — uyuşmazsa `product` `undefined` gelir ve sayfa beyaz kalır (1.4'te yaşandı).
- Ekrandaki metin veriden yardımcılarla türetilir: fiyat `formatPrice`, künye `metaLine`, etiketler `tagsOf`, durum `STATUS_LABELS`. Aynı biçimlendirmeyi bileşende yeniden yazmak yerine yardımcıyı kullan ya da genişlet.
- Bilinmeyen bilgi `null` kalır ve ekranda "yakında" olarak görünür.

**Görsel ve stil**
- Eser görseli her yerde `ProductImage` ile, `object-fit: contain` olarak — eser kırpılmaz (yalnızca hero dekoratiftir).
- Her `<img>` betimleyici `alt`, gerçek `width` ve `height` taşır.
- Renkler `:root` değişkenlerinden (`--accent`, `--ink`, `--muted`, `--matte`); palete yeni renk eklenmez. Yazı tipleri: başlık Archivo, logo Bodoni Moda, metin Manrope.
- Metinler galeri dilinde: sade, saygılı, eseri anlatan; kampanya ve indirim dili kullanılmaz.

**Erişilebilirlik**
- Tıklanan her şey `<button>` ya da `<a>`; yazısız düğmeler `aria-label` taşır.
- Klavye: pencereler Escape ile kapanır, açılınca odak içeri girer, kapanınca odak açan öğeye döner; ok tuşları önceki/sonraki.
- Dokunma hedefleri en az 44 px.

**Değişiklikten sonra**
Headless Chrome ile ekran görüntüsü al ve konsolu oku (Babel uyarısı dışında hata olmamalı). Görünüşü değiştirmeyen bir yeniden düzenlemede ekran metinlerini ve tam sayfa görüntüsünü öncesiyle karşılaştır.

## Webhook formatı

Formlar bir olay olduğunda tek bir JSON nesnesini `POST` ile `WEBHOOK_URL`'ye gönderir.

### Sipariş — `event: "order"`

```json
{
  "event": "order",
  "name": "Ayşe Yılmaz",
  "productId": "ont-002",
  "productName": "Soyut Kompozisyon",
  "item": "original",
  "price": 12500,
  "quantity": 1,
  "phone": "+90 532 000 00 00",
  "email": "ayse@ornek.com",
  "address": "Işık Mah. Örnek Sok. No: 3 D: 4, Kadıköy / İstanbul",
  "source": "ont-art-gallery"
}
```

### Stok bildirimi — `event: "stock_notify"`

```json
{
  "event": "stock_notify",
  "name": "Ayşe Yılmaz",
  "productId": "ont-002",
  "productName": "Soyut Kompozisyon",
  "item": "print",
  "email": "ayse@ornek.com",
  "source": "ont-art-gallery"
}
```

### Alan kuralları

| Alan | Kural |
|---|---|
| `event` | `"order"` ya da `"stock_notify"` |
| `name` | Formdan, zorunlu, baştaki/sondaki boşluk kırpılır |
| `productId` / `productName` | `PRODUCTS`'taki `id` / `title` — formdan alınmaz |
| `item` | `"original"` ya da `"print"`. Ödev sözleşmesine galeri için eklenen alan: hangi kalemin istendiğini taşır |
| `price` | Siparişte; o kalemin `PRODUCTS`'taki fiyatı, **sayı** (TL). Ek alan; fiyatı `null` olan kalem sipariş edilemez |
| `quantity` | Siparişte sayı. Orijinal için her zaman `1` (formda gösterilmez); baskıda 1 ile `print.remaining` arası |
| `phone` | Yalnızca siparişte, zorunlu |
| `email` | Her ikisinde zorunlu, `type="email"` ile doğrulanır |
| `address` | Yalnızca siparişte, zorunlu teslimat adresi (tek metin: mahalle, sokak, no, ilçe / il). Ek alan: eserler kargoyla gönderilir |
| `source` | Sabit `"ont-art-gallery"` |

**Hangi düğme hangi olay:** Orijinal `available` → Sipariş Ver (`order`, `item: "original"`). Baskı `in_stock` → Sipariş Ver (`order`, `item: "print"`). Baskı `preparing` ya da `sold_out` → Baskı Çıkınca Haber Ver (`stock_notify`, `item: "print"`). Satılmış orijinalde düğme yok.

### Gönderim ve geri bildirim

- `fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })`.
- Gönderim sürerken düğme pasif ve "Gönderiliyor…" yazar. `res.ok` ise formun yerine kısa bir onay metni çıkar ("Siparişiniz alındı, size e-postayla dönüş yapacağız."); değilse ya da ağ hatasında form kalır ve hata metni gösterilir — ziyaretçinin yazdıkları silinmez.
- `WEBHOOK_URL` dosyanın başında tek bir sabittir. Hafta 1'de doğrudan webhook.site adresidir; secret koruması ve sunucu tarafına taşıma Hafta 2'nin işidir, o zamana kadar bu adrese hassas bir anahtar konmaz.
- webhook.site adresinde CORS varsayılan olarak kapalıdır ve tarayıcı `application/json` gönderiminden önce ön kontrol (OPTIONS) isteği yapar; kapalıyken form gönderimi engellenir. Açmak için: `curl -X PUT https://webhook.site/token/<uuid> -H 'Content-Type: application/json' -d '{"cors": true}'` (ya da arayüzdeki CORS seçeneği).
- webhook.site adresi herkese açıktır: testte gerçek ad, telefon, adres kullanılmaz.
- Doğrulama: her iki olay için webhook.site'ta gelen gövdeyi aç ve alanları yukarıdaki tabloyla tek tek karşılaştır.
