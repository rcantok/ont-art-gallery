---
name: eser-ekle
description: ONT Art Gallery kataloğuna ON.TOK/ klasöründeki fotoğraflardan eser ekler — görseli hazırlar (yön, kırpma, iki boy) ve PRODUCTS dizisine kaydını yazar. "Eser ekle", "siteye şu resmi koy" ya da ON.TOK'tan bir dosya adı verildiğinde kullan.
---

# Eser ekle

Bir ya da birden çok eseri `ON.TOK/` fotoğrafından kataloğa taşır: `images/` altında iki boy görsel ve `index.html` içindeki `PRODUCTS` dizisinde kayıt. Alanların anlamı ve "bilinmeyeni uydurma" kuralı CLAUDE.md'deki *Veri kaynağı: PRODUCTS* bölümündedir. Komutlar `AtölyeKart/` içinde çalıştırılır.

## 1. Fotoğrafı bul ve künyeyi klasörden oku

Kullanıcı genelde dosya adının son rakamlarını verir (örn. "144834"); `ON.TOK/` altında ara. Eser zaten varsa (`PRODUCTS`'ta `source` alanı) ekleme, söyle. Aynı eserin duvarda çekilmiş ikinci karesi ya da birden çok tablonun bir arada çekildiği kare katalog görseli olmaz; düz, önden çekilmiş kareyi seç.

| Klasör | `size` | `original.price` |
|---|---|---|
| `35x50/` | `"35 × 50 cm"` | `8000` |
| `50×70/` | `"50 × 70 cm"` | `12500` |
| `Karışık/` | — | Kullanıcı kararıyla şimdilik eklenmiyor (ölçü ve fiyat net değil). İstenirse önce ölçü/fiyatı sor. |

## 2. Görseli hazırla

```
python3 .claude/skills/eser-ekle/hazirla.py "ON.TOK/<klasör>/<dosya>.jpg" <id>
```

Yönü düzeltir, tabloyu zeminden otomatik kırpar, `images/<id>.jpg` (1400 px, pencere) ve `images/thumbs/<id>.jpg` (600 px, ızgara) yazar, EXIF'i atar. Son satırdaki genişlik/yükseklik `PRODUCTS`'a yazılır.

Sonucu **gözle kontrol et** — birden çok eserde `python3 .claude/skills/eser-ekle/onizleme.py onizleme.png 6 320 images/thumbs/ont-0*.jpg` ile toplu önizleme çıkarıp hepsine birlikte bak. Kenarda masa, duvar ya da çerçeve kaldıysa:

| Durum | Seçenek |
|---|---|
| Bir kenarda ince şerit kaldı | `--trim L,T,R,B` (o kenardan ek pay, örn. `--trim 0,0.025,0,0`) |
| Çerçeveli eser | `--trim` ile tüm kenarlardan ~%7–11 (çerçeve + iç pervaz). `--frame` iç tabloyu her zaman bulamıyor |
| Tuval zeminle aynı renkte (örn. pembe tuval / ahşap masa), kırpma yanlış | `--box L,T,R,B` ile elle oranlar ver; kenarları önizlemeden oku |

`id`: dizideki son numaradan devam (`ont-096`…).

## 3. PRODUCTS kaydını yaz

Mevcut kayıtlarla aynı şekil; dizinin sonuna ekle.

- `title`: kullanıcı ad verdiyse o; vermediyse kompozisyonu anlatan, galeri dilinde kısa bir ad (örn. "Kızıl Liman", "Karda Köprü"), diğer adlarla çakışmayan; üstüne `// DOLDURULACAK: ad geçici` yorumu.
- `subject`: Manzara, Deniz, Kent, Soyut, Çiçek, Portre, Figür — gerekirse yeni konu; filtre kendiliğinden genişler.
- `technique`, `medium`, `year`: kullanıcı söylemediyse `null`.
- `desc`: görselde gördüğünü 1 cümleyle anlat — renk, biçim, konum. Hikâye, yer adı, duygu iddiası ekleme.
- `image`: `src`, `thumb`, `alt` (= `"<title>: <desc>"`), gerçek `width`/`height`.
- `source`: `ON.TOK/...` yolu. `print`: `{ price: null, status: "preparing" }`.
- `featured: true` yalnızca hero'da dönmesi istenen birkaç eserde.

## 4. Doğrula

Eser ancak şunlar sağlanınca eklenmiş sayılır:

- Headless Chrome'da sayfa açılıyor; yeni kart ızgarada, görsel dik ve temiz.
- Konsolda Babel uyarısı dışında hata yok; yüklenemeyen (`naturalWidth === 0`) görsel yok.
- Eserin konu ve ölçü filtreleri onu gösteriyor; eser penceresi büyük görselle açılıyor.

Sonunda kullanıcıya eklenenleri, geçici bırakılan alanları ve elle düzeltilen kırpmaları söyle.
