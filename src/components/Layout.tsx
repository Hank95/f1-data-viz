import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  Users,
  Building2,
  Trophy,
  TrendingUp,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import { useF1DataContext } from "../context/F1DataContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { selectedSeason, setSelectedSeason } = useF1DataContext();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Drivers", href: "/drivers", icon: Users },
    { name: "Constructors", href: "/constructors", icon: Building2 },
    { name: "Races", href: "/races", icon: Trophy },
    { name: "Analytics", href: "/analytics", icon: TrendingUp },
  ];

  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-f1-gray-900 via-f1-black to-f1-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-f1-black/80 backdrop-blur-xl border-b border-f1-gray-800/50 sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-f1-red blur-xl opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-f1-red to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-black text-lg">F1</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Data Analytics
                </h1>
                <p className="text-sm text-f1-gray-400">
                  {selectedSeason === "current" ? "2025" : selectedSeason} Season Dashboard
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Year Selector */}
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-f1-gray-400" />
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="bg-f1-gray-800/50 border border-f1-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-f1-red focus:border-transparent transition-all"
                >
                  <option value="current">2025 (Current)</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>

              <div className="h-6 w-px bg-f1-gray-700"></div>

              <nav className="flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentPage(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative group flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-f1-gray-400 hover:text-white"
                    }`}
                  >
                    {/* Active background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-f1-red/20 to-red-600/20 rounded-2xl" />
                    )}
                    
                    {/* Hover background */}
                    <div className={`absolute inset-0 rounded-2xl transition-opacity duration-200 ${
                      isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                    } bg-f1-gray-800/50`} />
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-2">
                      <Icon size={18} className={isActive ? "text-f1-red" : ""} />
                      <span>{item.name}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-f1-red to-red-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
              </nav>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative p-3 rounded-2xl text-f1-gray-400 hover:text-white transition-colors duration-200"
            >
              <div className="absolute inset-0 bg-f1-gray-800/50 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-200" />
              <div className="relative">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-f1-black/95 backdrop-blur-xl border-t border-f1-gray-800/50">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Year Selector */}
              <div className="pb-4 border-b border-f1-gray-700/50">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-f1-gray-400" />
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="flex-1 bg-f1-gray-800/50 border border-f1-gray-700 text-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-f1-red focus:border-transparent"
                  >
                    <option value="current">2025 (Current)</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>

              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentPage(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-f1-red/20 to-red-600/20"
                        : "text-f1-gray-400 hover:text-white hover:bg-f1-gray-800/50"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-f1-red" : ""} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-f1-red to-red-600 rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-f1-black/50 border-t border-f1-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-f1-gray-400 text-sm">
            <p>F1 Data Analytics Dashboard - Built by Henry Pendleton</p>
            <p className="mt-1">
              Showcasing React 19, TypeScript, TanStack Router & Data
              Visualization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
