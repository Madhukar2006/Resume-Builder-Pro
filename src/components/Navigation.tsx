import { useState } from 'react';
import { FileText, Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: 'landing' | 'builder';
  onNavigate: (page: 'landing' | 'builder') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'landing' as const },
    { label: 'Templates', page: 'landing' as const, section: 'templates' },
    { label: 'Features', page: 'landing' as const, section: 'features' },
    { label: 'Create Resume', page: 'builder' as const, highlight: true },
  ];

  const handleNavClick = (page: 'landing' | 'builder', section?: string) => {
    onNavigate(page);
    if (section && page === 'landing') {
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  if (currentPage === 'builder') {
    return (
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">Resume Builder Pro</span>
        </button>
        
        <button
          onClick={() => onNavigate('landing')}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Exit to Home
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">Resume Builder Pro</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  link.highlight
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center gap-1.5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  link.highlight
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.highlight && <Sparkles className="w-4 h-4" />}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
