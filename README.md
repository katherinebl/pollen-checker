# 🌼 Pollen Checker

Check pollen levels in your city: quick, simple, and bilingual.

**[Live Demo](#)** · **[Report a Bug](https://github.com/katherinebl/pollen-checker/issues)**

## About

Pollen Checker is a lightweight web app that shows you real-time pollen levels (grass, tree, and weed) for any city in the world. Search by city name or use your current location, and get a clear breakdown of pollen risk along with a 7-day trend so you can plan ahead: whether that means grabbing an antihistamine or picking a better day for a hike.

## Features

- 🔍 **Search by city** — look up pollen levels anywhere
- 📍 **Use my location** — instant results based on your device's location
- 🌐 **Bilingual (EN/ES)** — automatic language detection based on browser settings
- 📈 **7-day trend charts** — sparkline visualizations to track pollen changes over time
- 🎨 **Clean, responsive UI** — built with a custom pollen-grain favicon and card-based layout
- ⚡ **No build step** — plain HTML, CSS, and JavaScript

## Tech Stack

- **HTML / CSS / JavaScript** — no frameworks, no dependencies to ship
- **[Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)** — converts city names into coordinates
- **[Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)** — provides pollen data
- **[live-server](https://www.npmjs.com/package/live-server)** — local dev server with hot reload
- **Netlify** — hosting, with security and cache headers configured in `netlify.toml`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (only needed for the local dev server)

### Installation

```bash
# Clone the repository
git clone https://github.com/katherinebl/pollen-checker.git
cd pollen-checker

# Install dependencies
npm install

# Start the local dev server
npm start
```

The app will open automatically in your browser. Since it's a static site with no build step, you can also just open `index.html` directly.

## Project Structure

```
pollen-checker/
├── index.html          # Main app markup
├── script.js           # App logic: geocoding, pollen data, language detection, charts
├── style.css            # Styling
├── favicon.svg          # Custom pollen grain favicon
├── netlify.toml         # Deployment config (headers, caching)
├── package.json
└── package-lock.json
```

## Author

**Katherine Briceño**
- GitHub: [@katherinebl](https://github.com/katherinebl)

## License

All rights reserved.
