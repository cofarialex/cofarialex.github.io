/* ==========================================================================
   contact.js – kapcsolat űrlap: ellenőrzés + láthatatlan reCAPTCHA + EmailJS

   A küldés menete:
     1. "Send" gomb -> ellenőrizzük a mezőket (ki vannak-e töltve, jó-e az e-mail)
     2. grecaptcha.execute() -> a Google a háttérben eldönti, hogy ember-e a küldő.
        Általában semmit nem kell csinálni, csak gyanús esetben kér képes feladatot.
     3. Ha rendben, a Google ad egy "tokent" -> sendEmail(token)
     4. Az EmailJS elküldi a levelet NEKED, és (az Auto-Reply beállítással)
        egy visszaigazolást a KÜLDŐNEK is.

   BEÁLLÍTÁS: az alábbi CONFIG részt kell kitöltened (a README / a chat lépései szerint).
   ========================================================================== */

const CONFIG = {
  emailjsPublicKey:  'i1sXVf2B4F6G-ITKQ',  // EmailJS -> Account -> Public Key
  emailjsServiceId:  'service_ub1ziw4',          // EmailJS -> Email Services
  emailjsTemplateId: 'template_mwob00m',         // EmailJS -> Email Templates (a NEKED szóló sablon)
  recaptchaSiteKey:  '6LdxKvItAAAAAH4ldaqV4sClKjpN7EONlJjnN7xl'   // Google reCAPTCHA v2 "Invisible" -> Site key
};

// igaz, ha az érték még a minta (vagyis nincs kitöltve)
const notSet = (value) => !value || value.startsWith('YOUR_');

const form = document.getElementById('contact-form');
let recaptchaWidgetId = null;   // a reCAPTCHA "doboz" azonosítója, ha már betöltődött


/* ---------- 1. Indításkor: EmailJS + reCAPTCHA betöltése ---------- */
if (notSet(CONFIG.emailjsPublicKey) || notSet(CONFIG.recaptchaSiteKey)) {
  console.info('Contact form: töltsd ki a CONFIG részt a js/contact.js elején.');
} else {
  emailjs.init({ publicKey: CONFIG.emailjsPublicKey });

  // A reCAPTCHA szkriptet mi töltjük be, a kiválasztott nyelven (hl=hu / ro / en).
  // Amikor betöltődött, a Google meghívja az onRecaptchaLoad függvényt.
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=' + currentLang;
  script.async = true;
  document.head.appendChild(script);
}

// A Google hívja meg -> ezért kell "globálisnak" lennie (window.)
window.onRecaptchaLoad = function () {
  recaptchaWidgetId = grecaptcha.render('recaptcha', {
    sitekey: CONFIG.recaptchaSiteKey,
    size: 'invisible',            // EZ teszi láthatatlanná (nincs "Nem vagyok robot" pipa)
    badge: 'bottomright',
    callback: sendEmail,          // sikeres ellenőrzés után ez fut le, és megkapja a tokent
    'expired-callback': () => setBusy(false),
    'error-callback': () => { setBusy(false); setStatus(t('form_captcha'), 'error'); }
  });
};


/* ---------- 2. Küldés gomb ---------- */
form.addEventListener('submit', (event) => {
  event.preventDefault();               // ne töltse újra az oldalt (ez lenne az alap viselkedés)

  if (!validateForm()) return;

  // Robotcsapda: ha a rejtett mező ki van töltve, robot volt -> úgy teszünk, mintha elküldtük volna
  if (form.website.value) {
    setStatus(t('form_ok'), 'ok');
    form.reset();
    return;
  }

  if (recaptchaWidgetId === null) {      // még nincs beállítva / nem töltődött be
    setStatus(t('form_not_ready'), 'error');
    return;
  }

  setBusy(true);
  setStatus(t('form_sending'));
  grecaptcha.execute(recaptchaWidgetId); // -> ha rendben, a Google meghívja a sendEmail(token)-t
});


/* ---------- 3. A levél elküldése EmailJS-sel ---------- */
function sendEmail(token) {
  const params = {
    from_name:  form.from_name.value.trim(),
    from_email: form.from_email.value.trim(),
    message:    form.message.value.trim(),
    language:   currentLang,                 // a sablonban {{language}}: milyen nyelven írtak
    'g-recaptcha-response': token            // az EmailJS ezzel ellenőrzi a Google-nél, hogy nem robot
  };

  emailjs.send(CONFIG.emailjsServiceId, CONFIG.emailjsTemplateId, params)
    .then(() => {
      setStatus(t('form_ok'), 'ok');
      form.reset();
      if (typeof gtag === 'function') gtag('event', 'contact_form_sent');   // Analytics esemény
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setStatus(t('form_error'), 'error');
    })
    .finally(() => {
      setBusy(false);
      grecaptcha.reset(recaptchaWidgetId);   // a token csak egyszer használható, kell egy új
    });
}


/* ---------- 4. Segédfüggvények ---------- */

// Ellenőrzi a mezőket; a hibásakat pirossal jelöli (invalid osztály)
function validateForm() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // "valami@valami.valami"
  let ok = true;

  [form.from_name, form.from_email, form.message].forEach((field) => {
    const value = field.value.trim();
    const valid = field.type === 'email' ? emailPattern.test(value) : value !== '';
    field.classList.toggle('invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    if (!valid) ok = false;
  });

  if (!ok) setStatus(t('form_invalid'), 'error');
  return ok;
}

// Kiírja az üzenetet az űrlap alá (type: 'ok' = zöld, 'error' = piros)
function setStatus(text, type = '') {
  const status = document.getElementById('form-status');
  status.textContent = text;
  status.className = type;
}

// Küldés közben a gomb ne legyen kattintható (dupla küldés ellen)
function setBusy(busy) {
  form.querySelector('.submit-button').disabled = busy;
}

// Ha gépelni kezd a hibás mezőbe, eltűnik a piros keret
form.addEventListener('input', (event) => {
  event.target.classList.remove('invalid');
});
