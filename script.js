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
