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
    <div className="min-h-screen bg-gradient-to-br from-f1-gray-900 via-f1-black to-f1-gray-800">
      {/* Header */}
      <header className="bg-f1-black/90 backdrop-blur-sm border-b border-f1-red/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-f1-red to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F1</span>
              </div>
              <h1 className="text-xl font-bold text-white">Data Analytics</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isCurrentPage(item.href)
                        ? "bg-f1-red text-white shadow-lg"
                        : "text-f1-gray-300 hover:text-white hover:bg-f1-gray-800"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-f1-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-f1-black/95 backdrop-blur-sm border-t border-f1-red/20">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isCurrentPage(item.href)
                        ? "bg-f1-red text-white"
                        : "text-f1-gray-300 hover:text-white hover:bg-f1-gray-800"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-f1-black/50 border-t border-f1-gray-800 mt-16">
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
