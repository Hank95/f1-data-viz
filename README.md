# F1 Data Visualization Dashboard

A modern, comprehensive Formula 1 data visualization dashboard built with **React 19**, **TypeScript**, **TanStack Router**, and **Tailwind CSS**. Features real-time F1 data integration with the **Jolpica API** (successor to the deprecated Ergast API).

![F1 Dashboard Preview](https://via.placeholder.com/800x400/1a1a1a/e10600?text=F1+Data+Visualization+Dashboard)

## 🏎️ Features

### Real-Time Data Integration

- **Live F1 Data**: Integrates with [Jolpica F1 API](https://jolpi.ca/) for current season data
- **Fallback System**: Graceful fallback to realistic demo data when API is unavailable
- **Auto-refresh**: Live data updates every 5 minutes
- **Connection Status**: Visual indicators for live vs demo mode

### Interactive Visualizations

- **Driver Championship Standings** with interactive charts
- **Constructor Team Performance** analysis
- **Race Calendar & Results** with detailed race information
- **Advanced Analytics** with lap time analysis and telemetry simulation
- **Real-time Telemetry Dashboard** with live data simulation

### Modern Technical Stack

- **React 19** with latest features and optimizations
- **TypeScript** for type safety and developer experience
- **TanStack Router** for modern, type-safe routing
- **Tailwind CSS** for responsive, utility-first styling
- **Recharts** for beautiful, interactive data visualizations
- **Vite** for lightning-fast development and builds

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
│   └── Layout.tsx      # Main layout with navigation
├── data/               # Mock data for fallback
│   └── f1Data.ts       # Realistic F1 demo data
├── hooks/              # Custom React hooks
│   └── useF1Data.ts    # F1 data fetching and state management
├── pages/              # Route components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Drivers.tsx     # Driver standings
│   ├── Constructors.tsx # Team standings
│   ├── Races.tsx       # Race calendar & results
│   └── Analytics.tsx   # Advanced analytics
├── services/           # API services
│   └── jolpicaApi.ts   # Jolpica API integration
├── types/              # TypeScript type definitions
│   └── f1.ts           # F1 data types
└── router.tsx          # TanStack Router configuration
```

### Key Technical Decisions

1. **TanStack Router**: Chosen for its type-safety and modern API over React Router
2. **Jolpica API**: Using the most current F1 data source after Ergast deprecation
3. **Fallback Strategy**: Graceful degradation ensures portfolio always works
4. **TypeScript**: Full type coverage for better developer experience
5. **Component Architecture**: Modular, reusable components for maintainability

## 🎨 Design System

### Color Palette

- **F1 Red**: `#E10600` - Primary brand color
- **Racing Silver**: `#C0C0C0` - Secondary accents
- **Carbon Black**: `#15151E` - Main background
- **Team Colors**: Individual team branding colors

### Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Dark Theme**: Racing-inspired dark UI
- **Smooth Animations**: 60fps transitions and micro-interactions

## 📈 Performance Optimizations

- **Code Splitting**: Route-based code splitting with TanStack Router
- **Data Caching**: Intelligent caching of API responses
- **Optimistic Updates**: Immediate UI updates with background sync
- **Bundle Optimization**: Tree-shaking and modern build optimizations
- **Image Optimization**: WebP format with fallbacks

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables required - the app works out of the box with public APIs.

### API Rate Limiting

The Jolpica API has rate limits to ensure fair usage:

- Respects API guidelines with appropriate caching
- Implements exponential backoff for failed requests
- Falls back to demo data if rate limited

## 🚀 Deployment

### Recommended Platforms

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Simple static hosting
- **GitHub Pages** - Free hosting for open source

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

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

- Portfolio: [henrypendleton.com](https://henrypendleton.com)
- GitHub: [@hank95](https://github.com/hank95)
- Email: hhpendleton@gmail.com

---

_Built with ❤️ for Formula 1 fans and data visualization enthusiasts_
