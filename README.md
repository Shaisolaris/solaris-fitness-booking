# Solaris Fit — Class Booking

Modern fitness class booking for studios. Weekly schedule grid, instructor profiles, class details, and one-click book/cancel. Bookings persist in localStorage so refreshes don't wipe your week.

**Live demo:** https://shaisolaris.github.io/solaris-fitness-booking/

## What it shows

- **15 classes** across 7 days, 5 instructors, 6 class types (Yoga, HIIT, Spin, Strength, Barre, Pilates)
- **Day tabs** with per-day class count
- **Class cards** with gradient hero, time, intensity badge, instructor avatar, spots-left indicator, and live "Booked" state
- **Class detail modal** with description, duration, intensity, spot availability, instructor bio
- **Book / cancel flow** — toggles booking state, persists to localStorage
- **My week sidebar** showing current bookings
- **Instructor directory** sidebar
- **Dark mode** with localStorage persistence
- Fully responsive

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 3
- Deployed to GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

## License

MIT.
