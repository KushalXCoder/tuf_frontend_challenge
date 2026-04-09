# Interactive Calendar Component

Frontend engineering challenge submission for a wall-calendar-inspired interactive calendar built with Next.js.

## Project Highlights

- Wall calendar visual layout with hero image and monthly grid
- Month/year navigation controls
- Date range selection (start, end, in-range highlight)
- Notes support for:
	- single selected date
	- selected date range
- Marker support with marker type + title shown on calendar dates
- Responsive layout for mobile and desktop

## Implementation Choices

- Frontend-only approach (no backend/API), as required by challenge scope
- Zustand used as central client-side state for selected date/month/year, notes, ranges, and markers
- localStorage persistence via Zustand `persist` middleware for notes/markers
- Tailwind CSS used for fast UI iteration and consistent spacing/typography
- Date grid uses Monday-first alignment with controlled rendering of current-month + leading filler days

## How To Run Locally

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open in browser

```text
http://localhost:3000
```

## Build For Production

```bash
npm run build
npm run start
```