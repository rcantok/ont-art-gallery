// ---- Form doğrulama: sayfa (index.html) ve sunucu (api/) aynı kuralları kullanır ----
// Tarayıcının kendi kontrolü ali@gmail, yalnız boşluk ve "abc" telefonu geçirir; bu kurallar onları reddeder.
// Her kural true ya da Türkçe hata metni döner. Üst sınırlar sunucuya aşırı uzun veri gönderilmesini engeller.
export const FIELD_RULES = {
  name: v => (v.trim().length >= 2 && v.length <= 100) || "Adınızı ve soyadınızı yazın.",
  email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.length <= 254) || "Geçerli bir e-posta yazın (örnek: ad@alanadi.com).",
  phone: v => (/^\+?[\d\s()-]+$/.test(v.trim()) && /^\d{10,13}$/.test(v.replace(/\D/g, "")) && v.length <= 30) || "Geçerli bir telefon numarası yazın (örnek: 0532 123 45 67).",
  address: v => (v.trim().length >= 10 && v.length <= 500) || "Teslimat adresini mahalle, sokak ve ilçe ile yazın."
};

// { alan: değer } alır, yalnızca hatalı alanları { alan: hata metni } olarak döner
export const validateFields = f => Object.fromEntries(
  Object.entries(f)
    .map(([k, v]) => [k, FIELD_RULES[k] ? FIELD_RULES[k](typeof v === "string" ? v : "") : true])
    .filter(([, r]) => r !== true)
);
