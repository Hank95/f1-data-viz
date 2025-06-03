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
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
      <header className="bg-f1-black/95 backdrop-blur-md border-b border-f1-red/30 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-f1-red via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-base">F1</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Data Analytics
                </h1>
                <p className="text-xs text-f1-gray-400 font-medium">
                  Formula 1 Dashboard
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex flex-col items-center space-y-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isCurrentPage(item.href)
                        ? "bg-gradient-to-r from-f1-red to-red-600 text-white shadow-lg shadow-f1-red/25"
                        : "text-f1-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-f1-gray-800 hover:to-f1-gray-700"
                    }`}
                  >
                    <Icon size={20} className="mb-1" />
                    <span className="text-xs">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-f1-gray-300 hover:text-white p-3 rounded-xl hover:bg-f1-gray-800/60 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-f1-black/98 backdrop-blur-sm border-t border-f1-red/20">
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-6 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
                      isCurrentPage(item.href)
                        ? "bg-gradient-to-r from-f1-red to-red-600 text-white shadow-lg"
                        : "text-f1-gray-300 hover:text-white hover:bg-f1-gray-800"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
