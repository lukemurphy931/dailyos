# Daily OS — Deploy Guide

## What you have
- `index.html` — the full app
- `manifest.json` — makes it installable to home screen
- `sw.js` — service worker (push notifications + offline)

You need two small icon files. Generate them free at https://favicon.io or just use any square image:
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

---

## Step 1 — Push to GitHub

1. Go to https://github.com and create a **New repository** called `dailyos`
2. Make it **Public** (required for free Vercel)
3. On your machine, open Terminal in the `dailyos` folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dailyos.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New → Project**
3. Select your `dailyos` repo
4. Leave all settings as default — Vercel will detect it's a static site
5. Click **Deploy**

Your app will be live at `https://dailyos.vercel.app` (or similar) in ~30 seconds.

---

## Step 3 — Install to iPhone home screen

1. Open your Vercel URL in **Safari** on your iPhone
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Name it `Daily OS` → tap **Add**

It will appear as an app icon. When you open it from the home screen it runs full-screen with no browser chrome.

---

## Step 4 — Enable push notifications

1. Open the app from your home screen
2. You'll see a purple banner: **Enable evening check-in reminders**
3. Tap **Enable** and allow notifications
4. Go to **Routines** tab to set your preferred reminder time (default 8pm)

> **Note:** iOS requires the app to be opened from the home screen (not Safari) for push notifications to work. This is an Apple restriction, not a bug.

---

## Step 5 — Connect your calendar (optional)

### Option A — iCloud Calendar URL
1. On Mac: Open Calendar → right-click a calendar → **Get Info** → copy the URL
2. In the app: Go to **Routines** → paste the URL → tap **Fetch calendar**

### Option B — Manual events
In **Routines → Calendar settings**, type today's events one per line:
```
09:00 Standup
14:00 Anthropic prep
19:00 Gym
```
These show up in Today immediately.

---

## Updating the app

Any time you make changes, just push to GitHub:
```bash
git add .
git commit -m "Update"
git push
```
Vercel auto-deploys in seconds. The service worker caches the new version and your phone updates next time it connects.

---

## Your data

Everything is stored in your browser's `localStorage` on your device. It doesn't go to any server. If you clear your browser data or switch phones, you'll start fresh — so don't clear site data for your Vercel URL.
