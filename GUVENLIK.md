# ONT Art Gallery — Deploy Öncesi Güvenlik Checklist'i

AtölyeKart Hafta 2, adım 2.6. Ders 3'teki 8 madde, ek maddeler ve "ilk günden" listesi bu proje için dolduruldu.
Her maddenin yanında nasıl doğrulandığı yazıyor. Tarih: 2026-10-19.

Durum: ✅ tamam · 🔶 kısmen / yayında doğrulanacak · ❌ yapılmadı

## Ders 3 checklist'i (8 madde)

| # | Madde | Durum | Nasıl doğrulandı |
|---|---|---|---|
| 1 | `.env` dosyası `.gitignore`'da | ✅ | `.gitignore` → `.env*` (yalnızca `!.env.example` hariç). `git check-ignore -v .env.local` → `.gitignore:13:.env*`. Git'te takip edilen tek env dosyası değersiz şablon `.env.example`. `.vercelignore` da `.env*`'i Vercel yüklemesinden dışlıyor. |
| 2 | Tüm secret'lar Vercel Environment Variables'ta (kodda değil) | ✅ | `WEBHOOK_URL` ve `WEBHOOK_SECRET` yalnızca `process.env`'den okunuyor (`lib/server.js`). `vercel env ls`: Production ve Preview değerleri **Secret / Hidden**, Development ayrı. Production için ayrı webhook adresi ve anahtar. Sayfa kaynağında webhook adresi yok (canlı preview'da kontrol edildi). |
| 3 | Gönder butonu çift gönderime kapalı | ✅ | Gönderim sürerken düğme pasif ve "Gönderiliyor…" yazıyor. Ayrıca `useSubmitLock`: düğme pasifleşmeden önceki kısa anda gelen tıklamaları da durduruyor. Tarayıcı testi: art arda 3 gönderim → sunucuya **1 istek**. |
| 4 | HTTPS ve güvenlik başlıkları (`vercel.json`) tanımlı | 🔶 | `vercel.json` tanımlı (aşağıdaki ek madde). Vercel HTTPS'i zorunlu kılıyor. Başlıklar yerelde aynı değerlerle sunularak test edildi; site bozulmadı, çerçeveleme engellendi. **Kalan:** canlı Vercel adresinde `curl -I` ile kontrol, production yayınında yapılacak. |
| 5 | `npm audit` temiz (ya da kalan risk belgelenmiş) | ✅ | `npm audit` → **found 0 vulnerabilities**. Projenin hiç npm bağımlılığı yok (`package-lock.json` yalnızca audit için). Kalan risk: CDN'den yüklenen betikler npm audit kapsamında değil; aşağıda "Kalan riskler"de. |
| 6 | Form girdileri sanitize ediliyor | ✅ | Sunucu, tarayıcıdan bağımsız olarak doğruluyor (`lib/validate.js`): yalnızca metin tipi, uzunluk sınırları, e-posta/telefon biçimi, boş/boşluk reddi. `cleanText`: `<`, `>` ve kontrol karakterleri fişe girmeden temizleniyor. Ekrana yazarken React kaçışlıyor; `innerHTML`/`dangerouslySetInnerHTML` yok. 25 otomatik test (`npm test`) bunları kapsıyor. |
| 7 | KVKK rıza checkbox'ı ve Privacy Policy yayında | 🔶 | Sipariş ve "Benzerini haber ver" formlarında zorunlu açık rıza kutusu; sunucu da zorunlu tutuyor (rıza yoksa 400), fişe `consent` + `consentAt` yazılıyor. `#/gizlilik` sayfasında KVKK aydınlatma metni. **Kalan:** (a) production'a yayınlanınca "yayında" olacak, (b) metin taslak; gerçek satıştan önce hukukçu onayı ve eksik bilgiler (unvan, adres, kargo firması, saklama süreleri) gerekli. |
| 8 | Claude denetimi (`/security-review`) ve Strix taraması: kritik bulgu yok | 🔶 | `/security-review` (Hafta 2'nin 7 commit'i): **yüksek güvenli açık bulunmadı.** Strix taraması **çalıştırılamadı**: ChatGPT aboneliğiyle giriş başarılı oldu ama OpenAI denenen her modeli ("not supported when using Codex with a ChatGPT account") reddetti. Bir API anahtarıyla (OpenRouter vb.) yeniden denenecek. |

## Ek maddeler

| Madde | Durum | Nasıl doğrulandı |
|---|---|---|
| Güvenlik başlıkları açıkça tanımlı | ✅ | `vercel.json`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security: max-age=63072000; includeSubDomains`, `Referrer-Policy: strict-origin-when-cross-origin`. Ayrıca `Permissions-Policy` (kamera, mikrofon, konum, ödeme kapalı) ve `Content-Security-Policy` (yalnızca kendi alan adı + unpkg, cdnjs, Google Fonts; `connect-src 'self'`; `frame-ancestors 'none'`). |
| Kullanıcıdan gelen kimlikler sunucuda gerçek katalogla doğrulanıyor | ✅ | `api/order`: her eser kimliği `data/products.js`'te aranıyor; olmayan, satılmış ya da tekrarlanan kimlik reddediliyor, en fazla 20 eser. Fiyat ve toplam tarayıcıdan değil katalogdan (test: tarayıcı `total: 1` gönderse de fişe 95.000 TL yazıldı). `api/notify`: yalnızca katalogda satılmış (`sold`) bir eser için kabul. |
| Hız limiti istisnaları güncel gerekçeyle gözden geçirildi | ✅ | İstisna yok: her iki uç da aynı kurala tabi (aynı IP, uç başına dakikada 10 istek, aşılırsa 429 + `Retry-After`). Canlı preview'da doğrulandı. Bilinen sınırlama aşağıda. |

## "İlk günden" listesi

| Madde | Durum | Not |
|---|---|---|
| Anahtarlar sadece ortam değişkenlerinde | ✅ | Bkz. madde 2. |
| `.env` ilk adımda `.gitignore`'a | 🔶 | Şimdi tamam, ama "ilk günden" değildi: Hafta 1'de webhook adresi doğrudan `index.html`'deydi ve git geçmişinde açık duruyor. O adres artık hiçbir yerde kullanılmıyor; yenileri hiç commit'lenmedi. Ders: yeni projede `.gitignore` ilk commit'te. |
| Ayrı `.env.development` ve `.env.production` | ✅ | Karşılığı: geliştirme değerleri yerelde `.env.local`; production değerleri yalnızca Vercel'de (Production ortamı), Preview ve Development ayrı. Production değerleri hiçbir zaman repoda ya da proje klasöründe tutulmuyor. |
| Hız limiti ve çift gönderim koruması | ✅ | Bkz. madde 3 ve ek maddeler. |
| Veri toplayan formda KVKK/GDPR metni ve gizlilik politikası | ✅ | Bkz. madde 7 (taslak notuyla). |

## Kalan riskler (bilinçli olarak kabul edildi)

1. **CSP `'unsafe-inline'` ve `'unsafe-eval'` içeriyor.** Sayfa JSX'i tarayıcıda Babel ile derlediği için şu an zorunlu. Bir derleme adımına (ör. Vite) geçilince kaldırılabilir.
2. **CDN betiklerinde bütünlük kontrolü (SRI) yok.** React, Babel ve QR kütüphanesi unpkg/cdnjs'ten sabit sürümle yükleniyor ama `integrity` özniteliği yok; CDN ele geçirilirse değiştirilmiş betik çalışabilir. Önlem: `integrity` hash'leri eklemek ya da betikleri kendi alan adından sunmak.
3. **İstek sınırı sunucu belleğinde.** Vercel birden çok kopya çalıştırırsa her kopya ayrı sayıyor; sınır pratikte gevşek. Gerçek koruma gerekirse ortak sayaç (Upstash Redis).
4. **Eski webhook adresi git geçmişinde.** Kullanılmıyor; geçmişi yeniden yazmak yerine adres terk edildi.
5. **KVKK metni taslak.** Hukukçu onayı olmadan gerçek satışa açılmamalı.
6. **Strix taraması yapılmadı.** Madde 8.
7. **Canlı başlık kontrolü bekliyor.** Production yayınından sonra `curl -I https://ont-art-gallery.vercel.app/` ile başlıklar doğrulanacak.

## Yeniden doğrulama komutları

```bash
npm test                              # 25 test: doğrulama, sepet, rıza, temizlik, istek sınırı
npm audit                             # 0 vulnerabilities
git check-ignore -v .env.local        # .env git dışında
git ls-files | grep '^\.env'          # yalnızca .env.example
vercel env ls                         # Production/Preview: Secret
curl -sI https://ont-art-gallery.vercel.app/ | grep -iE 'x-frame|x-content|strict-transport|referrer|content-security'
```
