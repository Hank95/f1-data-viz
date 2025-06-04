# F1 Data Visualization Dashboard

A modern, comprehensive Formula 1 data visualization dashboard built with **React 19**, **TypeScript**, **TanStack Router**, and **Tailwind CSS**. Features real-time F1 data integration with the **Jolpica API** (successor to the deprecated Ergast API) and a complete multi-season experience spanning 2020-2025.

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/🏎️_Live_Demo-f1.henrypendleton.com-E10600?style=for-the-badge)](https://f1.henrypendleton.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-FF4154?style=flat)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

## 🏎️ Features

### Multi-Season Data Platform

- **Year Selector**: Browse complete F1 data from 2020-2025 seasons
- **Global State Management**: React Context API for seamless season switching
- **Historical Analysis**: Compare performance across multiple seasons
- **Current Season Focus**: Defaults to 2025 championship data

### Real-Time Data Integration

- **Live F1 Data**: Integrates with [Jolpica F1 API](https://jolpi.ca/) for current season data
- **Fallback System**: Graceful fallback to realistic demo data when API is unavailable
- **Auto-refresh**: Live data updates with manual refresh capability
- **Connection Status**: Visual indicators for live vs demo mode

### Comprehensive Dashboard Suite

- **Main Dashboard**: Overview with key stats, recent race results, and championship leaders
- **Driver Championship**: Detailed standings with sorting, statistics, and driver profiles
- **Constructor Championship**: Team standings with driver lineups and performance analysis
- **Race Calendar & Results**: Complete race schedule with detailed results and race-by-race data
- **Advanced Analytics**: Lap time analysis, telemetry simulation, and performance insights

### Modern Technical Stack

- **React 19** with latest features and optimizations
- **TypeScript** for type safety and developer experience
- **TanStack Router** for modern, type-safe routing
- **Tailwind CSS v4** with responsive, utility-first styling
- **Recharts** for beautiful, interactive data visualizations
- **Vite** for lightning-fast development and optimized builds
- **React Context API** for global state management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/f1-data-visualization.git
   cd f1-data-visualization
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Data Sources

### Primary: Jolpica F1 API

This project uses the **Jolpica F1 API** as its primary data source:

- **URL**: `https://api.jolpi.ca/ergast/f1/`
- **Status**: Active and maintained community project
- **Features**: Backwards compatible with Ergast API
- **Coverage**: Complete F1 data from 1950 to present

> **Why Jolpica?** The original Ergast API was deprecated after the 2024 season and shut down in early 2025. Jolpica is the community-backed successor, providing the same data structure with improved reliability and ongoing maintenance.

### Fallback: Demo Data

When the Jolpica API is unavailable, the application automatically switches to realistic demo data, ensuring the dashboard remains functional for portfolio demonstrations.

## 🛠️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Charts.tsx      # Chart components using Recharts
│   └── Layout.tsx      # Main layout with navigation and year selector
├── context/            # React Context providers
│   └── F1DataContext.tsx # Global F1 data state management
├── data/               # Mock data for fallback
│   └── f1Data.ts       # Realistic F1 demo data
├── hooks/              # Custom React hooks
│   └── useF1Data.ts    # F1 data fetching with season support
├── pages/              # Route components
│   ├── Dashboard.tsx   # Main dashboard overview
│   ├── Drivers.tsx     # Driver championship standings
│   ├── Constructors.tsx # Constructor championship standings
│   ├── Races.tsx       # Race calendar & detailed results
│   └── Analytics.tsx   # Advanced analytics and telemetry
├── services/           # API services
│   └── jolpicaApi.ts   # Jolpica API integration with season params
├── types/              # TypeScript type definitions
│   └── f1.ts           # F1 data types and interfaces
└── router.tsx          # TanStack Router configuration
```

### Key Technical Decisions

1. **TanStack Router**: Chosen for its type-safety and modern API over React Router
2. **React Context API**: Global state management for season selection and data sharing
3. **Jolpica API**: Using the most current F1 data source after Ergast deprecation
4. **Multi-Season Architecture**: All API functions support season parameters for historical data
5. **Fallback Strategy**: Graceful degradation ensures portfolio always works
6. **TypeScript**: Full type coverage for better developer experience
7. **Component Architecture**: Modular, reusable components for maintainability

## 🎨 Design System

### Color Palette

- **F1 Red**: `#E10600` - Primary brand color
- **Racing Silver**: `#C0C0C0` - Secondary accents
- **Carbon Black**: `#15151E` - Main background
- **Team Colors**: Individual team branding colors

### Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Dark Theme**: Racing-inspired dark UI with glassmorphism effects
- **Modern Navigation**: Clean header with year selector and portfolio links
- **Smooth Animations**: 60fps transitions and micro-interactions
- **Accessibility**: Screen reader friendly with semantic HTML

## 📈 Performance Optimizations

- **Code Splitting**: Route-based code splitting with lazy loading
- **Bundle Optimization**: Chunked builds (vendor, router, charts, utils)
- **Production Build**: Minified assets with ~816KB total bundle (~234KB gzipped)
- **Data Caching**: Context-based state management reduces API calls
- **Vite Optimizations**: Fast HMR in development, optimized production builds
- **CSS Optimization**: Tailwind CSS purging for minimal stylesheets

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Environment Variables

No environment variables required - the app works out of the box with public APIs.

### API Rate Limiting

The Jolpica API has rate limits to ensure fair usage:

- Respects API guidelines with appropriate caching
- Implements exponential backoff for failed requests
- Falls back to demo data if rate limited

## 🚀 Deployment

This application is production-ready with optimized builds and can be deployed to any static hosting platform.

### Recommended Platforms

- **Vercel** (recommended) - Zero-config deployment with automatic optimizations
- **Netlify** - Simple static hosting with CI/CD
- **GitHub Pages** - Free hosting for open source projects

### Deploy to Vercel

**Live Site**: [f1.henrypendleton.com](https://f1.henrypendleton.com)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push
4. Custom domain and SSL included

### Manual Deployment

```bash
npm run build
# Upload contents of dist/ folder to your hosting provider
```

### SEO & Meta Tags

The application includes:

- Comprehensive meta tags for social sharing
- Open Graph and Twitter Card support
- robots.txt for search engine optimization
- Performance-optimized loading

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jolpica F1 Community** for maintaining the F1 API after Ergast deprecation
- **Formula 1** for the amazing sport and data
- **Ergast Developer API** for years of reliable F1 data (RIP early 2025)
- **TanStack Team** for excellent router and query tools
- **Tailwind CSS** for the utility-first CSS framework

## 📧 Contact

**Henry Pendleton**

- **Live F1 Dashboard**: [f1.henrypendleton.com](https://f1.henrypendleton.com)
- Portfolio: [henrypendleton.com](https://henrypendleton.com)
- GitHub: [@hank95](https://github.com/hank95)
- Email: hhpendleton@gmail.com

---

_Built with ❤️ for Formula 1 fans and data visualization enthusiasts_
