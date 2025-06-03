# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev        # Start Vite dev server at http://localhost:5173

# Building
npm run build      # TypeScript check + Vite production build
npm run preview    # Preview production build locally

# Code Quality
npm run lint       # Run ESLint checks
```

## Architecture Overview

This F1 Data Visualization Dashboard is built using React 19 with TypeScript and follows a modern component-based architecture.

### Core Technologies
- **React 19** with function components and hooks
- **TypeScript** for type safety
- **TanStack Router** for type-safe routing
- **Tailwind CSS v4** for styling
- **Recharts** for data visualizations
- **Vite** as build tool

### Data Flow Architecture

1. **API Integration**: The app uses the Jolpica F1 API (`https://api.jolpi.ca/ergast/f1/`) as primary data source with automatic fallback to mock data when offline.

2. **Data Management**: The `useF1Data` hook (`src/hooks/useF1Data.ts`) manages all F1 data fetching, caching, and state. It:
   - Checks API health on mount
   - Fetches data in parallel for performance
   - Auto-refreshes every 5 minutes when online
   - Provides fallback to mock data when offline
   - Exposes methods for fetching race results and details

3. **Routing**: TanStack Router manages navigation with routes defined in `src/router.tsx`:
   - `/` - Dashboard
   - `/drivers` - Driver standings
   - `/constructors` - Constructor standings
   - `/races` - Race calendar and results
   - `/analytics` - Advanced analytics

### Key API Service Methods

The `jolpicaApi.ts` service provides typed methods for all F1 data:
- `getCurrentDriverStandings()` - Current season driver standings
- `getCurrentConstructorStandings()` - Current season constructor standings
- `getCurrentSeasonRaces()` - Full race calendar
- `getRaceResults(season, round)` - Specific race results
- `checkApiHealth()` - API availability check

### Type System

All F1 data types are defined in `src/types/f1.ts` including:
- `Driver` - Driver information and standings
- `Constructor` - Team information and standings
- `Race` - Race event details
- `RaceResult` - Individual race results
- `SeasonStats` - Aggregated season statistics

### Mock Data

When Jolpica API is unavailable, the app falls back to realistic mock data from `src/data/f1Data.ts` ensuring the dashboard always functions for portfolio demonstrations.