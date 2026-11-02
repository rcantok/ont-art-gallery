// ---- Mobil uygulama ayarları ----
// API_BASE: geliştirmede .env.development.local'daki EXPO_PUBLIC_API_BASE (Mac'teki yerel sunucu, aynı Wi-Fi),
// yoksa canlı site. Webhook adresi ve gizli anahtar uygulamaya hiç girmez; yalnızca sunucuda durur.
export const SITE_URL = "https://ont-art-gallery.vercel.app";
export const API_BASE = (process.env.EXPO_PUBLIC_API_BASE || SITE_URL).replace(/\/$/, "");
export const PRIVACY_URL = SITE_URL + "/#/gizlilik";
export const CONTACT_EMAIL = "ragipcantok@gmail.com";
export const MAGNET_DEMO_NOTE = "Magnetler demo ürünüdür: sipariş alınır, gönderim yapılmaz.";

// Web sitesindeki :root renkleri
export const C = { accent: "#4E5B3C", ink: "#161616", muted: "#4a4a4a", matte: "#e9e6e0", line: "#e4e2dd", soft: "#f3f2ef", error: "#b42318", white: "#ffffff" };

export const formatPrice = price => price == null
  ? "Fiyat için iletişime geçin"
  : String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " TL";

// Görseller canlı siteden gelir (uygulamaya gömülmez)
export const imageUrl = path => `${SITE_URL}/${path}`;
