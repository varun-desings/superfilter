
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CartMini from './CartMini';
import logoImg from '@/components/WhatsApp Image 2025-08-22 at 00.09.29_3097a421.jpg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/' && window.location.pathname !== '/#') {
      navigate(`/#${sectionId}`);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Accueil', href: '#home', isSection: true },
    { label: 'À propos', href: '#chi-siamo', isSection: true },
    { label: 'Produits', href: '/products', isSection: false },
    { label: 'Contact', href: '#contatti', isSection: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center">
          {/* Left: Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src={logoImg} 
                alt="Super Filtre Logo" 
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded object-cover"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.label}
                  onClick={() => handleScrollToSection(item.href.substring(1))}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Right: CTA, Cart, Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:block">
              <button 
                onClick={() => handleScrollToSection('contatti')}
                className="btn-accent"
              >
                Contactez‑nous
              </button>
            </div>
            <div className="hidden md:block">
              <CartMini />
            </div>
            <button
              className="md:hidden p-2 text-primary hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-border/50 pt-4">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.label}
                  onClick={() => {
                    handleScrollToSection(item.href.substring(1));
                    setIsMenuOpen(false);
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2 bg-transparent border-none cursor-pointer w-full text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            <button 
              onClick={() => {
                handleScrollToSection('contatti');
                setIsMenuOpen(false);
              }}
              className="btn-accent inline-block mt-4 w-full text-center"
            >
              Contactez‑nous
            </button>
            <div className="pt-2">
              <CartMini />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
