(function () {
  "use strict";

  var key = document.body.getAttribute("data-site");
  var S = window.SITE[key];
  var AYLAR = ["oca", "şub", "mar", "nis", "may", "haz", "tem", "ağu", "eyl", "eki", "kas", "ara"];
  var GUNLER = ["pazar", "pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi"];

  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { var t = new Date(); t.setHours(0, 0, 0, 0); return t; }
  function nice(d) { var x = parse(d); return x.getDate() + " " + AYLAR[x.getMonth()] + " " + x.getFullYear(); }

  /* HERO */
  var logo = $(".hero-logo");
  var box = el("span", "box");
  Array.from(S.ad).forEach(function (c, i) {
    var s = el("span", "ch" + (c === "-" ? " dash" : ""));
    s.textContent = c;
    s.style.animationDelay = (0.5 + i * 0.07) + "s" + (c === "-" ? ", 1.6s" : "");
    box.appendChild(s);
  });
  logo.appendChild(box);
  $(".hero-slogan").textContent = S.slogan;
  $(".hero-text").textContent = S.aciklama;
  $(".footer-ig").href = S.instagram;
  $(".footer-ig").textContent = "instagram ↗";

  /* KAYAN BANT */
  var words = S.bant.map(function (w) { return "<span>" + esc(w) + "</span><span>✱</span>"; }).join("");
  $(".marquee-track").innerHTML = words + words + words + words;

  /* OTOMATİK POSTER (poster görseli yoksa) */
  function autoPoster(item, i) {
    var v = "v" + (i % 3);
    var words = esc(item.baslik).split(" ");
    var t = words.map(function (w, j) { return j === words.length - 1 ? "<span>" + w + "</span>" : w; }).join(" ");
    return '<div class="auto ' + v + '">' +
      '<div class="circle"></div>' +
      '<div class="t">' + t + "</div>" +
      '<div class="b"><span class="logo">' + esc(S.ad) + "</span><span>" + nice(item.tarih) + "<br>" + esc(item.yer || "") + "</span></div>" +
      "</div>";
  }
  function posterHtml(item, i) {
    return item.poster
      ? '<img loading="lazy" src="assets/posters/' + esc(item.poster) + '" alt="' + esc(item.baslik) + ' posteri">'
      : autoPoster(item, i);
  }

  /* ETKİNLİKLER: tarihi geçenler kendiliğinden arşive düşer */
  var now = today();
  var upcoming = S.etkinlikler.filter(function (e) { return parse(e.tarih) >= now; })
    .sort(function (a, b) { return parse(a.tarih) - parse(b.tarih); });
  var past = S.etkinlikler.filter(function (e) { return parse(e.tarih) < now; });
  var archive = S.arsiv.concat(past).sort(function (a, b) { return parse(b.tarih) - parse(a.tarih); });

  var evWrap = $(".events");
  if (!upcoming.length) {
    evWrap.appendChild(el("p", "empty", "şu an planlı etkinlik yok. instagram'dan takipte kal."));
  }
  upcoming.forEach(function (e) {
    var d = parse(e.tarih);
    var card = el("article", "event reveal");
    card.innerHTML =
      '<div class="event-date"><div class="d">' + d.getDate() + '</div><div class="m">' + AYLAR[d.getMonth()] + " " + d.getFullYear() + "<br>" + GUNLER[d.getDay()] + "</div></div>" +
      "<div><h3>" + esc(e.baslik) + '</h3><div class="meta">' + esc(e.saat || "") + " · " + esc(e.yer || "") + "</div><p>" + esc(e.aciklama || "") + "</p></div>" +
      '<div class="side">' +
      (e.kontenjan ? '<div class="count">kontenjan <b>' + esc(e.kontenjan) + "</b> kişi</div>" : "") +
      '<button class="btn btn-y" type="button">kayıt ol →</button></div>';
    $("button", card).addEventListener("click", function () {
      if (e.kayitLinki) window.open(e.kayitLinki, "_blank", "noopener");
      else openForm(e);
    });
    evWrap.appendChild(card);
  });

  /* ARŞİV + YIL FİLTRESİ */
  var arWrap = $(".archive");
  var years = Array.from(new Set(archive.map(function (a) { return a.tarih.slice(0, 4); })));
  var fWrap = $(".filters");
  ["hepsi"].concat(years).forEach(function (y, i) {
    var b = el("button", "chip" + (i === 0 ? " on" : ""));
    b.type = "button";
    b.textContent = y;
    b.addEventListener("click", function () {
      fWrap.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
      b.classList.add("on");
      renderArchive(y === "hepsi" ? null : y);
    });
    fWrap.appendChild(b);
  });
  function renderArchive(year) {
    arWrap.innerHTML = "";
    archive.filter(function (a) { return !year || a.tarih.indexOf(year) === 0; }).forEach(function (a, i) {
      var p = el("button", "poster reveal");
      p.type = "button";
      p.style.transitionDelay = (i % 4) * 0.08 + "s";
      p.innerHTML = '<div class="sheet">' + posterHtml(a, i) + '</div><div class="cap"><b>' + esc(a.baslik) + "</b>" + nice(a.tarih) + " · " + esc(a.yer || "") + "</div>";
      p.addEventListener("click", function () { openPoster(a, i); });
      arWrap.appendChild(p);
    });
    observe();
  }
  renderArchive(null);

  /* İŞLETMELER */
  var pWrap = $(".partners");
  if (pWrap) {
    S.isletmeler.forEach(function (x) {
      var c = el("div", "partner reveal");
      c.innerHTML = '<span class="n">' + esc(x[0]) + "</span>" + (x[2] ? '<span class="x">' + esc(x[2]) + "</span>" : "") + '<span class="p"><span>' + esc(x[1]) + "</span></span>";
      pWrap.appendChild(c);
    });
  }

  /* MODAL */
  var modal = el("div", "modal");
  modal.innerHTML = '<div class="modal-box" role="dialog" aria-modal="true"><button class="close" type="button" aria-label="kapat">×</button><div class="modal-body"></div></div>';
  document.body.appendChild(modal);
  function openModal(html, cls) {
    modal.className = "modal open " + (cls || "");
    $(".modal-body", modal).innerHTML = html;
    document.body.style.overflow = "hidden";
  }
  function closeModal() { modal.className = "modal"; document.body.style.overflow = ""; }
  $(".close", modal).addEventListener("click", closeModal);
  modal.addEventListener("click", function (ev) { if (ev.target === modal) closeModal(); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") closeModal(); });

  function openPoster(a, i) {
    openModal('<div class="sheet">' + posterHtml(a, i) + '</div><div class="cap" style="margin-top:12px;font-family:var(--mono);font-size:14px"><b>' + esc(a.baslik) + "</b> · " + nice(a.tarih) + " · " + esc(a.yer || "") + "</div>", "lightbox");
  }

  function openForm(e) {
    openModal(
      "<h3>" + esc(e.baslik) + '</h3><div class="meta">' + nice(e.tarih) + " · " + esc(e.saat || "") + " · " + esc(e.yer || "") + "</div>" +
      '<form class="form">' +
      '<input type="hidden" name="etkinlik" value="' + esc(e.baslik + " (" + e.tarih + ")") + '">' +
      '<input type="hidden" name="kulup" value="' + esc(S.ad) + '">' +
      '<label>ad soyad<input name="ad_soyad" required autocomplete="name"></label>' +
      '<label>e-posta<input name="email" type="email" required autocomplete="email"></label>' +
      '<label>telefon<input name="telefon" type="tel" autocomplete="tel"></label>' +
      '<label>okul / bölüm<input name="okul_bolum"></label>' +
      '<label>notun var mı?<textarea name="not" rows="2"></textarea></label>' +
      '<label class="check"><input type="checkbox" required> bilgilerimin yalnızca bu etkinlik için kulüple paylaşılmasını kabul ediyorum.</label>' +
      '<button class="btn btn-y" type="submit">kaydımı al</button>' +
      (window.FORM_ENDPOINT ? "" : '<p class="note">deneme modu: form henüz bir yere bağlı değil, bilgiler kaydedilmez.</p>') +
      "</form>"
    );
    var form = $(".form", modal);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var btn = $("button[type=submit]", form);
      btn.disabled = true;
      btn.textContent = "gönderiliyor…";
      var ok = function () {
        $(".modal-body", modal).innerHTML = '<div class="done"><div class="big">✱</div><h3>kaydın alındı.</h3><p>görüşmek üzere, <span class="hl">' + esc(S.ad) + "</span></p></div>";
      };
      if (!window.FORM_ENDPOINT) { setTimeout(ok, 600); return; }
      fetch(window.FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(); ok(); })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = "tekrar dene";
          alert("kayıt gönderilemedi. internet bağlantını kontrol edip tekrar dene.");
        });
    });
  }

  /* KAYDIRINCA BELİREN ÖĞELER */
  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (es) {
        es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
      }, { threshold: 0.15 })
    : null;
  function observe() {
    document.querySelectorAll(".reveal:not(.in), .wipe:not(.in)").forEach(function (n) {
      if (io) io.observe(n); else n.classList.add("in");
    });
  }
  observe();
})();
