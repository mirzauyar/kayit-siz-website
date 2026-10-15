/*
  SİTENİN İÇERİĞİ BURADAN DÜZENLENİR
  ----------------------------------
  - Yeni etkinlik için "etkinlikler" listesine bir blok kopyalayıp bilgileri değiştirin.
  - Tarihi geçen etkinlik kendiliğinden arşive düşer (posteri varsa posteriyle).
  - Posterleri assets/posters klasörüne yükleyip dosya adını "poster" kısmına yazın.
  - kategori: "etkinlik", "atölye", "söyleşi" veya "sinema"
  - "kayitLinki" doluysa (ör. Google Form adresi) "kayıt ol" o linke gider.
    Boşsa sitenin kendi kayıt formu açılır.
*/

// Sitenin kendi kayıt formunun gideceği adres (Formspree).
// formspree.io'dan ücretsiz form açıp verilen adresi buraya yapıştırın,
// ör: "https://formspree.io/f/abcdwxyz". Boşken form deneme modunda çalışır.
window.FORM_ENDPOINT = "";

window.KULUP = {
  universite: "Eskişehir Osmangazi Üniversitesi",
  kulup: "Mimarlık ve Tasarım Kulübü",
  instagram: "https://www.instagram.com/kayitsizkulup/",
  instagramAd: "@kayitsizkulup",
  kampus: "ESOGÜ Bademlik Kampüsü",
  btf: {
    ad: "Bademlik Tasarım Festivali",
    // BTF sitesi hazır olunca buraya onun adresini yazın (ör. "btf.html")
    link: "https://www.instagram.com/tasarimbademlik/",
  },
};

window.KATEGORILER = ["etkinlik", "atölye", "söyleşi", "sinema"];

// YAKLAŞAN ETKİNLİKLER
// Aşağıdaki "ornek: true" olan blok sadece kayıt sistemini göstermek için. Gerçek etkinlikle değiştirin.
window.ETKINLIKLER = [
  {
    ornek: true,
    baslik: "örnek etkinlik",
    kategori: "atölye",
    tarih: "2026-11-12",
    saat: "15:00",
    yer: "ESOGÜ Bademlik Kampüsü / Atrium",
    aciklama: "Bu bir örnek. Gerçek etkinlik bilgileriyle değiştirin.",
    kontenjan: 25,
    poster: "",
    kayitLinki: "",
  },
];

// ARŞİV (posterlerden alındı)
window.ARSIV = [
  { baslik: "collage gathering", kategori: "atölye", tarih: "2025-12-23", saat: "19:00", yer: "P.XI", kisi: "Hatice Karakaş", poster: "2025-12-collage-gathering.jpg" },
  { baslik: "geleneksel yılbaşı ağacı atölyesi", kategori: "atölye", tarih: "2025-12-05", yer: "Atrium", poster: "2025-12-yilbasi-agaci-atolyesi.jpg" },
  { baslik: "quiz night: Bademlik'e ne kadar hakimsin?", kategori: "etkinlik", tarih: "2025-10-31", saat: "19:00", yer: "Faust Sahaf Kafe", poster: "2025-10-quiz-night.jpg" },
  { baslik: "megalopolis", kategori: "sinema", tarih: "2025-10-21", saat: "18:30", kisi: "Dr. Öğr. Üyesi T. Nihan Hacıömeroğlu", poster: "2025-10-megalopolis.jpg" },
  { baslik: "kayıt-sız ekip arkadaşları arıyor", kategori: "etkinlik", tarih: "2025-10-14", aciklama: "başvuru tarihleri: 14-20 ekim", poster: "2025-10-ekip-arkadaslari.jpg" },
  { baslik: "tanışma zamanı", kategori: "etkinlik", tarih: "2025-10-09", saat: "19:00", yer: "Hera Sokak Kafe", aciklama: "kahve ve tatlı eşliğinde", poster: "2025-10-tanisma-zamani.jpg" },
  { baslik: "by Zenachi hand made", kategori: "söyleşi", tarih: "2025-03-20", saat: "13:00", yer: "ESOGÜ Bademlik Kampüsü / Atrium", poster: "2025-03-zenachi.jpg" },
  { baslik: "okuldaki atıkları geri dönüştürerek yılbaşı ağacı yapıyoruz", kategori: "atölye", tarih: "2024-12-20", yer: "ESOGÜ Bademlik Kampüsü", poster: "2024-12-geri-donusum-yilbasi-agaci.jpg" },
  { baslik: "deforme illüstrasyonla mekansal yerleştirme atölyesi", kategori: "atölye", tarih: "2024-12-14", saat: "15:00", yer: "ESOGÜ Bademlik Kampüsü", kisi: "Oğuzhan Acar · BIDON", poster: "2024-12-bidon-atolyesi.jpg" },
  { baslik: "ödüllü kahoot eğlencesi", kategori: "etkinlik", tarih: "2024-12-05", yer: "ESOGÜ Bademlik Kampüsü", poster: "2024-12-kahoot.jpg" },
  { baslik: "sucuk ekmek talks", kategori: "etkinlik", tarih: "2024-11-14", saat: "17:00", yer: "ESOGÜ Bademlik Kampüsü", poster: "2024-11-sucuk-ekmek-talks.jpg" },
  { baslik: "ölçeklerarası tasarım", kategori: "söyleşi", tarih: "2024-10-25", saat: "14:30", yer: "ESOGÜ Bademlik Kampüsü / Atrium", kisi: "İlayda Ömer · PLUG", poster: "2024-10-olceklerarasi-tasarim.jpg" },
];

// ANLAŞMALI İŞLETMELER (kayit-siz.pdf'ten)
window.ISLETMELER = [
  ["Fakülte Performance Hall", "%20"],
  ["Fakülte Osmangazi", "%20", "18:00'den sonra"],
  ["Pixel Dijital Baskı", "%20"],
  ["Marina", "%20 / %10", "nakit / kart"],
  ["Neyzen Meyhane", "%15"],
  ["Olympos Eskişehir", "%15"],
  ["Koala Coffee Co.", "%15"],
  ["Hera Sokak", "%20"],
  ["Walker's Coffee House", "%10"],
  ["Faust Sahaf & Cafe", "%15", "sahaf ve cafe"],
  ["Monk Coffee & Books", "%20 / %10", "kitap / yiyecek-içecek"],
  ["Meeple Board Game & Cafe", "%10"],
  ["Cajun Food Center", "%10"],
  ["Pan Cafe & Cocktail Bar", "%10"],
  ["Pi Box", "%10"],
  ["Judas Cafe & Kitchen", "%10"],
  ["Dunk Coffee Co.", "%10"],
  ["La Liberta Performance", "%10"],
  ["Elma Cafe & Bistro", "%10", "kampanyalar, çay ve su hariç"],
  ["Espilav", "%10"],
  ["Makarnax Büyükdere", "20 ₺"],
  ["Çördük", "%10"],
  ["Can Can", "%10"],
];
