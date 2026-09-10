# Dhrmik — Coming Soon

Static coming-soon page with a waitlist form (name, email, phone). No build step, no dependencies.

## Files

```
index.html          markup
styles.css          all styling (CSS variables at the top for the palette)
script.js           cursor glow + form validation
assets/logo.png     DHRMIK wordmark, saffron/gold, transparent
assets/background.png  recolored cosmic background
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy (GitHub Pages)

1. Push this folder's contents to the repo root on `main`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

Also works as-is on Netlify, Vercel, or Cloudflare Pages — no build command, publish directory is the repo root.

## Connect the waitlist

`script.js` is already wired to POST `{ name, email, phone }` to a `WAITLIST_ENDPOINT` you set at the top of the submit handler. Use `waitlist-apps-script.gs` (included in this folder) as a free Google Sheets backend — full setup steps are in the comment at the top of that file. Once deployed, paste the Web App URL into `WAITLIST_ENDPOINT` in `script.js` and redeploy the site.

Formspree, Mailchimp, or Airtable also work if you'd rather use one of those — just point `WAITLIST_ENDPOINT` at their endpoint instead (check whether they expect `application/json` or `text/plain`).

## Palette

| Token | Value |
| --- | --- |
| Saffron | `#E8721A` |
| Saffron light | `#F5B33C` |
| Gold pale | `#FFE7B8` |
| Ivory | `#FFF6E8` |
| Ink | `#0B0503` |

Edit the `:root` block in `styles.css` to retheme the whole page.

## Fonts

Cormorant Garamond + Lora, loaded from Google Fonts.
