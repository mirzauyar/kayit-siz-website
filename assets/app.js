(function () {
  "use strict";

  var K = window.KULUP, CATS = window.KATEGORILER;
  var AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.from((r || document).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function nice(d) { var x = parse(d); return x.getDate() + " " + AYLAR[x.getMonth()] + " " + x.getFullYear(); }
  function niceDay(d) { return nice(d) + " " + GUNLER[parse(d).getDay()]; }
  var today = new Date(); today.setHours(0, 0, 0, 0);

  /* ÜST BİLGİ ve ALT BİLGİ */
  $(".uni-1").textContent = K.universite;
  $(".uni-2").textContent = K.kulup;
  $(".btf").href = K.btf.link;
  $(".kampus").textContent = K.kampus;
  $(".ig").href = K.instagram; $(".ig").textContent = K.instagramAd;
  $(".ig-dm").href = K.instagram;

  /* VERİ: tarihi geçen etkinlik arşive düşer */
  var upcoming = window.ETKINLIKLER.filter(function (e) { return parse(e.tarih) >= today; })
    .sort(function (a, b) { return parse(a.tarih) - parse(b.tarih); });
  var archive = window.ARSIV.concat(window.ETKINLIKLER.filter(function (e) { return parse(e.tarih) < today && e.poster && !e.ornek; }))
    .sort(function (a, b) { return parse(b.tarih) - parse(a.tarih); });

  /* GİRİŞ: dönen sarı ışınlar (quiz night / megalopolis posterleri) */
  var rays = $(".a-rays");
  for (var i = 0; i < 14; i++) {
    var a1 = (i / 14) * Math.PI * 2, a2 = a1 + 0.13;
    var pts = "300,300 " + (300 + 330 * Math.cos(a1)).toFixed(1) + "," + (300 + 330 * Math.sin(a1)).toFixed(1) + " " +
      (300 + 330 * Math.cos(a2)).toFixed(1) + "," + (300 + 330 * Math.sin(a2)).toFixed(1);
    var p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    p.setAttribute("points", pts);
    p.style.animationDelay = (1 + i * 0.06) + "s";
    p.style.opacity = "";
    rays.appendChild(p);
  }

  /* GİRİŞ: kategori kelimesi değişiyor */
  var words = CATS.concat(["tasarım"]), wi = 0, swap = $(".swap");
  if (!reduce) setInterval(function () {
    swap.classList.add("out");
    setTimeout(function () { wi = (wi + 1) % words.length; swap.textContent = words[wi]; swap.classList.remove("out"); }, 450);
  }, 2600);

  /* sıradaki etkinlik */
  var nx = $(".next");
  if (upcoming.length) {
    var n = upcoming[0];
    nx.innerHTML = "<small>sıradaki etkinlik</small><a href=\"#kayit\">" + esc(n.baslik) + " →</a><div style=\"font-size:14px;font-style:italic\">" + niceDay(n.tarih) + (n.saat ? " · " + esc(n.saat) : "") + "</div>";
  } else {
    nx.innerHTML = "<small>sıradaki etkinlik</small><span>yakında. <a href=\"" + K.instagram + "\" target=\"_blank\" rel=\"noopener\">instagram</a>'dan takipte kal.</span>";
  }

  /* YAKLAŞAN ETKİNLİKLER */
  var ev = $(".events");
  if (!upcoming.length) ev.appendChild(el("p", "empty", "şu an kayıt alınan etkinlik yok."));
  upcoming.forEach(function (e) {
    var c = el("article", "event reveal");
    c.innerHTML =
      (e.ornek ? '<span class="stamp">ÖRNEK</span>' : "") +
      '<div class="event-top"><h3>' + esc(e.baslik) + '</h3><span class="tag">' + esc(e.kategori || "etkinlik") + "</span></div>" +
      (e.aciklama ? "<p>" + esc(e.aciklama) + "</p>" : "") +
      '<div class="info">' +
      "<div><b>YER</b><span>" + esc(e.yer || "") + "</span></div>" +
      "<div><b>TARİH/SAAT</b><span>" + niceDay(e.tarih) + (e.saat ? " · " + esc(e.saat) : "") + "</span></div>" +
      "<div><b>KONTENJAN</b><span>" + (e.kontenjan ? esc(e.kontenjan) + " kişi" : "sınırsız") + "</span></div>" +
      '<button class="btn" type="button">kayıt ol</button></div>';
    $(".btn", c).addEventListener("click", function () {
      if (e.kayitLinki) window.open(e.kayitLinki, "_blank", "noopener"); else openForm(e);
    });
    ev.appendChild(c);
  });

  /* AKAN SARI ÇİZGİLER */
  var wv = $(".waves"), paths = [];
  for (var j = 0; j < 6; j++) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wv.appendChild(path); paths.push(path);
  }
  function drawWaves(t) {
    paths.forEach(function (p, j) {
      var d = "", y0 = 22 + j * 22;
      for (var x = 0; x <= 1200; x += 40) {
        var y = y0 + Math.sin(x / 170 + t / 1400 + j * 0.55) * 14 + Math.sin(x / 63 + j) * 3;
        d += (x ? " L" : "M") + x + " " + y.toFixed(1);
      }
      p.setAttribute("d", d);
    });
  }
  drawWaves(0);
  var wavesOn = false;
  function loop(t) { if (wavesOn) drawWaves(t); requestAnimationFrame(loop); }
  if (!reduce) requestAnimationFrame(loop);

  /* ARŞİV FİLTRELERİ: kategori + yıl */
  var state = { cat: null, year: null };
  var years = Array.from(new Set(archive.map(function (a) { return a.tarih.slice(0, 4); })));
  var fWrap = $(".filters");
  function chip(label, kind, val) {
    var b = el("button"); b.type = "button"; b.textContent = label;
    b.dataset.kind = kind; b.dataset.val = val == null ? "" : val;
    b.addEventListener("click", function () { setFilter(kind, val); });
    fWrap.appendChild(b);
  }
  chip("hepsi", "cat", null);
  CATS.forEach(function (c) { chip(c, "cat", c); });
  fWrap.appendChild(el("span", "sep"));
  chip("tüm yıllar", "year", null);
  years.forEach(function (y) { chip(y, "year", y); });

  /* SAĞ SÜTUNDAKİ KATEGORİ LİSTESİ (posterlerdeki gibi) */
  var cats = $(".cats"), mark = $(".cats-mark");
  CATS.forEach(function (c) {
    var b = el("button"); b.type = "button"; b.textContent = c; b.dataset.val = c;
    b.addEventListener("click", function () {
      setFilter("cat", state.cat === c ? null : c);
      $("#arsiv").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
    b.addEventListener("mouseenter", function () { moveMark(b); });
    cats.appendChild(b);
  });
  cats.addEventListener("mouseleave", function () { syncMark(); });
  function moveMark(b) {
    if (!b) { mark.style.opacity = 0; return; }
    mark.style.opacity = 1;
    mark.style.transform = "translateY(" + b.offsetTop + "px)";
    mark.style.width = (b.offsetWidth + 14) + "px";
  }
  function syncMark() {
    var b = state.cat ? $('.cats button[data-val="' + state.cat + '"]') : null;
    $$(".cats button").forEach(function (x) { x.classList.toggle("on", x === b); });
    moveMark(b);
  }
  // açılışta işaret sırayla kategorilerin üzerinden geçer
  if (!reduce) {
    var bs = $$(".cats button"), k = 0;
    var tick = setInterval(function () {
      if (k < bs.length) moveMark(bs[k++]); else { clearInterval(tick); syncMark(); }
    }, 380);
  }

  function setFilter(kind, val) {
    state[kind] = val;
    $$(".filters button").forEach(function (b) {
      var v = b.dataset.val || null;
      if (b.dataset.kind === "cat") b.classList.toggle("on", v === state.cat);
      if (b.dataset.kind === "year") b.classList.toggle("on", v === state.year);
    });
    syncMark();
    renderArchive();
  }

  var shown = [];
  function renderArchive() {
    var w = $(".archive"); w.innerHTML = "";
    shown = archive.filter(function (a) {
      return (!state.cat || a.kategori === state.cat) && (!state.year || a.tarih.indexOf(state.year) === 0);
    });
    if (!shown.length) w.appendChild(el("p", "empty", "bu seçimde poster yok."));
    shown.forEach(function (a, i) {
      var b = el("button", "poster reveal"); b.type = "button";
      b.style.transitionDelay = (i % 4) * 0.07 + "s";
      b.innerHTML = '<div class="pic"><img loading="lazy" src="assets/posters/' + esc(a.poster) + '" alt="' + esc(a.baslik) + ' posteri"></div>' +
        '<div class="cap"><span>' + nice(a.tarih) + "<b>" + esc(a.baslik) + "</b></span><i>" + esc(a.kategori) + "</i></div>";
      b.addEventListener("click", function () { openPoster(i); });
      w.appendChild(b);
    });
    observe();
  }
  setFilter("cat", null);

  /* İŞLETMELER */
  var pw = $(".partners");
  window.ISLETMELER.forEach(function (x) {
    var c = el("div", "partner reveal");
    c.innerHTML = "<span>" + esc(x[0]) + (x[2] ? "<small>" + esc(x[2]) + "</small>" : "") + '</span><span class="p">' + esc(x[1]) + "</span>";
    pw.appendChild(c);
  });

  /* MODAL */
  var modal = el("div", "modal");
  modal.innerHTML = '<div class="modal-box" role="dialog" aria-modal="true"><button class="close" type="button" aria-label="kapat">×</button><div class="modal-body"></div></div>';
  document.body.appendChild(modal);
  var cur = -1;
  function openModal(html, cls) {
    modal.className = "modal open " + (cls || "");
    $(".modal-body", modal).innerHTML = html;
    document.body.style.overflow = "hidden";
  }
  function closeModal() { modal.className = "modal"; document.body.style.overflow = ""; cur = -1; }
  $(".close", modal).addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if (cur > -1 && e.key === "ArrowRight") openPoster((cur + 1) % shown.length);
    if (cur > -1 && e.key === "ArrowLeft") openPoster((cur - 1 + shown.length) % shown.length);
  });

  function openPoster(i) {
    var a = shown[i]; cur = i;
    openModal('<img src="assets/posters/' + esc(a.poster) + '" alt="' + esc(a.baslik) + ' posteri">' +
      '<div class="cap"><b>' + esc(a.baslik) + "</b><br>" + niceDay(a.tarih) + (a.saat ? " · " + esc(a.saat) : "") + (a.yer ? " · " + esc(a.yer) : "") +
      (a.kisi ? "<br><i>" + esc(a.kisi) + "</i>" : "") + "</div>" +
      '<button class="nav-btn prev" type="button" aria-label="önceki">‹</button><button class="nav-btn next-b" type="button" aria-label="sonraki">›</button>', "lightbox");
    cur = i;
    $(".prev", modal).addEventListener("click", function () { openPoster((cur - 1 + shown.length) % shown.length); });
    $(".next-b", modal).addEventListener("click", function () { openPoster((cur + 1) % shown.length); });
  }

  function openForm(e) {
    openModal(
      "<h3>" + esc(e.baslik) + '</h3><div class="meta">' + niceDay(e.tarih) + (e.saat ? " · " + esc(e.saat) : "") + " · " + esc(e.yer || "") + "</div>" +
      '<form class="form">' +
      '<input type="hidden" name="etkinlik" value="' + esc(e.baslik + " (" + e.tarih + ")") + '">' +
      '<label>ad soyad<input name="ad_soyad" required autocomplete="name"></label>' +
      '<label>e-posta<input name="email" type="email" required autocomplete="email"></label>' +
      '<label>telefon<input name="telefon" type="tel" autocomplete="tel"></label>' +
      '<label>bölüm / sınıf<input name="bolum"></label>' +
      '<label class="check"><input type="checkbox" required> bilgilerimin yalnızca bu etkinlik için kulüple paylaşılmasını kabul ediyorum.</label>' +
      '<button class="btn" type="submit">kaydımı al</button>' +
      (window.FORM_ENDPOINT ? "" : '<p class="note">deneme modu: form henüz bir yere bağlı değil, bilgiler kaydedilmez.</p>') +
      "</form>"
    );
    var form = $(".form", modal);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var btn = $("button[type=submit]", form);
      btn.disabled = true; btn.textContent = "gönderiliyor…";
      var ok = function () {
        $(".modal-body", modal).innerHTML = '<div class="done"><h3>kaydın alındı.</h3><p>' + niceDay(e.tarih) + (e.saat ? " · " + esc(e.saat) : "") + "<br>görüşmek üzere.</p></div>";
      };
      if (!window.FORM_ENDPOINT) { setTimeout(ok, 500); return; }
      fetch(window.FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(); ok(); })
        .catch(function () {
          btn.disabled = false; btn.textContent = "tekrar dene";
          alert("kayıt gönderilemedi. internet bağlantını kontrol edip tekrar dene.");
        });
    });
  }

  /* KAYDIRINCA BELİRENLER */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 }) : null;
  function observe() {
    $$(".reveal:not(.in), .h:not(.in)").forEach(function (n) { if (io) io.observe(n); else n.classList.add("in"); });
  }
  observe();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { wavesOn = es[0].isIntersecting; }).observe(wv);
  }

  /* sağ sütunda hangi bölümdeysek altı çizili */
  var links = $$(".pages a");
  window.addEventListener("scroll", function () {
    var y = window.scrollY + 200, on = null;
    links.forEach(function (l) { var s = $(l.getAttribute("href")); if (s && s.offsetTop <= y) on = l; });
    links.forEach(function (l) { l.classList.toggle("on", l === on); });
  }, { passive: true });
})();
