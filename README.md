# Royal Indian Wedding Invitation Website

A responsive, mobile-first wedding invitation website made with plain HTML, CSS and JavaScript. No paid APIs, frameworks, build tools or subscriptions are required.

## Files
- `index.html` — page structure and editable event content
- `style.css` — colours, typography, layout and animations
- `script.js` — names, dates, countdown, map, WhatsApp RSVP and music controls
- `assets/` — add your own music and optional local photographs here

## Personalise it
Open `script.js` and edit the `WEDDING` object near the top:
- `bride`, `groom`
- `brideParents`, `groomParents`, `family`
- `date` (local time, format `YYYY-MM-DDTHH:MM:SS`)
- `dateLabel` (the displayed date)
- `venue`, `address`, `mapQuery`
- `whatsappNumber` (country code + mobile number, digits only)

The four sample function cards are in `index.html` inside `#event-list`. Edit their names, descriptions, dates, timings and locations.

Replace the sample gallery image URLs in `index.html` with your own image URLs, or place image files in `assets/` and use paths such as `assets/couple-1.jpg`. Replace the portrait background image URLs in `style.css` too.

### Music
Create an `assets` folder (already included) and add a music file named `wedding-music.mp3`. Use music you own or have permission to use. Browsers block autoplay, so visitors must tap the music button.

### Photos and external resources
The demo uses Google Fonts and sample Unsplash photographs, which need an internet connection. For fully self-hosted/offline assets, download properly licensed images/fonts and update their paths. Do not upload private family photos to a public repository unless you are comfortable with them being public.

## Preview locally
Double-click `index.html` or open it in a browser. For a local server, run:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Free publishing with GitHub Pages
1. Sign in or create a free account at https://github.com/.
2. Create a new **public** repository, for example `our-wedding-invite`.
3. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for deployment. GitHub will show a website address similar to `https://YOUR-USERNAME.github.io/our-wedding-invite/`.

Every update pushed to the selected branch will be published. GitHub Pages sites are public: do not put private phone numbers, home addresses or sensitive guest information in the repository. A custom domain is optional and usually costs money.

## Before sharing
- Replace every sample name, date, venue, family name and function.
- Verify the wedding date/time and Google Maps destination.
- Test WhatsApp RSVP on a phone.
- Add a licensed MP3 if you want music.
- Test on a small phone screen.
