# Student Impact Awards 2026 (SIA)

Uganda's national student innovation awards — organised by the **Malaika Children Initiative**.

**Event:** 8 September 2026
**Venue:** Makerere Innovation & Incubation Centre, Kampala

## Tech stack

- React 19 + TanStack Start (Vite)
- Tailwind CSS v4 (CSS-first theme in `src/styles.css`)
- shadcn/ui (Accordion, Card, Button, Input, Textarea, Select, Progress, Sonner)
- react-hook-form + zod for validation
- Cormorant Garamond + Outfit fonts (loaded via Google Fonts in the root layout)

## Local development

```bash
bun install
bun run dev
```

## Production build

```bash
bun run build
```

The build outputs a static-friendly bundle. Upload the `dist/` folder
contents to your Hostinger hosting.

## Hostinger deployment (File Manager)

1. Sign in to **hPanel** → open the website → **File Manager**.
2. Open `public_html/` and delete any existing `default.php` / placeholder files.
3. Locally, run `bun run build`.
4. Open the generated `dist/` folder and select **all** files (including
   `index.html`, `assets/`, and the hidden `.htaccess`).
5. Drag the selection into Hostinger File Manager → `public_html/`.
6. Confirm `.htaccess` is present in `public_html/`. If hidden, enable
   "Show hidden files" in File Manager settings.
7. Visit your domain. Refresh on any deep link (e.g. `/categories`) — the
   `.htaccess` rewrite ensures SPA routing works on Apache.

## Routes

`/` `/about` `/categories` `/eligibility` `/apply` `/partners` `/timeline` `/contact`
