# boreasic

Static marketing site for GitHub Pages.

## Publish

In the GitHub repository, enable **Settings → Pages → Deploy from a branch**, selecting `main` and `/ (root)`.

## Google Apps Script events

Paste [`gas/Code.gs`](gas/Code.gs) into a new Apps Script project, then deploy it as a **Web app** that executes as you and has access for **Anyone**. Set `GAS_ENDPOINT` in [`script.js`](script.js) to the deployment URL.

Every button with `data-gas-event` sends a `POST` payload like:

```json
{
  "event": "start_project",
  "source": "boreasic.com",
  "timestamp": "2026-08-21T09:23:56.712Z"
}
```

Apps Script web apps require `mode: "no-cors"` when cross-origin requests do not return CORS headers. The request is delivered, but the browser cannot inspect its response.

The contact form sends `event: "contact_email"` and an `email` property. The script validates the email, allows one confirmation per email address per hour, and sends the user a confirmation email.
