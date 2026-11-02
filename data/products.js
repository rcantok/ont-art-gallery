// ==== ESERLER — tek veri kaynağı ====
// Sayfa (index.html), sunucu fonksiyonları (api/) ve mobil uygulama aynı listeyi okur.
// Yeni eser = diziye bir nesne. Bilinmeyen bilgi null bırakılır (uydurulmaz).
// Fiyat sayı (TL). original.status: "available" | "sold" — satılan eserde "Benzerini haber ver" formu çıkar.
// Webhook: productId = id, productName = title.
export const PRODUCTS = [
  {
    // DOLDURULACAK: ad geçici; yıl; teknik ressamın onayını bekliyor
    id: "ont-001",
    title: "Sazlıklı Göl",
    subject: "Manzara",
    technique: "Akrilik",
    medium: "Tuval pano üzerine akrilik",
    size: "35 × 50 cm",
    year: null,
    desc: "Sazlıklarla çevrili sakin bir göl, ardında altın sarısı bir tarla ve akşam ışığında morlaşan tepeler.",
    image: { src: "images/ont-001.jpg", thumb: "images/thumbs/ont-001.jpg", alt: "Sazlıklı Göl: Sazlıklarla çevrili sakin bir göl, ardında altın sarısı bir tarla ve akşam ışığında morlaşan tepeler.", width: 1400, height: 1029 },
    source: "ON.TOK/35x50/20200104_141045.jpg",
    original: { price: 20000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-002",
    title: "Sarı Girdap",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Sarı ile mavinin buluştuğu bir zeminde lacivert fırça darbeleri, damlatılmış sarı ve beyaz çizgiler; hareketli, enerjik bir kompozisyon.",
    image: { src: "images/ont-002.jpg", thumb: "images/thumbs/ont-002.jpg", alt: "Sarı Girdap: Sarı ile mavinin buluştuğu bir zeminde lacivert fırça darbeleri, damlatılmış sarı ve beyaz çizgiler; hareketli, enerjik bir kompozisyon.", width: 963, height: 1400 },
    source: "ON.TOK/50×70/20200104_133124.jpg",
    original: { price: 40500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-003",
    title: "Dizginli At",
    subject: "Portre",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Gökyüzü mavisine dönük bir at başı; kalın, serbest fırça darbeleri ve koyu konturlarla güçlü bir portre.",
    image: { src: "images/ont-003.jpg", thumb: "images/thumbs/ont-003.jpg", alt: "Dizginli At: Gökyüzü mavisine dönük bir at başı; kalın, serbest fırça darbeleri ve koyu konturlarla güçlü bir portre.", width: 897, height: 1400 },
    source: "ON.TOK/50×70/20200104_132539.jpg",
    original: { price: 69000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-004",
    title: "Kara Kıvrımlar",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Gri ve beyaz bir zeminde kıvrılan siyah çizgiler; ortada sarı, pembe ve yeşil lekeler, üzerlerinde beyaz damlatma izleri.",
    image: { src: "images/ont-004.jpg", thumb: "images/thumbs/ont-004.jpg", alt: "Kara Kıvrımlar: Gri ve beyaz bir zeminde kıvrılan siyah çizgiler; ortada sarı, pembe ve yeşil lekeler, üzerlerinde beyaz damlatma izleri.", width: 836, height: 1400 },
    source: "ON.TOK/50×70/20200104_132846.jpg",
    original: { price: 29000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-005",
    title: "Mavi Burun",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Sisli bir gölün üzerine uzanan mavi dağ sırtları ve aşağıya inen yeşil yamaçlar.",
    image: { src: "images/ont-005.jpg", thumb: "images/thumbs/ont-005.jpg", alt: "Mavi Burun: Sisli bir gölün üzerine uzanan mavi dağ sırtları ve aşağıya inen yeşil yamaçlar.", width: 1400, height: 1020 },
    source: "ON.TOK/35x50/20200104_141104.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-006",
    title: "Karlı Yolda İki Kişi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Karla kaplı bir ovada çit boyunca ilerleyen iki küçük figür ve beyaza gömülmüş ağaçlar.",
    image: { src: "images/ont-006.jpg", thumb: "images/thumbs/ont-006.jpg", alt: "Karlı Yolda İki Kişi: Karla kaplı bir ovada çit boyunca ilerleyen iki küçük figür ve beyaza gömülmüş ağaçlar.", width: 1400, height: 987 },
    source: "ON.TOK/35x50/20200104_141128.jpg",
    original: { price: 11500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-007",
    title: "Ormanda Çağlayan",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yeşil ve beyaz fırça darbeleriyle akan bir çağlayan; gölgeli orman suya yansıyor.",
    image: { src: "images/ont-007.jpg", thumb: "images/thumbs/ont-007.jpg", alt: "Ormanda Çağlayan: Yeşil ve beyaz fırça darbeleriyle akan bir çağlayan; gölgeli orman suya yansıyor.", width: 1400, height: 977 },
    source: "ON.TOK/35x50/20200104_141200.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-008",
    title: "Hasat Tarlaları",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Sarı ve yeşil şeritler halinde uzanan tarlalar, ufukta ağaç sırası ve soluk tepeler.",
    image: { src: "images/ont-008.jpg", thumb: "images/thumbs/ont-008.jpg", alt: "Hasat Tarlaları: Sarı ve yeşil şeritler halinde uzanan tarlalar, ufukta ağaç sırası ve soluk tepeler.", width: 1400, height: 1021 },
    source: "ON.TOK/35x50/20200104_141248.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-009",
    title: "Kayalıklar ve Martılar",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    featured: true,
    desc: "Turkuaz denizden yükselen kayalıklar, uçuşan martılar ve ön planda pembe-sarı kıyı çiçekleri.",
    image: { src: "images/ont-009.jpg", thumb: "images/thumbs/ont-009.jpg", alt: "Kayalıklar ve Martılar: Turkuaz denizden yükselen kayalıklar, uçuşan martılar ve ön planda pembe-sarı kıyı çiçekleri.", width: 1400, height: 1022 },
    source: "ON.TOK/35x50/20200104_141305.jpg",
    original: { price: 37500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-010",
    title: "Nehir Kıyısında Kulübe",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yemyeşil ağaçların arasında küçük bir kulübe ve ışığı yansıtan sakin bir nehir.",
    image: { src: "images/ont-010.jpg", thumb: "images/thumbs/ont-010.jpg", alt: "Nehir Kıyısında Kulübe: Yemyeşil ağaçların arasında küçük bir kulübe ve ışığı yansıtan sakin bir nehir.", width: 1400, height: 993 },
    source: "ON.TOK/35x50/20200104_141345.jpg",
    original: { price: 25000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-011",
    title: "Bahar Vadisi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yeşil tepelerin önünde çiçek açmış pembe ağaçlar ve renkli şeritler halinde uzanan bir vadi.",
    image: { src: "images/ont-011.jpg", thumb: "images/thumbs/ont-011.jpg", alt: "Bahar Vadisi: Yeşil tepelerin önünde çiçek açmış pembe ağaçlar ve renkli şeritler halinde uzanan bir vadi.", width: 1400, height: 994 },
    source: "ON.TOK/35x50/20200104_141444.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-012",
    title: "Pembe Dağ",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Turuncu ve kızıl sonbahar ağaçlarının arasından görünen pembe bir dağ.",
    image: { src: "images/ont-012.jpg", thumb: "images/thumbs/ont-012.jpg", alt: "Pembe Dağ: Turuncu ve kızıl sonbahar ağaçlarının arasından görünen pembe bir dağ.", width: 1400, height: 993 },
    source: "ON.TOK/35x50/20200104_141502.jpg",
    original: { price: 17500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-013",
    title: "Dağların Eteğinde Güz",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mavi-mor dağların eteğinde turuncu yapraklı ağaçlar ve karla örtülü bir zemin.",
    image: { src: "images/ont-013.jpg", thumb: "images/thumbs/ont-013.jpg", alt: "Dağların Eteğinde Güz: Mavi-mor dağların eteğinde turuncu yapraklı ağaçlar ve karla örtülü bir zemin.", width: 1400, height: 988 },
    source: "ON.TOK/35x50/20200104_141518.jpg",
    original: { price: 14000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-014",
    title: "Uzanan Figür",
    subject: "Figür",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Renkli, parçalı bir mekânın önünde uzanan bir figür; kubbe ve geometrik biçimlerle kurulmuş bir kompozisyon.",
    image: { src: "images/ont-014.jpg", thumb: "images/thumbs/ont-014.jpg", alt: "Uzanan Figür: Renkli, parçalı bir mekânın önünde uzanan bir figür; kubbe ve geometrik biçimlerle kurulmuş bir kompozisyon.", width: 1400, height: 971 },
    source: "ON.TOK/35x50/20200104_141534.jpg",
    original: { price: 40000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-015",
    title: "Altın Vadi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mor dağların altında sarı ve turuncu ağaçlarla dolu bir vadi ve ortasından geçen bir yol.",
    image: { src: "images/ont-015.jpg", thumb: "images/thumbs/ont-015.jpg", alt: "Altın Vadi: Mor dağların altında sarı ve turuncu ağaçlarla dolu bir vadi ve ortasından geçen bir yol.", width: 1400, height: 989 },
    source: "ON.TOK/35x50/20200104_141554.jpg",
    original: { price: 14000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-016",
    title: "Yeşil Orman",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Dikey yeşil ve sarı fırça darbeleriyle soyutlanmış bir orman içi.",
    image: { src: "images/ont-016.jpg", thumb: "images/thumbs/ont-016.jpg", alt: "Yeşil Orman: Dikey yeşil ve sarı fırça darbeleriyle soyutlanmış bir orman içi.", width: 1400, height: 989 },
    source: "ON.TOK/35x50/20200104_141610.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-017",
    title: "Yeşil Çember",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Açık zeminde dönen yeşil, kırmızı ve turuncu lekelerden oluşan bir çember.",
    image: { src: "images/ont-017.jpg", thumb: "images/thumbs/ont-017.jpg", alt: "Yeşil Çember: Açık zeminde dönen yeşil, kırmızı ve turuncu lekelerden oluşan bir çember.", width: 1400, height: 1041 },
    source: "ON.TOK/35x50/20200104_141632.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-018",
    title: "Renkli Yansımalar",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mor ve kızıl lekelerden bir gökyüzü, renkli bir ağaç sırası ve suya düşen yansımaları.",
    image: { src: "images/ont-018.jpg", thumb: "images/thumbs/ont-018.jpg", alt: "Renkli Yansımalar: Mor ve kızıl lekelerden bir gökyüzü, renkli bir ağaç sırası ve suya düşen yansımaları.", width: 1400, height: 871 },
    source: "ON.TOK/35x50/20200104_141858.jpg",
    original: { price: 9500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-019",
    title: "Beyaz Akış",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Dikey beyaz ve gri akışların üzerinde kırmızı, mavi ve sarı vurgular.",
    image: { src: "images/ont-019.jpg", thumb: "images/thumbs/ont-019.jpg", alt: "Beyaz Akış: Dikey beyaz ve gri akışların üzerinde kırmızı, mavi ve sarı vurgular.", width: 1098, height: 1400 },
    source: "ON.TOK/35x50/20200104_142102.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-020",
    title: "Mor Buket",
    subject: "Çiçek",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Beyaz zeminde mor ve lacivert parçalardan oluşan soyut bir buket.",
    image: { src: "images/ont-020.jpg", thumb: "images/thumbs/ont-020.jpg", alt: "Mor Buket: Beyaz zeminde mor ve lacivert parçalardan oluşan soyut bir buket.", width: 961, height: 1400 },
    source: "ON.TOK/35x50/20200104_142139.jpg",
    original: { price: 16000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-021",
    title: "Gün Batımında Göl",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Göle uzanan koyu yeşil ağaçlar, pembe ve sarı bir gün batımı ve suya düşen yansımaları.",
    image: { src: "images/ont-021.jpg", thumb: "images/thumbs/ont-021.jpg", alt: "Gün Batımında Göl: Göle uzanan koyu yeşil ağaçlar, pembe ve sarı bir gün batımı ve suya düşen yansımaları.", width: 911, height: 1400 },
    source: "ON.TOK/35x50/20200104_142401.jpg",
    original: { price: 10000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-022",
    title: "Pembe Ağaçlar",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Soluk pembe bir gökyüzü altında çiçek açmış ağaçlar ve yanlarında küçük bir figür.",
    image: { src: "images/ont-022.jpg", thumb: "images/thumbs/ont-022.jpg", alt: "Pembe Ağaçlar: Soluk pembe bir gökyüzü altında çiçek açmış ağaçlar ve yanlarında küçük bir figür.", width: 887, height: 1400 },
    source: "ON.TOK/35x50/20200104_142512.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-023",
    title: "Ağaçlı Yolda Yürüyüş",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yeşil ağaçların gölgelediği uzun bir yolda yan yana yürüyen iki kişi.",
    image: { src: "images/ont-023.jpg", thumb: "images/thumbs/ont-023.jpg", alt: "Ağaçlı Yolda Yürüyüş: Yeşil ağaçların gölgelediği uzun bir yolda yan yana yürüyen iki kişi.", width: 913, height: 1400 },
    source: "ON.TOK/35x50/20200104_142531.jpg",
    original: { price: 20500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-024",
    title: "Mor Akşam",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mor ve sarı bantlardan bir gökyüzü ve altında yumuşak tepeler.",
    image: { src: "images/ont-024.jpg", thumb: "images/thumbs/ont-024.jpg", alt: "Mor Akşam: Mor ve sarı bantlardan bir gökyüzü ve altında yumuşak tepeler.", width: 1400, height: 985 },
    source: "ON.TOK/35x50/20200104_142633.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-025",
    title: "Kızıl Ufuk",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Turuncu ve kızıl bir gün batımının önünde koyu servi ve ağaç siluetleri.",
    image: { src: "images/ont-025.jpg", thumb: "images/thumbs/ont-025.jpg", alt: "Kızıl Ufuk: Turuncu ve kızıl bir gün batımının önünde koyu servi ve ağaç siluetleri.", width: 1400, height: 1026 },
    source: "ON.TOK/35x50/20200104_142724.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-026",
    title: "Yeşil Dağ",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mavi gökyüzü altında yeşil bir dağ yamacı ve önünde pembe-yeşil çayırlar.",
    image: { src: "images/ont-026.jpg", thumb: "images/thumbs/ont-026.jpg", alt: "Yeşil Dağ: Mavi gökyüzü altında yeşil bir dağ yamacı ve önünde pembe-yeşil çayırlar.", width: 1400, height: 957 },
    source: "ON.TOK/35x50/20200104_142822.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-027",
    title: "Dağ Yolu",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Karlı mavi dağlara doğru uzanan pembe bir yol ve kenarında sarı çiçekli bir ağaç.",
    image: { src: "images/ont-027.jpg", thumb: "images/thumbs/ont-027.jpg", alt: "Dağ Yolu: Karlı mavi dağlara doğru uzanan pembe bir yol ve kenarında sarı çiçekli bir ağaç.", width: 974, height: 1400 },
    source: "ON.TOK/35x50/20200104_142848.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-028",
    title: "Gelincikler",
    subject: "Çiçek",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mavi ve beyaz zeminde kırmızı gelincikler ve serbest, dikey fırça darbeleri.",
    image: { src: "images/ont-028.jpg", thumb: "images/thumbs/ont-028.jpg", alt: "Gelincikler: Mavi ve beyaz zeminde kırmızı gelincikler ve serbest, dikey fırça darbeleri.", width: 949, height: 1400 },
    source: "ON.TOK/35x50/20200104_143017.jpg",
    original: { price: 21000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-029",
    title: "Turuncu Zemin",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Turuncu zemin üzerinde beyaz, siyah ve mavi biçimlerin dikey bir kurgusu.",
    image: { src: "images/ont-029.jpg", thumb: "images/thumbs/ont-029.jpg", alt: "Turuncu Zemin: Turuncu zemin üzerinde beyaz, siyah ve mavi biçimlerin dikey bir kurgusu.", width: 962, height: 1400 },
    source: "ON.TOK/35x50/20200104_143059.jpg",
    original: { price: 10500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-030",
    title: "Soyut Kasaba",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Açık mavi gökyüzü altında beyaz, mor ve krem lekelerle soyutlanmış bir yerleşim.",
    image: { src: "images/ont-030.jpg", thumb: "images/thumbs/ont-030.jpg", alt: "Soyut Kasaba: Açık mavi gökyüzü altında beyaz, mor ve krem lekelerle soyutlanmış bir yerleşim.", width: 1400, height: 851 },
    source: "ON.TOK/35x50/20200104_143123.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-031",
    title: "Çizgilerin Dansı",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Gri ve pembe zeminde birbirine dolanan siyah çizgiler ve kırmızı vurgular.",
    image: { src: "images/ont-031.jpg", thumb: "images/thumbs/ont-031.jpg", alt: "Çizgilerin Dansı: Gri ve pembe zeminde birbirine dolanan siyah çizgiler ve kırmızı vurgular.", width: 1400, height: 1021 },
    source: "ON.TOK/35x50/20200104_143247.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-032",
    title: "Lacivert Ritim",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Pembe zemin üzerinde lacivert fırça darbeleri, bordo lekeler ve kıvrılan siyah çizgiler.",
    image: { src: "images/ont-032.jpg", thumb: "images/thumbs/ont-032.jpg", alt: "Lacivert Ritim: Pembe zemin üzerinde lacivert fırça darbeleri, bordo lekeler ve kıvrılan siyah çizgiler.", width: 1400, height: 930 },
    source: "ON.TOK/35x50/20200104_143315.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-033",
    title: "Turuncu Rüzgâr",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Gri-mavi zeminde turuncu ve kırmızı lekeler, üzerinde hızlı siyah çizgiler.",
    image: { src: "images/ont-033.jpg", thumb: "images/thumbs/ont-033.jpg", alt: "Turuncu Rüzgâr: Gri-mavi zeminde turuncu ve kırmızı lekeler, üzerinde hızlı siyah çizgiler.", width: 1400, height: 1264 },
    source: "ON.TOK/35x50/20200104_143345.jpg",
    original: { price: 11000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-034",
    title: "Pembe Fırtına",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Pembe ve gri zeminde dairesel fırça darbeleri, beyaz ve turuncu lekeler.",
    image: { src: "images/ont-034.jpg", thumb: "images/thumbs/ont-034.jpg", alt: "Pembe Fırtına: Pembe ve gri zeminde dairesel fırça darbeleri, beyaz ve turuncu lekeler.", width: 1249, height: 1400 },
    source: "ON.TOK/35x50/20200104_143405.jpg",
    original: { price: 11000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-035",
    title: "Sarı Kıvrım",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mor ve gri zeminde kıvrılan sarı ve yeşil fırça darbeleri.",
    image: { src: "images/ont-035.jpg", thumb: "images/thumbs/ont-035.jpg", alt: "Sarı Kıvrım: Mor ve gri zeminde kıvrılan sarı ve yeşil fırça darbeleri.", width: 928, height: 1400 },
    source: "ON.TOK/35x50/20200104_143433.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-036",
    title: "Kızıl Düşüş",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Koyu zemin üzerinde turuncu ve kızıl geniş fırça darbeleri, aralarında mavi dikey bir şerit.",
    image: { src: "images/ont-036.jpg", thumb: "images/thumbs/ont-036.jpg", alt: "Kızıl Düşüş: Koyu zemin üzerinde turuncu ve kızıl geniş fırça darbeleri, aralarında mavi dikey bir şerit.", width: 1400, height: 1219 },
    source: "ON.TOK/35x50/20200104_143606.jpg",
    original: { price: 11500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-037",
    title: "Gece Bahçesi",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Koyu yeşil ve beyaz dokuların altında açık mor geniş bir alan ve sarı noktalar.",
    image: { src: "images/ont-037.jpg", thumb: "images/thumbs/ont-037.jpg", alt: "Gece Bahçesi: Koyu yeşil ve beyaz dokuların altında açık mor geniş bir alan ve sarı noktalar.", width: 1025, height: 1400 },
    source: "ON.TOK/35x50/20200104_143635.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-038",
    title: "Bej Akış",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Bej ve gri zeminde siyah kavisli çizgiler, turuncu ve kırmızı küçük vurgular.",
    image: { src: "images/ont-038.jpg", thumb: "images/thumbs/ont-038.jpg", alt: "Bej Akış: Bej ve gri zeminde siyah kavisli çizgiler, turuncu ve kırmızı küçük vurgular.", width: 1400, height: 1027 },
    source: "ON.TOK/35x50/20200104_143704.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-039",
    title: "Kış Deresi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Karla örtülü bir ovada kıvrılan koyu bir dere ve ufukta yaprakları dökülmüş ağaçlar.",
    image: { src: "images/ont-039.jpg", thumb: "images/thumbs/ont-039.jpg", alt: "Kış Deresi: Karla örtülü bir ovada kıvrılan koyu bir dere ve ufukta yaprakları dökülmüş ağaçlar.", width: 1144, height: 1400 },
    source: "ON.TOK/35x50/20200104_143917.jpg",
    original: { price: 13500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-040",
    title: "İskele Evi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yeşil ağaçların arasında suya uzanan bir iskele ve beyaz bir ev.",
    image: { src: "images/ont-040.jpg", thumb: "images/thumbs/ont-040.jpg", alt: "İskele Evi: Yeşil ağaçların arasında suya uzanan bir iskele ve beyaz bir ev.", width: 1155, height: 1400 },
    source: "ON.TOK/35x50/20200104_144000.jpg",
    original: { price: 22000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-041",
    title: "Gri Kıyı",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Bulutlu gri bir gökyüzü altında sakin bir kıyı ve suya düşen sarı ışık.",
    image: { src: "images/ont-041.jpg", thumb: "images/thumbs/ont-041.jpg", alt: "Gri Kıyı: Bulutlu gri bir gökyüzü altında sakin bir kıyı ve suya düşen sarı ışık.", width: 971, height: 1400 },
    source: "ON.TOK/35x50/20200104_144037.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-042",
    title: "Altın Saat",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Lila bir gökyüzü altında altın sarısı gün batımı, koyu ağaç sırası ve suya düşen yansıması.",
    image: { src: "images/ont-042.jpg", thumb: "images/thumbs/ont-042.jpg", alt: "Altın Saat: Lila bir gökyüzü altında altın sarısı gün batımı, koyu ağaç sırası ve suya düşen yansıması.", width: 927, height: 1400 },
    source: "ON.TOK/35x50/20200104_144254.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-043",
    title: "Lila Göl",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Sarı ışık altında yaprakları dökülen ağaçlar ve lila tonlarında durgun bir göl.",
    image: { src: "images/ont-043.jpg", thumb: "images/thumbs/ont-043.jpg", alt: "Lila Göl: Sarı ışık altında yaprakları dökülen ağaçlar ve lila tonlarında durgun bir göl.", width: 921, height: 1400 },
    source: "ON.TOK/35x50/20200104_144315.jpg",
    original: { price: 9500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-044",
    title: "Karda Köprü",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Karlı bir ormanda küçük bir köprü ve altından akan ince bir dere.",
    image: { src: "images/ont-044.jpg", thumb: "images/thumbs/ont-044.jpg", alt: "Karda Köprü: Karlı bir ormanda küçük bir köprü ve altından akan ince bir dere.", width: 929, height: 1400 },
    source: "ON.TOK/35x50/20200104_144355.jpg",
    original: { price: 13500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-045",
    title: "Sonbahar Köprüsü",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Turuncu ve kızıl ağaçların arasında uzak bir köprü ve suya düşen sonbahar yansımaları.",
    image: { src: "images/ont-045.jpg", thumb: "images/thumbs/ont-045.jpg", alt: "Sonbahar Köprüsü: Turuncu ve kızıl ağaçların arasında uzak bir köprü ve suya düşen sonbahar yansımaları.", width: 895, height: 1400 },
    source: "ON.TOK/35x50/20200104_144834.jpg",
    original: { price: 19000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-046",
    title: "Güz Gölü",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    featured: true,
    desc: "Altın sarısı ve turuncu ağaçlarla çevrili mavi bir göl ve üzerinde küçük bir kayık.",
    image: { src: "images/ont-046.jpg", thumb: "images/thumbs/ont-046.jpg", alt: "Güz Gölü: Altın sarısı ve turuncu ağaçlarla çevrili mavi bir göl ve üzerinde küçük bir kayık.", width: 941, height: 1400 },
    source: "ON.TOK/35x50/20200104_144936.jpg",
    original: { price: 24000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-047",
    title: "Sonbaharda Çağlayan",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Sarı ve turuncu ağaçların arasından dökülen beyaz bir çağlayan.",
    image: { src: "images/ont-047.jpg", thumb: "images/thumbs/ont-047.jpg", alt: "Sonbaharda Çağlayan: Sarı ve turuncu ağaçların arasından dökülen beyaz bir çağlayan.", width: 1400, height: 1021 },
    source: "ON.TOK/35x50/20200104_145033.jpg",
    original: { price: 30000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-048",
    title: "Kıyıda Balıkçı",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Sakin bir denizin kıyısında kayalar, kumsala çekilmiş bir kayık ve uçan martılar.",
    image: { src: "images/ont-048.jpg", thumb: "images/thumbs/ont-048.jpg", alt: "Kıyıda Balıkçı: Sakin bir denizin kıyısında kayalar, kumsala çekilmiş bir kayık ve uçan martılar.", width: 1400, height: 1020 },
    source: "ON.TOK/35x50/20200104_145127.jpg",
    original: { price: 17000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-049",
    title: "Kıyıdaki Ağaçlar",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mavi bir koyun kenarında sarı ve pembe yapraklı bir ağaç kümesi.",
    image: { src: "images/ont-049.jpg", thumb: "images/thumbs/ont-049.jpg", alt: "Kıyıdaki Ağaçlar: Mavi bir koyun kenarında sarı ve pembe yapraklı bir ağaç kümesi.", width: 1400, height: 1014 },
    source: "ON.TOK/35x50/20200104_145158.jpg",
    original: { price: 18000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-050",
    title: "Göl Kenarında Evler",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mavi göl ve dağların önünde beyaz evler, ön planda sarı ve kızıl sazlar.",
    image: { src: "images/ont-050.jpg", thumb: "images/thumbs/ont-050.jpg", alt: "Göl Kenarında Evler: Mavi göl ve dağların önünde beyaz evler, ön planda sarı ve kızıl sazlar.", width: 983, height: 1400 },
    source: "ON.TOK/35x50/20200104_145221.jpg",
    original: { price: 23500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-051",
    title: "Sarı Tepeler",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Sarı ve krem tonlarında dalgalanan tepeler, kıvrılan bir yol ve koyu ağaç kümeleri.",
    image: { src: "images/ont-051.jpg", thumb: "images/thumbs/ont-051.jpg", alt: "Sarı Tepeler: Sarı ve krem tonlarında dalgalanan tepeler, kıvrılan bir yol ve koyu ağaç kümeleri.", width: 947, height: 1400 },
    source: "ON.TOK/35x50/20200104_145419.jpg",
    original: { price: 10000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-052",
    title: "Liman Köyü",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Tepelerin eteğinde turuncu çatılı evler ve kalın fırça darbeleriyle işlenmiş mavi bir liman.",
    image: { src: "images/ont-052.jpg", thumb: "images/thumbs/ont-052.jpg", alt: "Liman Köyü: Tepelerin eteğinde turuncu çatılı evler ve kalın fırça darbeleriyle işlenmiş mavi bir liman.", width: 1026, height: 1400 },
    source: "ON.TOK/35x50/20200104_145753.jpg",
    original: { price: 35000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-053",
    title: "Fırtına Öncesi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Koyu, kabaran bulutların altında pembe bir ev ve altın sarısı bir tarla.",
    image: { src: "images/ont-053.jpg", thumb: "images/thumbs/ont-053.jpg", alt: "Fırtına Öncesi: Koyu, kabaran bulutların altında pembe bir ev ve altın sarısı bir tarla.", width: 997, height: 1400 },
    source: "ON.TOK/35x50/20200104_145825.jpg",
    original: { price: 32500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-054",
    title: "Çitli Çiftlik",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mavi dağın önünde kırmızı çatılı evler, yuvarlak ağaçlar ve ahşap bir çit.",
    image: { src: "images/ont-054.jpg", thumb: "images/thumbs/ont-054.jpg", alt: "Çitli Çiftlik: Mavi dağın önünde kırmızı çatılı evler, yuvarlak ağaçlar ve ahşap bir çit.", width: 962, height: 1400 },
    source: "ON.TOK/35x50/20200104_145839.jpg",
    original: { price: 23000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-055",
    title: "Göl Yolu",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Göl kıyısı boyunca kıvrılan bir yol ve suya uzanan sarı-yeşil ağaçlar.",
    image: { src: "images/ont-055.jpg", thumb: "images/thumbs/ont-055.jpg", alt: "Göl Yolu: Göl kıyısı boyunca kıvrılan bir yol ve suya uzanan sarı-yeşil ağaçlar.", width: 972, height: 1400 },
    source: "ON.TOK/35x50/20200104_145854_001.jpg",
    original: { price: 13000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-056",
    title: "Sarı Tarla",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Geniş mavi bir gökyüzü, sarı bir tarla ve önde koyu mavi çalılıklar.",
    image: { src: "images/ont-056.jpg", thumb: "images/thumbs/ont-056.jpg", alt: "Sarı Tarla: Geniş mavi bir gökyüzü, sarı bir tarla ve önde koyu mavi çalılıklar.", width: 973, height: 1400 },
    source: "ON.TOK/35x50/20200104_145920.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-057",
    title: "Koydaki Yelkenliler",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Turkuaz bir koyda demirlemiş yelkenliler ve uzakta beyaz bir fener.",
    image: { src: "images/ont-057.jpg", thumb: "images/thumbs/ont-057.jpg", alt: "Koydaki Yelkenliler: Turkuaz bir koyda demirlemiş yelkenliler ve uzakta beyaz bir fener.", width: 1400, height: 967 },
    source: "ON.TOK/35x50/20200104_150310.jpg",
    original: { price: 12000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-058",
    title: "Çiçekli Viraj",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yeşil yamaçlardan inen bir yol ve kıvrımında çiçek açmış pembe bir ağaç.",
    image: { src: "images/ont-058.jpg", thumb: "images/thumbs/ont-058.jpg", alt: "Çiçekli Viraj: Yeşil yamaçlardan inen bir yol ve kıvrımında çiçek açmış pembe bir ağaç.", width: 1224, height: 1400 },
    source: "ON.TOK/35x50/20200104_150333.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-059",
    title: "Erguvan Yolu",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Mor çiçekli büyük bir ağacın altından geçen yol ve yeşil tarlalar.",
    image: { src: "images/ont-059.jpg", thumb: "images/thumbs/ont-059.jpg", alt: "Erguvan Yolu: Mor çiçekli büyük bir ağacın altından geçen yol ve yeşil tarlalar.", width: 962, height: 1400 },
    source: "ON.TOK/35x50/20200104_150358.jpg",
    original: { price: 12000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-060",
    title: "Pembe Vadi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Pembe ve kahverengi tepeler arasından akan turkuaz bir dere ve küçük kırmızı ağaçlar.",
    image: { src: "images/ont-060.jpg", thumb: "images/thumbs/ont-060.jpg", alt: "Pembe Vadi: Pembe ve kahverengi tepeler arasından akan turkuaz bir dere ve küçük kırmızı ağaçlar.", width: 981, height: 1400 },
    source: "ON.TOK/35x50/20200104_150428.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-061",
    title: "Orman Yolu",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Yüksek çam ağaçlarının arasından kıvrılan lila bir yol ve üzerinde küçük kırmızı bir araba.",
    image: { src: "images/ont-061.jpg", thumb: "images/thumbs/ont-061.jpg", alt: "Orman Yolu: Yüksek çam ağaçlarının arasından kıvrılan lila bir yol ve üzerinde küçük kırmızı bir araba.", width: 968, height: 1400 },
    source: "ON.TOK/35x50/20200104_150445.jpg",
    original: { price: 13000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-062",
    title: "Ufka Giden Yol",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Bulutlu bir gökyüzüne doğru uzanan düz bir yol ve iki yanında çalılıklar.",
    image: { src: "images/ont-062.jpg", thumb: "images/thumbs/ont-062.jpg", alt: "Ufka Giden Yol: Bulutlu bir gökyüzüne doğru uzanan düz bir yol ve iki yanında çalılıklar.", width: 967, height: 1400 },
    source: "ON.TOK/35x50/20200104_150509.jpg",
    original: { price: 8000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-063",
    title: "Kızıl Damlalar",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "35 × 50 cm",
    year: null,
    desc: "Açık mavi zeminde siyah ve turuncu damlatma çizgilerden oluşan dikey bir kütle.",
    image: { src: "images/ont-063.jpg", thumb: "images/thumbs/ont-063.jpg", alt: "Kızıl Damlalar: Açık mavi zeminde siyah ve turuncu damlatma çizgilerden oluşan dikey bir kütle.", width: 984, height: 1400 },
    source: "ON.TOK/35x50/20200104_150534.jpg",
    original: { price: 10500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-064",
    title: "Kızıl Liman",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    featured: true,
    desc: "Kırmızı bir gökyüzünün altında yelkenli direkleri ve suya düşen beyaz yansımalar.",
    image: { src: "images/ont-064.jpg", thumb: "images/thumbs/ont-064.jpg", alt: "Kızıl Liman: Kırmızı bir gökyüzünün altında yelkenli direkleri ve suya düşen beyaz yansımalar.", width: 986, height: 1400 },
    source: "ON.TOK/50×70/20200104_131542.jpg",
    original: { price: 62500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-065",
    title: "Lavanta Tarlası",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Mor lavantalar, sarı bir tarla ve arkada yeşil ağaçlar ile soluk dağlar.",
    image: { src: "images/ont-065.jpg", thumb: "images/thumbs/ont-065.jpg", alt: "Lavanta Tarlası: Mor lavantalar, sarı bir tarla ve arkada yeşil ağaçlar ile soluk dağlar.", width: 937, height: 1400 },
    source: "ON.TOK/50×70/20200104_132031.jpg",
    original: { price: 19000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-066",
    title: "Kış Ormanında Dere",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Karlı bir ormanda koyu mavi bir dere ve üzerinden geçen küçük bir köprü.",
    image: { src: "images/ont-066.jpg", thumb: "images/thumbs/ont-066.jpg", alt: "Kış Ormanında Dere: Karlı bir ormanda koyu mavi bir dere ve üzerinden geçen küçük bir köprü.", width: 905, height: 1400 },
    source: "ON.TOK/50×70/20200104_132427.jpg",
    original: { price: 34500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-067",
    title: "Rıhtım Evleri",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Rıhtım boyunca dizilmiş açık renkli binalar, tekneler ve mavi suya düşen yansımalar.",
    image: { src: "images/ont-067.jpg", thumb: "images/thumbs/ont-067.jpg", alt: "Rıhtım Evleri: Rıhtım boyunca dizilmiş açık renkli binalar, tekneler ve mavi suya düşen yansımalar.", width: 938, height: 1400 },
    source: "ON.TOK/50×70/20200104_132614.jpg",
    original: { price: 50000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-068",
    title: "Yeşil Düğüm",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Beyaz zeminde lacivert, yeşil ve bordo lekelerin etrafında dönen siyah çizgiler.",
    image: { src: "images/ont-068.jpg", thumb: "images/thumbs/ont-068.jpg", alt: "Yeşil Düğüm: Beyaz zeminde lacivert, yeşil ve bordo lekelerin etrafında dönen siyah çizgiler.", width: 934, height: 1400 },
    source: "ON.TOK/50×70/20200104_132634.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-069",
    title: "Kemerli Köprü",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Turuncu ve sarı yapraklı ağaçların arasında kemerli bir köprü ve mavi su.",
    image: { src: "images/ont-069.jpg", thumb: "images/thumbs/ont-069.jpg", alt: "Kemerli Köprü: Turuncu ve sarı yapraklı ağaçların arasında kemerli bir köprü ve mavi su.", width: 941, height: 1400 },
    source: "ON.TOK/50×70/20200104_132750.jpg",
    original: { price: 38500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-070",
    title: "Beyaz Sokak",
    subject: "Kent",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Dikey beyaz ve mavi fırça darbeleriyle uzaklaşan bir sokak ve iki yanında binalar.",
    image: { src: "images/ont-070.jpg", thumb: "images/thumbs/ont-070.jpg", alt: "Beyaz Sokak: Dikey beyaz ve mavi fırça darbeleriyle uzaklaşan bir sokak ve iki yanında binalar.", width: 1400, height: 1003 },
    source: "ON.TOK/50×70/20200104_133234.jpg",
    original: { price: 20500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-071",
    title: "Yeşil Göl",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Turkuaz bir gölün iki yanında koyu yeşil ağaçlar ve dikey fırça izleri.",
    image: { src: "images/ont-071.jpg", thumb: "images/thumbs/ont-071.jpg", alt: "Yeşil Göl: Turkuaz bir gölün iki yanında koyu yeşil ağaçlar ve dikey fırça izleri.", width: 1400, height: 1012 },
    source: "ON.TOK/50×70/20200104_133310.jpg",
    original: { price: 17500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-072",
    title: "Karlı Yamaç",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Karla kaplı yamaçlar, koyu çam ağaçları ve arasından akan mavi bir dere.",
    image: { src: "images/ont-072.jpg", thumb: "images/thumbs/ont-072.jpg", alt: "Karlı Yamaç: Karla kaplı yamaçlar, koyu çam ağaçları ve arasından akan mavi bir dere.", width: 1400, height: 998 },
    source: "ON.TOK/50×70/20200104_133337.jpg",
    original: { price: 25000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-073",
    title: "Renkli Şehir",
    subject: "Kent",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Mavi bir gökyüzü altında sarı, turuncu ve kırmızı bloklardan oluşan bir şehir silueti.",
    image: { src: "images/ont-073.jpg", thumb: "images/thumbs/ont-073.jpg", alt: "Renkli Şehir: Mavi bir gökyüzü altında sarı, turuncu ve kırmızı bloklardan oluşan bir şehir silueti.", width: 1400, height: 1013 },
    source: "ON.TOK/50×70/20200104_133444.jpg",
    original: { price: 33000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-074",
    title: "Kış Sisi",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Gri ve lila dikey fırça darbeleri arasında sarı izler ve beyaz bir zemin.",
    image: { src: "images/ont-074.jpg", thumb: "images/thumbs/ont-074.jpg", alt: "Kış Sisi: Gri ve lila dikey fırça darbeleri arasında sarı izler ve beyaz bir zemin.", width: 1400, height: 1098 },
    source: "ON.TOK/50×70/20200104_133526.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-075",
    title: "Kar Altında Tepeler",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Beyaz ve lila tonlarında karlı tepeler ve aralarında koyu ağaçlar.",
    image: { src: "images/ont-075.jpg", thumb: "images/thumbs/ont-075.jpg", alt: "Kar Altında Tepeler: Beyaz ve lila tonlarında karlı tepeler ve aralarında koyu ağaçlar.", width: 1400, height: 1057 },
    source: "ON.TOK/50×70/20200104_133551.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-076",
    title: "Turkuaz Koy",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Turkuaz bir koy, yeşil ve sarı kıyı şeridi ve uzakta kahverengi tepeler.",
    image: { src: "images/ont-076.jpg", thumb: "images/thumbs/ont-076.jpg", alt: "Turkuaz Koy: Turkuaz bir koy, yeşil ve sarı kıyı şeridi ve uzakta kahverengi tepeler.", width: 1400, height: 1047 },
    source: "ON.TOK/50×70/20200104_133624.jpg",
    original: { price: 21000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-077",
    title: "Sarı Çiçekli Tepe",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Mor dağların önünde sarı çiçekli bir yamaç ve gri-kahverengi geniş alanlar.",
    image: { src: "images/ont-077.jpg", thumb: "images/thumbs/ont-077.jpg", alt: "Sarı Çiçekli Tepe: Mor dağların önünde sarı çiçekli bir yamaç ve gri-kahverengi geniş alanlar.", width: 1400, height: 1090 },
    source: "ON.TOK/50×70/20200104_133712.jpg",
    original: { price: 22500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-078",
    title: "Durgun Nehir",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Yeşil ağaçlarla çevrili, gökyüzünü yansıtan sakin bir nehir.",
    image: { src: "images/ont-078.jpg", thumb: "images/thumbs/ont-078.jpg", alt: "Durgun Nehir: Yeşil ağaçlarla çevrili, gökyüzünü yansıtan sakin bir nehir.", width: 1400, height: 993 },
    source: "ON.TOK/50×70/20200104_133821.jpg",
    original: { price: 16500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-079",
    title: "Mavi Körfez",
    subject: "Deniz",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Yeşil bir burnun önünde yatay fırça darbeleriyle işlenmiş mavi bir deniz.",
    image: { src: "images/ont-079.jpg", thumb: "images/thumbs/ont-079.jpg", alt: "Mavi Körfez: Yeşil bir burnun önünde yatay fırça darbeleriyle işlenmiş mavi bir deniz.", width: 1400, height: 1016 },
    source: "ON.TOK/50×70/20200104_134104.jpg",
    original: { price: 15000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-080",
    title: "Kızıl Ağaç",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Göl kenarında kızıl ve kahverengi yapraklı bir ağaç ve uzakta küçük bir kayık.",
    image: { src: "images/ont-080.jpg", thumb: "images/thumbs/ont-080.jpg", alt: "Kızıl Ağaç: Göl kenarında kızıl ve kahverengi yapraklı bir ağaç ve uzakta küçük bir kayık.", width: 957, height: 1400 },
    source: "ON.TOK/50×70/20200104_134142.jpg",
    original: { price: 22000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-081",
    title: "Yeşil ve Mor",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Geniş yeşil ve mor alanlar, üzerinde beyaz çizikler ve kahverengi küçük biçimler.",
    image: { src: "images/ont-081.jpg", thumb: "images/thumbs/ont-081.jpg", alt: "Yeşil ve Mor: Geniş yeşil ve mor alanlar, üzerinde beyaz çizikler ve kahverengi küçük biçimler.", width: 964, height: 1400 },
    source: "ON.TOK/50×70/20200104_134217.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-082",
    title: "Orman Deresi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Koyu yeşil bir ormanın içinden kıvrılarak akan beyaz bir dere.",
    image: { src: "images/ont-082.jpg", thumb: "images/thumbs/ont-082.jpg", alt: "Orman Deresi: Koyu yeşil bir ormanın içinden kıvrılarak akan beyaz bir dere.", width: 971, height: 1400 },
    source: "ON.TOK/50×70/20200104_134247.jpg",
    original: { price: 17000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-083",
    title: "Yeşil Vadi",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Ağaçlı bir vadide akan turkuaz bir dere ve kenarındaki patika.",
    image: { src: "images/ont-083.jpg", thumb: "images/thumbs/ont-083.jpg", alt: "Yeşil Vadi: Ağaçlı bir vadide akan turkuaz bir dere ve kenarındaki patika.", width: 1400, height: 1052 },
    source: "ON.TOK/50×70/20200104_134438.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-084",
    title: "Vazoda Beyaz Çiçekler",
    subject: "Çiçek",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Mavi bir vazoda beyaz çiçekler, arka planda parçalı mavi ve kahverengi alanlar.",
    image: { src: "images/ont-084.jpg", thumb: "images/thumbs/ont-084.jpg", alt: "Vazoda Beyaz Çiçekler: Mavi bir vazoda beyaz çiçekler, arka planda parçalı mavi ve kahverengi alanlar.", width: 948, height: 1400 },
    source: "ON.TOK/50×70/20200104_134557.jpg",
    original: { price: 36500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-085",
    title: "Mavi Fırtına",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Lacivert ve turkuaz geniş alanlar, siyah çizgiler ve krem rengi bir köşe.",
    image: { src: "images/ont-085.jpg", thumb: "images/thumbs/ont-085.jpg", alt: "Mavi Fırtına: Lacivert ve turkuaz geniş alanlar, siyah çizgiler ve krem rengi bir köşe.", width: 925, height: 1400 },
    source: "ON.TOK/50×70/20200104_134639.jpg",
    original: { price: 18500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-086",
    title: "Güz Tepeleri",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Mavi tepelerin önünde sarı ve turuncu bir bitki örtüsü ve gri yamaçlar.",
    image: { src: "images/ont-086.jpg", thumb: "images/thumbs/ont-086.jpg", alt: "Güz Tepeleri: Mavi tepelerin önünde sarı ve turuncu bir bitki örtüsü ve gri yamaçlar.", width: 1400, height: 1161 },
    source: "ON.TOK/50×70/20200104_134751.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-087",
    title: "Mavi Nehir",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    featured: true,
    desc: "Koyu mavi bir gökyüzü altında yeşil ağaçlar arasından akan parlak mavi bir nehir.",
    image: { src: "images/ont-087.jpg", thumb: "images/thumbs/ont-087.jpg", alt: "Mavi Nehir: Koyu mavi bir gökyüzü altında yeşil ağaçlar arasından akan parlak mavi bir nehir.", width: 1400, height: 1089 },
    source: "ON.TOK/50×70/20200104_134901.jpg",
    original: { price: 15500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-088",
    title: "Dağların Arasından Nehir",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Sisli mor dağların önünden akan bir nehir ve kıyısındaki ağaçlar.",
    image: { src: "images/ont-088.jpg", thumb: "images/thumbs/ont-088.jpg", alt: "Dağların Arasından Nehir: Sisli mor dağların önünden akan bir nehir ve kıyısındaki ağaçlar.", width: 1400, height: 1089 },
    source: "ON.TOK/50×70/20200104_134927.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-089",
    title: "Parçalı Figür",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Gri zeminde mavi, turuncu ve beyaz parçalardan oluşan dikey bir kütle.",
    image: { src: "images/ont-089.jpg", thumb: "images/thumbs/ont-089.jpg", alt: "Parçalı Figür: Gri zeminde mavi, turuncu ve beyaz parçalardan oluşan dikey bir kütle.", width: 976, height: 1400 },
    source: "ON.TOK/50×70/20200104_135052.jpg",
    original: { price: 20000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-090",
    title: "Renk Kümesi",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Krem zeminde kırmızı, sarı, mavi ve siyah lekelerin oluşturduğu yoğun bir küme.",
    image: { src: "images/ont-090.jpg", thumb: "images/thumbs/ont-090.jpg", alt: "Renk Kümesi: Krem zeminde kırmızı, sarı, mavi ve siyah lekelerin oluşturduğu yoğun bir küme.", width: 905, height: 1400 },
    source: "ON.TOK/50×70/20200104_135114.jpg",
    original: { price: 27000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-091",
    title: "Çizgi ve Renk",
    subject: "Soyut",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Açık sarı zeminde serbest siyah çizgiler ve ortada mor, sarı ve kırmızı renk blokları.",
    image: { src: "images/ont-091.jpg", thumb: "images/thumbs/ont-091.jpg", alt: "Çizgi ve Renk: Açık sarı zeminde serbest siyah çizgiler ve ortada mor, sarı ve kırmızı renk blokları.", width: 942, height: 1400 },
    source: "ON.TOK/50×70/20200104_135522.jpg",
    original: { price: 12500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-092",
    title: "Beyaz Elbiseli Kadın",
    subject: "Figür",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Mavi bir arka planın önünde, kollarını başına kaldırmış beyaz elbiseli bir kadın.",
    image: { src: "images/ont-092.jpg", thumb: "images/thumbs/ont-092.jpg", alt: "Beyaz Elbiseli Kadın: Mavi bir arka planın önünde, kollarını başına kaldırmış beyaz elbiseli bir kadın.", width: 927, height: 1400 },
    source: "ON.TOK/50×70/20200104_140105.jpg",
    original: { price: 75000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-093",
    title: "Beyaz At",
    subject: "Portre",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    featured: true,
    desc: "Gri ve beyaz fırça darbeleriyle işlenmiş, başı hafifçe eğik beyaz bir at.",
    image: { src: "images/ont-093.jpg", thumb: "images/thumbs/ont-093.jpg", alt: "Beyaz At: Gri ve beyaz fırça darbeleriyle işlenmiş, başı hafifçe eğik beyaz bir at.", width: 926, height: 1400 },
    source: "ON.TOK/50×70/20200104_140249.jpg",
    original: { price: 56000, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-094",
    title: "Sonbahar Yolu",
    subject: "Manzara",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Sarı ve turuncu yapraklı ağaçların arasından ışığa doğru uzanan ıslak bir yol.",
    image: { src: "images/ont-094.jpg", thumb: "images/thumbs/ont-094.jpg", alt: "Sonbahar Yolu: Sarı ve turuncu yapraklı ağaçların arasından ışığa doğru uzanan ıslak bir yol.", width: 1400, height: 1068 },
    source: "ON.TOK/50×70/20200104_140333.jpg",
    original: { price: 42500, status: "available" }
  },
  {
    // DOLDURULACAK: ad geçici; teknik, yıl
    id: "ont-095",
    title: "Soyut At",
    subject: "Portre",
    technique: null,
    medium: null,
    size: "50 × 70 cm",
    year: null,
    desc: "Açık zeminde bordo, mavi ve siyah fırça darbeleriyle soyutlanmış bir at başı.",
    image: { src: "images/ont-095.jpg", thumb: "images/thumbs/ont-095.jpg", alt: "Soyut At: Açık zeminde bordo, mavi ve siyah fırça darbeleriyle soyutlanmış bir at başı.", width: 941, height: 1400 },
    source: "ON.TOK/50×70/20200104_140626.jpg",
    original: { price: 31000, status: "available" }
  }
];

// ==== MAGNETLER (DEMO) ====
// Her eserin buzdolabı magneti. Demo ürünüdür: sipariş alınır, gönderim yapılmaz (sitede belirtilir).
// Stok elle tutulur ve siparişle kendiliğinden düşmez (veritabanı yok; kayıt Hafta 3'te n8n/Sheets'te).
// Kimlik: "mag-" + eser kimliği (ör. mag-ont-001). prepDays: hazırlanma süresi (iş günü), AI'ya tahmin ettirilmez.
export const MAGNET = { price: 1000, prepDays: 3, stock: 2, maxPerOrder: 2 };
// Tükenmiş görünen magnetler (stok 0): "Stok gelince haber ver" formu bunlarda çıkar
export const MAGNET_SOLD_OUT = ["ont-003", "ont-009", "ont-028", "ont-064", "ont-092", "ont-093"];
