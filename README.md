# CBR Consulting

**AI Consulting Services | Dallas, TX**

A professional website for CBR Consulting — a boutique AI consultancy helping businesses harness the power of artificial intelligence, from strategy to deployment.

## Project Structure

```
.
├── index.html    # Main website page
├── styles.css    # Stylesheet
├── script.js     # Interactive behavior (nav, form, etc.)
└── README.md     # This file
```

## Getting Started

No build step required. Open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080` in your browser.

## Sections

- **Hero** — headline and call-to-action
- **Services** — six core AI consulting offerings
- **About** — company overview and key stats
- **Process** — five-step engagement model
- **Contact** — contact details and inquiry form

## Customization

Update the placeholder contact details in `index.html` (phone number, email address) with real information before going live. The contact form currently simulates a submission; wire the `submit` handler in `script.js` to your preferred backend or email service (e.g. Formspree, SendGrid) when ready.
