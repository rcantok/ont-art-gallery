// ---- Form doğrulama: sayfa (index.html) ve sunucu (api/) aynı kuralları kullanır ----
// Tarayıcının kendi kontrolü ali@gmail, yalnız boşluk ve "abc" telefonu geçirir; bu kurallar onları reddeder.
// Her kural true ya da Türkçe hata metni döner. Metin alanları yalnızca string kabul eder (sunucuya nesne/dizi gönderilmesini engeller).
// consent: KVKK açık rıza kutusu; yalnızca gerçek boolean true geçer.
export const FIELD_RULES = {
  name: v => (typeof v === "string" && v.trim().length >= 2 && v.length <= 100) || "Adınızı ve soyadınızı yazın.",
  email: v => (typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.length <= 254) || "Geçerli bir e-posta yazın (örnek: ad@alanadi.com).",
  phone: v => (typeof v === "string" && /^\+?[\d\s()-]+$/.test(v.trim()) && /^\d{10,13}$/.test(v.replace(/\D/g, "")) && v.length <= 30) || "Geçerli bir telefon numarası yazın (örnek: 0532 123 45 67).",
  address: v => (typeof v === "string" && v.trim().length >= 10 && v.length <= 500) || "Teslimat adresini mahalle, sokak ve ilçe ile yazın.",
  consent: v => v === true || "Devam etmek için kişisel verilerinizin işlenmesine açık rıza vermelisiniz."
};

// { alan: değer } alır, yalnızca hatalı alanları { alan: hata metni } olarak döner
export const validateFields = f => Object.fromEntries(
  Object.entries(f)
    .map(([k, v]) => [k, FIELD_RULES[k] ? FIELD_RULES[k](v) : true])
    .filter(([, r]) => r !== true)
);
