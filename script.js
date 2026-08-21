const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbw0BHPiIGXn_k-TPh59_eiC77uIOb0X51103Mg7Whq3YXxkQ0kEvpZ1TrUQ5nBaAEWB/exec";

const toast = document.querySelector(".toast");
let toastTimer;

const intro = document.querySelector(".intro");
if (intro) {
  const finishIntro = () => {
    document.body.classList.remove("intro-active");
    document.body.classList.add("intro-complete");
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
  } else {
    window.setTimeout(finishIntro, 1400);
  }
}

const header = document.querySelector(".site-header");
if (header) {
  const updateHeader = () => header.classList.toggle("compact", window.scrollY > 60);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

const translations = {
  en: {
    "nav-services": "Services", "nav-clients": "Clients", "search-label": "Search the page", "contact-label": "Contact Boreasic",
    "hero-eyebrow": 'Software studio <span>●</span> Building for the web',
    "hero-title": "Software that<br />keeps business<br /><em>moving.</em>",
    "hero-intro": "boreasic designs and builds web apps, internal tools, and smart automations for teams ready to work better.",
    "hero-cta": "Build with us <span>↗</span>", "hero-link": "What we make <span>↓</span>",
    "statement-label": "01 / THE BOREASIC WAY", "statement-title": "From a good idea<br />to a <em>working</em> one.",
    "statement-copy": "Clear thinking, practical technology, and a partner who stays close from the first sketch to launch and beyond.",
    "services-label": "02 / WHAT WE DO", "services-copy": "Small, focused teams. Useful software. No unnecessary layers.",
    "service-web-title": "Web apps", "service-web-copy": "Reliable products and platforms that make complicated work feel simple.",
    "service-ios-title": "iOS apps", "service-ios-copy": "Native mobile experiences that feel at home on the devices people use every day.",
    "service-tools-title": "Internal tools", "service-tools-copy": "Purpose-built systems that replace manual work and give your team room to focus.",
    "service-auto-title": "Automation", "service-auto-copy": "Connected workflows that move data, decisions, and business forward automatically.",
    "featured-label": "03 / FEATURED BUILD", "featured-title": "Every journey,<br /><em>organized.</em>",
    "featured-copy": "OmniTrip is a companion for planning every stop, keeping expenses in view, and carrying an adventure across iPhone, iPad, and Mac.",
    "featured-cta": "Explore OmniTrip <span>↗</span>", "signal-caption": "Every journey,<br />beautifully organized.",
    "trusted-label": "04 / TRUSTED BY", "trusted-title": "Built alongside<br />ambitious teams.",
    "client-label": "Selected client / 01", "client-visit": "Visit site ↗",
    "contact-section-label": "05 / START A CONVERSATION", "contact-title": "What could work<br /><em>better?</em>",
    "email-label": "Your email address", "email-placeholder": "you@company.com", "contact-cta": "Let's talk <span>↗</span>",
    "footer-intro": "Software for teams moving forward.", "footer-explore": "Explore", "footer-product": "Featured product",
    "footer-contact": "Contact", "footer-start": "Start a conversation ↗",
    "search-title": "Find something", "search-placeholder": "Search this page", "search-submit": "Search",
  },
  es: {
    "nav-services": "Servicios", "nav-clients": "Clientes", "search-label": "Buscar en la página", "contact-label": "Contactar con Boreasic",
    "hero-eyebrow": 'Estudio de software <span>●</span> Construimos para la web',
    "hero-title": "Software que<br />mantiene tu negocio<br /><em>en movimiento.</em>",
    "hero-intro": "boreasic diseña y desarrolla aplicaciones web, herramientas internas y automatizaciones inteligentes para equipos que quieren trabajar mejor.",
    "hero-cta": "Crea con nosotros <span>↗</span>", "hero-link": "Lo que hacemos <span>↓</span>",
    "statement-label": "01 / EL MÉTODO BOREASIC", "statement-title": "De una buena idea<br />a una que <em>funciona.</em>",
    "statement-copy": "Pensamiento claro, tecnología práctica y un equipo que te acompaña desde el primer boceto hasta el lanzamiento y más allá.",
    "services-label": "02 / QUÉ HACEMOS", "services-copy": "Equipos pequeños y especializados. Software útil. Sin capas innecesarias.",
    "service-web-title": "Apps web", "service-web-copy": "Productos y plataformas fiables que hacen sencillo el trabajo complejo.",
    "service-ios-title": "Apps para iOS", "service-ios-copy": "Experiencias móviles nativas que se sienten propias en los dispositivos de cada día.",
    "service-tools-title": "Herramientas internas", "service-tools-copy": "Sistemas a medida que eliminan el trabajo manual y dejan espacio para lo importante.",
    "service-auto-title": "Automatización", "service-auto-copy": "Flujos conectados que mueven datos, decisiones y negocio de forma automática.",
    "featured-label": "03 / PROYECTO DESTACADO", "featured-title": "Cada viaje,<br /><em>organizado.</em>",
    "featured-copy": "OmniTrip ayuda a planificar cada parada, controlar gastos y llevar cualquier aventura en iPhone, iPad y Mac.",
    "featured-cta": "Explorar OmniTrip <span>↗</span>", "signal-caption": "Cada viaje,<br />bellamente organizado.",
    "trusted-label": "04 / CONFÍAN EN NOSOTROS", "trusted-title": "Junto a equipos<br />ambiciosos.",
    "client-label": "Cliente seleccionado / 01", "client-visit": "Visitar sitio ↗",
    "contact-section-label": "05 / HABLEMOS", "contact-title": "¿Qué podría<br /><em>funcionar mejor?</em>",
    "email-label": "Tu dirección de correo", "email-placeholder": "tu@empresa.com", "contact-cta": "Hablemos <span>↗</span>",
    "footer-intro": "Software para equipos que avanzan.", "footer-explore": "Explorar", "footer-product": "Producto destacado",
    "footer-contact": "Contacto", "footer-start": "Iniciar una conversación ↗",
    "search-title": "Encuentra algo", "search-placeholder": "Busca en esta página", "search-submit": "Buscar",
  },
};

function setLanguage(language) {
  const dictionary = translations[language];
  if (!dictionary) return;

  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = dictionary[element.dataset.i18nHtml];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = dictionary[element.dataset.i18nPlaceholder];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  localStorage.setItem("boreasic-language", language);
}

const preferredLanguage = localStorage.getItem("boreasic-language")
  || (navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
setLanguage(preferredLanguage);

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const searchDialog = document.getElementById("search-dialog");
const searchToggle = document.getElementById("search-toggle");
const siteSearch = document.getElementById("site-search");
if (searchDialog && searchToggle && siteSearch) {
  searchToggle.addEventListener("click", () => {
    searchDialog.showModal();
    siteSearch.focus();
  });
  searchDialog.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = siteSearch.value.trim();
    if (query) window.find(query, false, false, true);
    searchDialog.close();
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3500);
}

async function sendGasEvent(eventName, details = {}) {
  if (!GAS_ENDPOINT) {
    return false;
  }

  const response = await fetch(GAS_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ event: eventName, source: "boreasic.com", timestamp: new Date().toISOString(), ...details }),
  });

  if (!response.ok && response.type !== "opaque") {
    throw new Error(`Apps Script returned ${response.status}`);
  }

  return true;
}

document.querySelectorAll("[data-gas-event]").forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.innerHTML;
    button.disabled = true;
    try {
      const delivered = await sendGasEvent(button.dataset.gasEvent);
      showToast(delivered ? "Thanks — we'll be in touch." : "Event ready — add your Apps Script URL in script.js to activate it.");
    } catch (error) {
      console.error("Could not send Apps Script event:", error);
      showToast("Something went wrong. Please try again.");
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });
});

document.getElementById("contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = new FormData(form).get("email").trim();
  const submitButton = form.querySelector("button[type='submit']");

  submitButton.disabled = true;
  try {
    const delivered = await sendGasEvent("contact_email", { email });
    showToast(
      delivered
        ? "Received — check your inbox for a confirmation."
        : "Form ready — add your Apps Script URL in script.js to activate it.",
    );
    if (delivered) form.reset();
  } catch (error) {
    console.error("Could not send contact email:", error);
    showToast("Something went wrong. Please try again.");
  } finally {
    submitButton.disabled = false;
  }
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();
