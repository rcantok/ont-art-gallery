# ONT Art Gallery

Ressam **Osman Nihat Tok**'un (proje sahibinin babası; ONT baş harfleri) eserlerini satan galeri sitesi. Kursun "AtölyeKart" ödev serisi için yapılıyor, ama gerçek satışta kullanılacak şekilde: gerçek eserler geldiğinde yalnızca veri değişmeli, yapı değil.

## İş bağlamı

- **Sektör:** Özgün resim satışı.
- **Hedef kitle:** Sanat severler ve koleksiyoncular. Ton galeri dili: sade, saygılı, eseri ve ressamı öne çıkaran. Metinler künyeye (teknik, ölçü, yıl) ve eserin hikâyesine dayanır; kampanya ve indirim dili bu markaya uymaz.
- **Teslimat:** Yalnızca Türkiye içi sigortalı kargo, özel paketleme. Çerçeve politikası henüz netleşmedi; şimdilik eserler çerçevesiz kabul ediliyor.
- **Görsel kimlik:** `yeni tasarim.html` (Claude Design şablonu) temel alınır ve `index.html`'de uygulanmıştır: beyaz zemin, Archivo / Bodoni Moda / Manrope, zeytin yeşili vurgu `#4E5B3C` (kırmızı uyarı gibi durduğu için kullanıcı isteğiyle değişti; botanik temasına da uyar), eserlerden oluşan kayan hero, konu ve ölçü filtreli eser ızgarası, koyu iletişim sayfası. Şablondaki bilgisi olmayan bölümler (sergiler, zaman çizelgesi, alıntı, adres/telefon) bilinçli olarak çıkarıldı; bilgi gelince eklenir. Eser görselleri ızgarada ve eser sayfasında `object-fit: contain` ile kırpılmadan gösterilir (hero dekoratiftir, orada kırpılabilir). `hafta1-html.html` + `styles.css` 1.1'in eski, sade tasarımıdır.

## Ressam

Osman Nihat Tok — Orhan Cebrailoğlu'nun öğrencisi; resim, şiir ve botanik tutkunu bir ressam; soyut resme özel ilgi. Fotoğrafı `images/sanatci.jpg` (atölyesinde). Instagram: https://www.instagram.com/osmantok/ (`INSTAGRAM` sabiti). Ressam hakkında bundan fazlası (doğum yılı, sergiler, ödüller) bilinmiyor; yazılacaksa proje sahibine sorulur.

## Ürün modeli

Yalnızca **orijinal** satılır; her eser tek adettir. Durumu: `Satışta` ya da `Satıldı`. Baskı satışı kullanıcı kararıyla kaldırıldı. Satılan eserin sayfasında "Satıldı" ve **Benzerini haber ver** formu (`stock_notify`) çıkar; şu an satılmış eser yok, bu yüzden form sitede görünmüyor.

### Mağaza akışı

- Sayfalar hash ile ayrılır: `#/` (hero + katalog), `#/eser/<id>`, `#/sanatci`, `#/iletisim`, `#/sepet`, `#/siparis`, `#/hesap`. Modal yok; geri/ileri tuşu çalışır.
- Eser sayfası: **Şimdi Al** (sepete ekler, siparişe gider) ve **Sepete Ekle**. Sepet `localStorage`'da (`ont-cart`), bir eser en fazla bir kez.
- Sipariş sayfası: teslimat bilgileri + **demo kart formu**. Kart alanları okunmaz ve gönderilmez; fişte yalnızca `payment: "card-demo"`. Gerçek ödeme sunucu ve ödeme sağlayıcısı gerektirir.
- Kargo ücreti belli değil: sepette "Onayda bildirilir" yazar, uydurulmaz.
- Hesap sayfası şimdilik yalnızca arayüz ("yakında"); kullanıcı kararı.

Her eserin kalıcı bir kimliği vardır (`ont-001`, `ont-002`…), HTML'de `data-product-id` olarak durur.

### Veri kaynağı: `PRODUCTS` (index.html)

React sürümünde tüm eser bilgisi tek bir `PRODUCTS` dizisindedir; hero slaytları, filtre düğmeleri, ızgara, eser sayfası, sepet ve sipariş fişi buradan türetilir. Yeni eser = diziye bir nesne.

- Alanlar: `id`, `title`, `subject` (konu → filtre), `technique` (kısa teknik etiketi), `medium` (künyedeki uzun hali), `size` (→ ölçü filtresi), `year`, `featured` (yalnızca hero'da dönen birkaç eserde `true`), `desc`, `image {src, thumb, alt, width, height}`, `source` (ON.TOK'taki kaynak fotoğraf), `original {price, status}`.
- Görseller iki boy: `images/<id>.jpg` (1400 px, eser sayfası ve hero) ve `images/thumbs/<id>.jpg` (600 px, ızgara). 95 eserde sayfanın hızlı açılması ızgaranın küçük boyu kullanmasına bağlı.
- Bilinmeyen alan `null`; ekranda "yakında" metni yardımcılardan gelir (`formatPrice`, `metaLine`, `tagsOf`).
- Fiyatlar sayıdır (TL); "8.000 TL" biçimini `formatPrice` üretir.
- Durum anahtarları → `STATUS_LABELS`: `available` | `sold`. Satın alınabilirlik `isBuyable` (satışta ve fiyatı belli).
- Webhook eşleşmesi (1.6): `productId` = `id`, `productName` = `title`; fiyat sayı olarak gönderilir.

## Kategoriler

Kategoriler sabit bir liste değil, eserlere verilen iki tür etikettir:

- **Konu:** Manzara, Deniz, Kent, Soyut, Çiçek, Portre, Figür (eserler geldikçe genişler)
- **Teknik:** Akrilik, Yağlı boya… (ressamın onayıyla yazılır)

Eser ızgarasında iki filtre sırası var: **Konu** (Manzara, Soyut, Portre, Deniz, Figür, Çiçek, Kent) ve **Ölçü** (35 × 50, 50 × 70). İkisi de `PRODUCTS`'tan türetilir; yeni konu ya da ölçü gelince kendiliğinden eklenir.

## Eser verisi

Katalogdaki her bilgi gerçek olmalı. Bilinmeyen bilgi (ad, teknik, yıl) uydurulmaz: sayfada "yakında" gibi dürüst bir ifadeyle, kodda `DOLDURULACAK` yorumuyla bırakılır. Eser adları şimdilik geçici, betimleyici adlardır.

- **Fotoğraflar:** `ON.TOK/` klasöründe, ölçüye göre gruplu: `35x50/`, `50×70/`, `Karışık/`. Klasör adı eserin ölçüsüdür (cm). `Karışık/` içindeki eserlerin ölçüleri net değil; bu eserlerde ölçü yazılmaz.
- **Fotoğraf hazırlama:** `eser-ekle` skill'i ve `hazirla.py` aracı (yön düzeltme, otomatik kırpma, iki boy). Telefon fotoğrafları EXIF yön etiketi taşır; araç pikselleri çevirip EXIF'i atar, yoksa tarayıcı görseli ikinci kez döndürür.
- `ON.TOK/` tam boy fotoğraflardır (~540 MB): sitede yalnızca seçilen eserlerin küçültülmüş kopyaları `images/` altında kullanılır, klasörün kendisi GitHub'a yüklenmez. Her kartın yorumunda kaynak fotoğrafın yolu yazar.
- **Fiyatlar (orijinal):** 35×50 → 8.000 TL, 50×70 → 12.500 TL.
- **Katalog kapsamı:** `35x50/` ve `50×70/` klasörlerinin tamamı eklendi (95 eser, `ont-001`–`ont-095`). Duvarda çekilmiş tekrar kareler ve iki tablonun bir arada çekildiği kare katalog dışı. `Karışık/` kullanıcı kararıyla şimdilik eklenmedi (ölçü ve fiyat net değil).
- **Eser adları** kompozisyondan türetilmiş geçici adlardır (her kayıtta `DOLDURULACAK: ad geçici`); ressamın verdiği adlar gelince değiştirilir.

## Ödev yol haritası (Hafta 1)

Adımlar sırayla ilerler; her adım bir öncekinin üzerine kurulur.

1. **1.1 HTML** — `hafta1-html.html`: elle yazılmış sade HTML + `styles.css`, JavaScript yok (ilk 3 eser, eski görsel adları `gol-kiyisi.jpg` vb.). Galeri `index.html` olunca bu adla korunur. ✅
2. **1.2 React** — `index.html`: CDN ile, kurulumsuz tek dosya (npm yok), stiller dosyanın içinde. Bileşenler: `ProductImage`, `ProductCard`, `ProductList`. Eser verisi şimdilik her `<ProductCard>` için ayrı props (dizi yok, 1.3'e bırakıldı). `hafta1-html.html` 1.1'in kanıtı olarak korunur. ✅ Revizyon denemesi: tasarım tamamen yeni şablona taşındı, eser verisi değişmeden kaldı (props satır satır karşılaştırıldı). Bileşenler: `Header`, `Hero`, `ProductImage`, `ProductCard` (filtreye göre kendini gizler, tıklanınca detayı açar), `ProductList`, `ProductDetail`, `ArtistSection`, `ContactSection`.
3. **1.3 Veri modeli** — plan modunda planlandı, `PRODUCTS` dizisine geçildi. Ekran metinleri ve tam sayfa görüntüsü değişiklik öncesiyle birebir aynı; filtre artık `App`'te, eser penceresinde önceki/sonraki okları ve ←/→ kısayolları var. ✅
4. **1.4 Hata yönetimi** — (a) yanlış prop adı (`prduct={p}`): sayfa beyaz kaldı, konsol `Cannot read properties of undefined (reading 'id') at ProductCard` dedi; iz gönderen tarafa (`ProductList`) sürülüp düzeltildi. (b) bozuk CSS (`.art` `aspect-ratio: 4 / 50`): mesaj yok, yalnızca görüntüden teşhis edildi. Her ikisinde dosya yedekle birebir aynı haline döndü. ✅
5. **1.5** — proje skill'leri `.claude/skills/` altında: `ont-standartlari` (bileşen standartları + webhook formatı, ödevin istediği) ve `eser-ekle` (ON.TOK fotoğrafından kataloğa eser ekleme; araçlar `hazirla.py` ve `onizleme.py`). ✅ GitHub: `rcantok/ont-art-gallery` (gh CLI ile oluşturuldu — bu oturumda GitHub MCP yoktu), yayın: https://rcantok.github.io/ont-art-gallery/ (GitHub Pages, `main` / kök). `.gitignore` ON.TOK, ekran kayıtları ve ekran görüntülerini dışarıda tutar. Katalog QR'ı: İletişim bölümünde `SiteQr` (qrcode-generator, CDN) `SITE_URL`'yi kodlar; jsQR ile okunup adres doğrulandı. Alt ajan denemesi (opsiyonel) yapılmadı.
6. **1.6 Webhook'lar** — ilk sürümde eser penceresindeki formlarla yapıldı ve kanıtlandı. Mağazaya geçişte: `order` Sipariş sayfasından sepetin tamamını (`items`, `total`) taşır; `stock_notify` satılmış eserde "Benzerini haber ver" (`item: "similar"`). Fişler `orderPayload` / `notifyPayload` ile `ont-standartlari` sözleşmesine göre kurulur, `WEBHOOK_URL`'ye (`index.html` başında; ücretsiz, geçici webhook.site adresi, CORS API ile açıldı) gider. İki olay webhook.site'ta alan alan doğrulandı; hata yolunda form ve yazılanlar korunuyor. Secret koruma ve sunucuya taşıma Hafta 2'de. ✅

### Webhook veri sözleşmesi (1.6)

Tam sözleşme ve kurallar `ont-standartlari` skill'indedir. Ödevin alanlarına galeri için eklenenler: siparişte `items`, `total`, `address`, `payment`; bildirimde `item`.

## Hafta 1 sonrası: mağaza

Kullanıcı isteğiyle tek sayfa + modal yapısı çok sayfalı mağazaya dönüştürüldü (eser sayfası, sepet, sipariş, demo ödeme, hesap arayüzü, sanatçı fotoğrafı ve Instagram). Bileşenler: `Header`, `Hero`, `HomePage`, `ProductImage`, `ProductCard`, `ProductList`, `ProductPage`, `NotifySimilar`, `CartPage`, `CheckoutPage`, `ArtistPage`, `ContactPage`, `SiteQr`, `AccountPage`, `NotFound`, `App` (yönlendirme `useRoute`, sepet `useCart`).
