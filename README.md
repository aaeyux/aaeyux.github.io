# Saksham — Photography & Cinematography Portfolio

> A fully static, GitHub Pages–ready portfolio website for a photographer, videographer, and cinematographer.

## 🚀 Live Demo

Host this on GitHub Pages at: `https://yourusername.github.io/Saksham/`

## 📁 Structure

```
Saksham/
├── index.html              # Main single-page site
├── css/
│   └── style.css           # Design system + all styles
├── js/
│   └── main.js             # Scroll animations, YouTube API, lightbox
└── assets/
    └── images/             # Portfolio photographs
```

## ✨ Features

- **YouTube Video Background** — Hero section with muted auto-playing video starting at 15s
- **Scroll Animations** — Staggered reveal animations using Intersection Observer
- **Video Portfolio** — Filterable YouTube video grid with modal player
- **Photo Gallery** — Filterable masonry grid with full lightbox (keyboard navigation)
- **Services Section** — 6 service cards with hover animations
- **Creative Process** — 4-step animated process flow
- **Testimonials** — Client review cards
- **Contact Form** — mailto-based form (no server required)
- **Dark Theme** — Cinematic gold + deep black palette
- **Fully Responsive** — Mobile hamburger menu, adaptive layouts
- **Page Loader** — Animated loading screen
- **Custom Cursor Glow** — Ambient light following mouse
- **Animated Counters** — Stats that count up on scroll
- **Marquee Strip** — Scrolling services ticker

## 🌐 Hosting on GitHub Pages

1. Create a new GitHub repository named `Saksham` (or your preferred name)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch → main → / (root)**
5. Your site will be live at `https://yourusername.github.io/Saksham/`

## 🎨 Customization

### Change the YouTube background video
In `js/main.js`, change the `videoId`:
```js
bgPlayer = new YT.Player('yt-bg', {
  videoId: 'YOUR_VIDEO_ID',  // ← change this
  ...
  start: 15,                  // ← change start time (seconds)
```

### Add more videos to the portfolio
In `index.html`, duplicate a `.video-card` article block and update:
- `data-videoid="YOUR_YOUTUBE_ID"` — YouTube video ID
- `data-category` — `cinematic`, `commercial`, `wedding`, or `documentary`
- The `<img src>` — use `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`

### Add more photos
Place `.jpg` files in `assets/images/` and add a `.photo-item` div in the masonry grid.

### Update contact info
Search `index.html` for `hello@saksham.com` and replace with your email.

## 🛠 No Build Step Required

Open `index.html` directly in any browser. No Node.js, no bundler, no dependencies.
