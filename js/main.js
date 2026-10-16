/* ==========================================================================
   main.js – az oldal funkciói

   A tanár kódja a <head>-ben volt, sok ismétléssel. Itt rendezve, kommentekkel.
   Ahol a tanár pluginjei kellenek (tipsy tooltip, lightbox, scrollstart/stop),
   ott jQuery-t használunk; az új részek sima JavaScriptben vannak.

   Tartalom:
     1. Progress bar-ok: animáció, amikor görgetéskor a képernyőre érnek
     2. Tooltip a sávokon (a tanár tipsy pluginje)
     3. Galéria: albumszűrő + nagy kép nézegető (lightbox)
     4. Megjelenési animáció görgetéskor
     5. Fel / le gombok (a tanár kódja, rendbe téve)
     6. Világos / sötét téma
     7. CV mentése PDF-be (nyomtatás)
     8. Lábléc évszáma
   ========================================================================== */

// Analytics esemény küldése (ha nincs beállítva az Analytics, nem csinál semmit)
function track(name, params) {
  if (typeof gtag === 'function') gtag('event', name, params || {});
}

$(function () {   // = $(document).ready(...): akkor fut, amikor a HTML betöltődött


  /* ---------- 1. PROGRESS BAR-ok ----------
     A tanárnál minden sávhoz 2 külön sor kellett (.html, .php, .css, .java ...).
     Itt egyetlen ciklus megoldja mindet, bármennyi sáv van. */
  const $bars = $('#skill_set .tip');

  // a százalékot elmentjük, mert a tipsy plugin a title-t "elveszi" (original-title lesz belőle)
  $bars.each(function () {
    $(this).data('percent', $(this).attr('title'));
  });

  function animateBars() {
    $bars.each(function () {
      $(this).animate({ width: $(this).data('percent') }, 1200);
    });
  }

  // IntersectionObserver: szól, amikor a sávok a képernyőre kerülnek -> csak akkor animálunk
  const skills = document.getElementById('technical_skill');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateBars();
        observer.disconnect();          // csak egyszer
      }
    }, { threshold: 0.4 });
    observer.observe(skills);
  } else {
    animateBars();                      // nagyon régi böngésző: azonnal
  }


  /* ---------- 2. TOOLTIP ----------
     Ha a sáv fölé viszed az egeret, kiírja a százalékot (pl. 70%). */
  $bars.tipsy({ gravity: 's', fade: true });


  /* ---------- 3. GALÉRIA ----------
     a) Album gombok: csak a kiválasztott album képei látszanak.
     b) Lightbox: kattintásra nagyban mutatja a képet, lapozni is lehet.
        Mindig csak a LÁTHATÓ képek között lapoz, ezért szűrés után újra beállítjuk. */
  function setupLightbox() {
    $('#gallery a').unbind('click');                 // a régi beállítás törlése
    $('#gallery li:not(.hidden) a').lightBox({
      txtImage: '',                                   // "Image 1 of 4" helyett csak "1 / 4"
      txtOf: '/'
    });
  }
  setupLightbox();

  $('.album_tab').on('click', function () {
    const album = $(this).data('album');
    $('.album_tab').removeClass('active');
    $(this).addClass('active');

    $('#gallery li').each(function () {
      const show = album === 'all' || $(this).data('album') === album;
      $(this).toggleClass('hidden', !show);
    });

    setupLightbox();
    track('gallery_album', { album: album });
  });

  // Analytics: melyik képet nyitották meg
  $('#gallery').on('click', 'a', function () {
    track('gallery_open', { image: $(this).attr('title') });
  });


  /* ---------- 4. MEGJELENÉSI ANIMÁCIÓ ----------
     A címek és blokkok finoman "beúsznak", amikor görgetéskor a képernyőre érnek.
     A "reveal" osztályt a JS teszi rájuk: ha a JS nem fut, minden azonnal látszik. */
  if ('IntersectionObserver' in window) {
    const items = document.querySelectorAll('.ribbon2, .ribbon_portfolio, .item_tittle, .why_me, #gallery li, #contact-form');
    const revealer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach((el) => {
      el.classList.add('reveal');
      revealer.observe(el);
    });
  }


  /* ---------- 5. FEL / LE GOMBOK (a tanár kódja) ----------
     Görgetés közben halványak, megálláskor újra láthatók
     (a scrollstart / scrollstop események a scroll-startstop pluginből jönnek). */
  const $nav = $('#nav_up, #nav_down');
  $nav.fadeIn('slow');

  $(window).bind('scrollstart', function () { $nav.stop().animate({ opacity: 0.2 }); });
  $(window).bind('scrollstop',  function () { $nav.stop().animate({ opacity: 1 }); });

  $('#nav_down').click(function () {
    $('html, body').animate({ scrollTop: $(document).height() }, 800);
  });
  $('#nav_up').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });


  /* ---------- 6. VILÁGOS / SÖTÉT TÉMA ----------
     A színek a styles.css elején CSS változókban vannak.
     A [data-theme="light"] rész más értéket ad nekik -> az egész oldal átszíneződik. */
  $('#theme_toggle').on('click', function () {
    const root = document.documentElement;          // a <html> elem
    const light = root.getAttribute('data-theme') !== 'light';
    if (light) root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
    track('theme_change', { theme: light ? 'light' : 'dark' });
  });


  /* ---------- 7. CV MENTÉSE PDF-BE ----------
     A böngésző nyomtatás ablakát nyitja meg, ott "Mentés PDF-ként" választható.
     A styles.css végén lévő @media print rész miatt nyomtatáskor fehér háttér lesz,
     és eltűnnek a gombok, a galéria és az űrlap. A PDF azon a nyelven készül, ami ki van választva. */
  $('#print_cv').on('click', function (event) {
    event.preventDefault();                          // a link ne ugorjon az oldal tetejére (#)
    track('cv_download', { language: document.documentElement.lang });
    window.print();
  });


  /* ---------- 8. LÁBLÉC ÉVSZÁMA ----------
     Így jövőre sem kell átírni. */
  $('#year').text(new Date().getFullYear());
});
