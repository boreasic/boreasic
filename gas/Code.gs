const BRAND_NAME = "boreasic";
const CONTACT_EVENT = "contact_email";
const RATE_LIMIT_SECONDS = 60 * 60;

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);

    if (payload.event === CONTACT_EVENT) {
      sendConfirmationEmail_(payload.email);
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
    return jsonResponse_({ ok: false, error: "Invalid request" });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: `${BRAND_NAME} contact endpoint` });
}

function sendConfirmationEmail_(email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!isValidEmail_(normalizedEmail)) {
    throw new Error("A valid email address is required.");
  }

  const cache = CacheService.getScriptCache();
  const key = `confirmation:${hash_(normalizedEmail)}`;
  if (cache.get(key)) {
    throw new Error("A confirmation was recently sent to this address.");
  }

  MailApp.sendEmail({
    to: normalizedEmail,
    subject: `We received your email — ${BRAND_NAME}`,
    body: `Hello,\n\nWe received your email and will be in touch soon.\n\n— ${BRAND_NAME}`,
    htmlBody: `<p>Hello,</p><p>We received your email and will be in touch soon.</p><p>— ${BRAND_NAME}</p>`,
    name: BRAND_NAME,
  });

  cache.put(key, "sent", RATE_LIMIT_SECONDS);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function hash_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value);
  return bytes.map((byte) => (`0${(byte & 0xff).toString(16)}`).slice(-2)).join("");
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
