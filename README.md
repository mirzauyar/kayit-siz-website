# kayıt-sız web sitesi

ESOGÜ Mimarlık ve Tasarım Kulübü (kayıt-sız) için etkinlik arşivi ve yaklaşan etkinliklere kayıt sitesi. Tasarım dili kulübün posterlerinden alındı. Sağ alttaki **BTF** logosu şimdilik BTF'nin Instagram sayfasına gider; BTF sitesi hazır olunca `data.js` içindeki `btf.link` değiştirilir.

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | kayıt-sız ana sayfası |
| `assets/btf-logo.png` | BTF logosu |
| `assets/data.js` | **Tüm içerik burada**: etkinlikler, arşiv, indirimler, kayıt formu adresi |
| `assets/posters/` | Poster görsellerinin konacağı klasör |

## İçerik nasıl güncellenir?
1. `assets/data.js` dosyasını GitHub'da açıp kalem simgesine basın.
2. Yeni etkinlik için `ETKINLIKLER` listesindeki bir bloğu kopyalayıp bilgileri değiştirin.
3. Tarihi geçen etkinlikler kendiliğinden arşive düşer.
4. Poster eklemek için görseli `assets/posters/` klasörüne yükleyin, adını `poster: "dosya-adi.jpg"` olarak yazın. Boş bırakılırsa site başlıktan otomatik bir poster çizer.

## Kayıt formu
- Bir etkinliğe `kayitLinki` olarak Google Form adresi yazarsanız "kayıt ol" o forma gider.
- Yazmazsanız sitenin kendi formu açılır. Bu formun kayıtları alabilmesi için formspree.io'dan ücretsiz bir form açıp verdiği adresi `data.js` içindeki `FORM_ENDPOINT` satırına yapıştırın. O zamana kadar form deneme modundadır.

## Yayına alma (GitHub Pages)
Repo ayarları → Pages → "Deploy from a branch" → `main` / `root` → Save.
Site birkaç dakika içinde `https://mirzauyar.github.io/kayit-siz-website/` adresinde açılır.
