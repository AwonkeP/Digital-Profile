# Awonke Philibane | Digital Profile & IT Portfolio

An enterprise-grade IT Technical Support and Systems Workflow Optimization digital profile and interactive portfolio.

---

## 🚀 Deploying to Netlify

This project is pre-configured for one-click deployment on [Netlify](https://www.netlify.com/).

### Option 1: Git-Connected Deployment (Recommended)

1. Push or export this project repository to **GitHub** (via AI Studio Settings > Export to GitHub, or standard git push).
2. Go to [app.netlify.com](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
5. *(Optional for live Gemini AI chat)*: Under **Site configuration** > **Environment variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   *(Note: If omitted, the chatbot automatically uses the built-in grounded profile fallback engine).*
6. Click **Deploy Site**.

---

### Option 2: Netlify Drop (Instant Drag & Drop)

1. Run `npm run build` to generate the production `/dist` folder.
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder directly into the browser.
4. Your site will be live instantly with complete SPA routing.

---

## 📁 Key Files for Netlify

- `index.html`: The HTML5 entry point with complete metadata, favicon, and SEO tags.
- `dist/index.html`: The compiled, bundled, production-ready static entry point.
- `public/_redirects`: Guarantees single-page application (SPA) routing on Netlify (`/* /index.html 200`).
- `netlify.toml`: Netlify build specification, caching headers, and function redirects.
- `netlify/functions/chat.ts`: Serverless function proxying the Gemini AI assistant on Netlify.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server on port 3000
npm run dev

# Build for production
npm run build
```
