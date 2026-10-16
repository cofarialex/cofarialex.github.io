/* ==========================================================================
   lang.js – nyelvváltó (EN / HU / RO)

   Hogyan működik?
   1. Az index.html-ben minden lefordítandó elemnek van egy kulcsa:
        <li data-i18n="int2">Running</li>
   2. Az ANGOL szöveg maga a HTML (ez az alapnyelv, ezt látja a Google is).
      Betöltéskor a kód elmenti az angol szövegeket.
   3. A magyar és a román szöveget az alábbi TRANSLATIONS objektumból veszi,
      ugyanazzal a kulccsal (pl. int2 -> "Futás" / "Alergare").
   4. A választott nyelvet megjegyzi (localStorage), így a következő
      látogatáskor is azon a nyelven nyílik meg.

   Új szöveg fordítása: tegyél egy data-i18n="kulcs" attribútumot az elemre
   az index.html-ben, és írd be a kulcsot ide a hu és a ro részbe is.
   ========================================================================== */

const TRANSLATIONS = {
  hu: {
    _title: 'Cofari Alex Daniel | Informatika szakos hallgató | Önéletrajz',
    role: 'Informatika szakos hallgató',
    available: 'ELÉRHETŐ:',
    available_for: 'CSAPATPROJEKTEK, DIÁKMUNKA',
    download_cv: 'Önéletrajz letöltése',

    h_statement: 'Bemutatkozás',
    statement: 'Informatika szakos hallgató vagyok a marosvásárhelyi UMFST-n, és a design áll hozzám a legközelebb. Szeretek letisztult, felhasználóbarát felületeket tervezni, és az ötleteket jól kinéző, működő weboldalakká alakítani. A front-end mellett szívesen dolgozom adatbázisokkal és a mögöttük lévő logikával is (Laravel, SQL). Motivált, kíváncsi és megbízható csapattag vagyok. Olyan csapatprojekteket és diákmunkát keresek, ahol tanulhatok és fejlődhetek.',

    h_summary: 'Összefoglaló',
    summary_intro: 'Amivel eddig dolgoztam:',
    sum1: 'Felülettervezés és front-end fejlesztés (HTML, CSS)',
    sum2: 'Back-end webfejlesztés Laravellel (PHP)',
    sum3: 'Adatbázis-tervezés és SQL lekérdezések',
    sum4: 'Objektumorientált programozás Java és C# nyelven',
    sum5: 'Algoritmusok és adatszerkezetek C++-ban',
    sum6: 'Fotó- és videószerkesztés',
    it_interests: '<b>Érdeklődési területek az IT-ban</b>: UI design » Front-end » Adatbázisok » Laravel » Webalkalmazások » Videószerkesztés',

    h_education: 'Tanulmányok',
    edu1_sub: 'Informatika | Marosvásárhely, Románia',
    edu1_desc: '<b>Alapképzés (BSc)</b> | Informatika | Folyamatban',
    edu2_sub: 'Matematika–informatika | Szováta, Románia',
    edu2_desc: '<b>Érettségi</b> | Matematika–informatika profil',

    h_languages: 'Nyelvek',
    lang1: '<b>Román</b> (anyanyelv)',
    lang2: '<b>Magyar</b> (anyanyelv)',
    lang3: '<b>Angol</b> (haladó)',
    lang4: '<b>Német</b> (kezdő)',

    h_interests: 'Hobbik',
    int1: 'Mountain bike',
    int2: 'Futás',
    int3: 'Fotózás és videózás',
    int4: 'Videószerkesztés',

    h_skills: 'Készségek',
    h_experience: 'Tapasztalat és projektek',
    exp1_title: 'Nyári gyakorlat',
    exp1_sub: 'Gyakornok | Marosvásárhely, Románia',
    exp1_desc: 'Nyári szakmai gyakorlat az egyetemi tanulmányaim alatt, ahol valódi munkakörnyezetben szereztem gyakorlati tapasztalatot.',
    exp2_sub: 'Webalkalmazás | Egyetemi projekt',
    exp2_desc: 'Kvízjáték webalkalmazás a Webalkalmazások tantárgyhoz, letisztult, felhasználóbarát felülettel és a mögötte álló játéklogikával.',
    exp3_title: 'Személyes CV weboldal',
    exp3_sub: 'Webprojekt | GitHub Pages',
    exp3_desc: 'Ez a weboldal: HTML, CSS és JavaScript, kapcsolatfelvételi űrlappal, fotógalériával és Google Analyticsszel.',

    h_gallery: 'Galéria',
    h_why: 'Miért dolgozzunk együtt?',
    why1: 'Kreatív szem a designhoz, figyelem a részletekre',
    why2: 'Jó csapatjátékos, de önállóan is tudok dolgozni',
    why3: 'Gyorsan tanulok, érdekelnek az új technológiák',
    why4: 'Megbízható vagyok, tartom a határidőket',
    why5: 'Románul, magyarul és angolul is kommunikálok',

    h_contact: 'Kapcsolat',
    social: 'Közösségi profilok',

    print_cv: 'Mentés PDF-be',
    album_all: 'Összes',
    album_bike: 'Mountain bike',
    album_photo: 'Fotózás',
    form_intro: 'Van egy projekted vagy állásajánlatod? Írj nekem!',
    f_name: 'Név',
    f_email: 'E-mail',
    f_message: 'Üzenet',
    f_send: 'Küldés',
    f_recaptcha: 'Az oldalt a reCAPTCHA védi. A Google <a href="https://policies.google.com/privacy?hl=hu" target="_blank" rel="noopener">Adatvédelmi irányelvei</a> és <a href="https://policies.google.com/terms?hl=hu" target="_blank" rel="noopener">Általános Szerződési Feltételei</a> érvényesek.',
    footer: 'HTML, CSS és JavaScript · GitHub Pages'
  },

  ro: {
    _title: 'Cofari Alex Daniel | Student la Informatică | CV',
    role: 'Student la Informatică',
    available: 'DISPONIBIL PENTRU:',
    available_for: 'PROIECTE ÎN ECHIPĂ, JOBURI PENTRU STUDENȚI',
    download_cv: 'Descarcă CV-ul',

    h_statement: 'Despre mine',
    statement: 'Sunt student la Informatică la UMFST Târgu Mureș și sunt pasionat de design. Îmi place să creez interfețe curate și ușor de folosit și să transform ideile în pagini web arătoase și funcționale. Pe lângă partea de front-end, îmi place să lucrez cu baze de date și cu logica din spatele lor (Laravel, SQL). Sunt motivat, curios și un coleg de echipă de încredere. Caut proiecte în echipă și joburi pentru studenți unde să pot învăța și evolua.',

    h_summary: 'Rezumat',
    summary_intro: 'Cu ce am lucrat până acum:',
    sum1: 'Design de interfețe și dezvoltare front-end (HTML, CSS)',
    sum2: 'Dezvoltare web back-end cu Laravel (PHP)',
    sum3: 'Proiectarea bazelor de date și interogări SQL',
    sum4: 'Programare orientată pe obiecte în Java și C#',
    sum5: 'Algoritmi și structuri de date în C++',
    sum6: 'Editare foto și video',
    it_interests: '<b>Domenii de interes în IT</b>: UI Design » Front-end » Baze de date » Laravel » Aplicații web » Editare video',

    h_education: 'Educație',
    edu1_sub: 'Informatică | Târgu Mureș, România',
    edu1_desc: '<b>Licență (BSc)</b> | Informatică | În curs',
    edu2_sub: 'Matematică-Informatică | Sovata, România',
    edu2_desc: '<b>Bacalaureat</b> | Profil Matematică-Informatică',

    h_languages: 'Limbi vorbite',
    lang1: '<b>Română</b> (limbă maternă)',
    lang2: '<b>Maghiară</b> (limbă maternă)',
    lang3: '<b>Engleză</b> (avansat)',
    lang4: '<b>Germană</b> (începător)',

    h_interests: 'Hobby-uri',
    int1: 'Mountain biking',
    int2: 'Alergare',
    int3: 'Fotografie și videografie',
    int4: 'Editare video',

    h_skills: 'Competențe',
    h_experience: 'Experiență și proiecte',
    exp1_title: 'Practică de vară',
    exp1_sub: 'Practicant | Târgu Mureș, România',
    exp1_desc: 'Practică de vară în timpul studiilor universitare, unde am câștigat experiență practică într-un mediu profesional de lucru.',
    exp2_sub: 'Aplicație web | Proiect universitar',
    exp2_desc: 'Joc de tip quiz realizat ca aplicație web pentru cursul de Aplicații Web, cu accent pe o interfață curată, ușor de folosit, și pe logica jocului.',
    exp3_title: 'Site personal de CV',
    exp3_sub: 'Proiect web | GitHub Pages',
    exp3_desc: 'Acest site: HTML, CSS și JavaScript, cu formular de contact, galerie foto și Google Analytics.',

    h_gallery: 'Galerie',
    h_why: 'De ce să lucrăm împreună',
    why1: 'Simț creativ pentru design și atenție la detalii',
    why2: 'Bun coleg de echipă, dar pot lucra și independent',
    why3: 'Învăț repede și sunt curios de tehnologiile noi',
    why4: 'Sunt de încredere și respect termenele limită',
    why5: 'Comunic în română, maghiară și engleză',

    h_contact: 'Contact',
    social: 'Profiluri sociale',

    print_cv: 'Salvează ca PDF',
    album_all: 'Toate',
    album_bike: 'Mountain bike',
    album_photo: 'Fotografie',
    form_intro: 'Ai un proiect sau o ofertă de job? Scrie-mi un mesaj!',
    f_name: 'Nume',
    f_email: 'E-mail',
    f_message: 'Mesaj',
    f_send: 'Trimite',
    f_recaptcha: 'Acest site este protejat de reCAPTCHA. Se aplică <a href="https://policies.google.com/privacy?hl=ro" target="_blank" rel="noopener">Politica de confidențialitate</a> și <a href="https://policies.google.com/terms?hl=ro" target="_blank" rel="noopener">Termenii și condițiile</a> Google.',
    footer: 'HTML, CSS și JavaScript · GitHub Pages'
  }
};

/* ---------- Üzenetek, amik NEM a HTML-ben vannak (a JS írja ki őket, pl. az űrlap) ----------
   Ezeket a többi JS fájl a t('kulcs') függvénnyel kéri le, mindig a kiválasztott nyelven. */
const MESSAGES = {
  en: {
    form_invalid: 'Please fill in every field with a valid e-mail address.',
    form_sending: 'Sending…',
    form_ok: 'Thank you! Your message has been sent. You will also receive a confirmation e-mail.',
    form_error: 'Sorry, something went wrong. Please try again later.',
    form_captcha: 'The reCAPTCHA check failed. Please try again.',
    form_not_ready: 'The contact form is not configured yet.'
  },
  hu: {
    form_invalid: 'Kérlek, tölts ki minden mezőt, érvényes e-mail címmel.',
    form_sending: 'Küldés…',
    form_ok: 'Köszönöm! Az üzeneted elküldve. Egy visszaigazoló e-mailt is kapsz.',
    form_error: 'Hoppá, valami hiba történt. Kérlek, próbáld újra később.',
    form_captcha: 'A reCAPTCHA ellenőrzés nem sikerült. Kérlek, próbáld újra.',
    form_not_ready: 'A kapcsolati űrlap még nincs beállítva.'
  },
  ro: {
    form_invalid: 'Te rog completează toate câmpurile, cu o adresă de e-mail validă.',
    form_sending: 'Se trimite…',
    form_ok: 'Mulțumesc! Mesajul tău a fost trimis. Vei primi și un e-mail de confirmare.',
    form_error: 'Ne pare rău, ceva n-a mers bine. Te rog încearcă mai târziu.',
    form_captcha: 'Verificarea reCAPTCHA a eșuat. Te rog încearcă din nou.',
    form_not_ready: 'Formularul de contact nu este încă configurat.'
  }
};

let currentLang = 'en';

// t('kulcs') -> az üzenet a kiválasztott nyelven (ha nincs fordítás, angolul)
function t(key) {
  return (MESSAGES[currentLang] && MESSAGES[currentLang][key]) || MESSAGES.en[key] || key;
}

const SUPPORTED = ['en', 'hu', 'ro'];
const elements = document.querySelectorAll('[data-i18n]');

// 1. Az angol (eredeti) szövegek elmentése, hogy vissza lehessen váltani rájuk
const ENGLISH = { _title: document.title };
elements.forEach((el) => {
  ENGLISH[el.dataset.i18n] = el.innerHTML.trim();
});

// 2. Egy nyelv beállítása
function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'en';
  currentLang = lang;
  const texts = lang === 'en' ? ENGLISH : TRANSLATIONS[lang];

  elements.forEach((el) => {
    const key = el.dataset.i18n;
    // ha egy kulcsnak nincs fordítása, marad az angol szöveg (nem lesz üres hely)
    el.innerHTML = texts[key] !== undefined ? texts[key] : ENGLISH[key];
  });

  document.title = texts._title;          // a böngészőfül címe
  document.documentElement.lang = lang;   // <html lang="..."> (a képernyőolvasók és a fordítók miatt)

  // az aktív gomb kiemelése
  document.querySelectorAll('.lang_switch button').forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });

  // megjegyezzük a választást (privát módban ez hibát dobhat, ezért a try)
  try { localStorage.setItem('lang', lang); } catch (e) {}

  // szólunk a többi kódnak (pl. a contact.js-nek), hogy nyelvet váltottunk
  document.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
}

// 3. Kattintás a gombokra
document.querySelectorAll('.lang_switch button').forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
    if (typeof gtag === 'function') gtag('event', 'language_change', { language: btn.dataset.lang }); // Analytics
  });
});

// 4. Induló nyelv kiválasztása, ebben a sorrendben:
//    a) a címben megadott (pl. cofarialex.github.io/?lang=hu) -> így linkkel is megosztható egy nyelv
//    b) amit a látogató legutóbb választott
//    c) a böngésző nyelve (ha magyar vagy román, azzal indul)
//    d) különben angol
function startLanguage() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (SUPPORTED.includes(fromUrl)) return fromUrl;

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (SUPPORTED.includes(saved)) return saved;

  const browser = (navigator.language || 'en').slice(0, 2);
  return SUPPORTED.includes(browser) ? browser : 'en';
}

setLanguage(startLanguage());
