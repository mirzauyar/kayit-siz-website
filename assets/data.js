/*
  SİTENİN İÇERİĞİ BURADAN DÜZENLENİR
  ----------------------------------
  - Yeni etkinlik eklemek için "etkinlikler" listesine bir blok kopyalayın.
  - Biten etkinliği "arsiv" listesine taşıyın ve posterini assets/posters klasörüne koyun.
  - "poster" boş bırakılırsa site, başlıktan otomatik bir poster çizer.
  - "kayitLinki" doluysa (ör. Google Form adresi) "Kayıt Ol" o linke gider.
    Boşsa sitenin kendi kayıt formu açılır.
*/

// Sitenin kendi kayıt formunun gönderileceği adres (Formspree).
// formspree.io'dan ücretsiz form açıp size verilen adresi buraya yapıştırın,
// ör: "https://formspree.io/f/abcdwxyz". Boşken form sadece deneme modunda çalışır.
window.FORM_ENDPOINT = "";

window.SITE = {
  kayitsiz: {
    ad: "kayıt-sız",
    slogan: "kaydı olmayanların kulübü.",
    aciklama:
      "Eskişehir'de öğrencilerin bir araya gelip konuştuğu, ürettiği, dinlediği ve eğlendiği bağımsız öğrenci kulübü.",
    instagram: "https://www.instagram.com/kayitsizkulup/",
    bant: ["söyleşi", "atölye", "konser", "gösterim", "buluşma", "kayıt-sız"],

    // YAKLAŞAN ETKİNLİKLER (aşağıdakiler örnektir, kendi etkinliklerinizle değiştirin)
    etkinlikler: [
      {
        baslik: "örnek etkinlik: tanışma buluşması",
        tarih: "2026-11-05",
        saat: "19:00",
        yer: "Fakülte Performance Hall",
        aciklama: "Dönemin ilk buluşması. Yeni gelenlerle tanışıyoruz.",
        kontenjan: 80,
        poster: "",
        kayitLinki: "",
      },
      {
        baslik: "örnek etkinlik: poster atölyesi",
        tarih: "2026-11-19",
        saat: "18:30",
        yer: "Monk Coffee & Books",
        aciklama: "Kendi posterini tasarla. Malzemeler bizden.",
        kontenjan: 25,
        poster: "",
        kayitLinki: "",
      },
    ],

    // ARŞİV (örnektir; gerçek posterleri assets/posters içine koyup adını yazın)
    arsiv: [
      { baslik: "açılış partisi", tarih: "2026-03-14", yer: "Fakülte", poster: "" },
      { baslik: "film gecesi #1", tarih: "2026-03-28", yer: "Faust Sahaf", poster: "" },
      { baslik: "zine atölyesi", tarih: "2026-04-11", yer: "Monk", poster: "" },
      { baslik: "açık mikrofon", tarih: "2026-04-25", yer: "Pan Cafe", poster: "" },
      { baslik: "bahar konseri", tarih: "2026-05-16", yer: "Fakülte", poster: "" },
      { baslik: "kutu oyunu gecesi", tarih: "2026-05-30", yer: "Meeple", poster: "" },
      { baslik: "sezon kapanışı", tarih: "2026-06-13", yer: "La Liberta", poster: "" },
      { baslik: "yaz buluşması", tarih: "2025-07-05", yer: "Olympos", poster: "" },
    ],

    // Anlaşmalı işletmeler (repodaki kayit-siz.pdf'ten alındı)
    isletmeler: [
      ["Fakülte Performance Hall", "%20"],
      ["Fakülte Osmangazi", "%20", "saat 18:00'den sonra"],
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
    ],
  },

  btf: {
    ad: "BTF",
    slogan: "bademlik tasarım.",
    aciklama:
      "Tasarım Bademlik'in etkinlik arşivi ve kayıt sayfası. (Bu açıklamayı BTF ekibinin kendi metniyle değiştirin.)",
    instagram: "https://www.instagram.com/tasarimbademlik/",
    bant: ["tasarım", "atölye", "sergi", "söyleşi", "BTF"],

    etkinlikler: [
      {
        baslik: "örnek etkinlik: tipografi atölyesi",
        tarih: "2026-11-12",
        saat: "14:00",
        yer: "Bademlik",
        aciklama: "Harflerle oynuyoruz. Kâğıt, makas, mürekkep.",
        kontenjan: 30,
        poster: "",
        kayitLinki: "",
      },
    ],

    arsiv: [
      { baslik: "açılış sergisi", tarih: "2026-04-04", yer: "Bademlik", poster: "" },
      { baslik: "risograf günü", tarih: "2026-04-18", yer: "Bademlik", poster: "" },
      { baslik: "portfolyo söyleşisi", tarih: "2026-05-09", yer: "Bademlik", poster: "" },
      { baslik: "yaz atölyesi", tarih: "2026-06-20", yer: "Bademlik", poster: "" },
    ],

    isletmeler: [],
  },
};
