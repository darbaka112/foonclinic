import React from 'react';
import { Smartphone, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const [isLiquidGlass, setIsLiquidGlass] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Start liquid glass effect when reaching "Onze Diensten" section (approximately 800px)
      setIsLiquidGlass(currentScrollY > 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transparency based on scroll position
  const getHeaderStyle = () => {
    if (!isLiquidGlass) {
      return 'bg-white/95 backdrop-blur-md';
    }
    
    // Liquid glass effect with varying transparency
    const opacity = Math.max(0.7, 1 - (scrollY - 800) / 1000);
    return `backdrop-blur-xl border border-white/20 shadow-2xl`;
  };

  const getHeaderBackground = () => {
    if (!isLiquidGlass) return {};
    
    const opacity = Math.max(0.1, 0.3 - (scrollY - 800) / 2000);
    return {
      background: `linear-gradient(135deg, rgba(255,255,255,${opacity}), rgba(255,255,255,${opacity * 0.5}))`,
    };
  };

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Over Ons', id: 'about' },
    { name: 'Moederbord Reparatie', id: 'motherboard' },
    { name: 'Reparatie Plannen', id: 'booking' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header 
      className={`${getHeaderStyle()} sticky top-0 z-50 rounded-bl-3xl rounded-br-3xl transition-all duration-500 hover:shadow-2xl`}
      style={getHeaderBackground()}
    >
      {/* Liquid glass animated background effects */}
      {isLiquidGlass && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-cyan-400/10 rounded-bl-3xl rounded-br-3xl animate-pulse"></div>
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-300/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300/25 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          
          {/* Flowing liquid effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-bl-3xl rounded-br-3xl" style={{ animationDuration: '2s' }}></div>
          
          {/* Additional liquid glass overlay */}
          <div className="absolute inset-0 rounded-bl-3xl rounded-br-3xl bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-bl-3xl rounded-br-3xl border border-white/40 pointer-events-none"></div>
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center py-5 relative z-10 -ml-4">
          {/* Logo */}
          <button 
            onClick={() => onPageChange('home')}
            className={`flex items-center space-x-4 group transition-all duration-300 hover:scale-105 ${isLiquidGlass ? 'drop-shadow-lg' : ''}`}
          >
            <img 
              src="/logo.png" 
              alt="Foon Clinic Logo" 
              className={`h-20 w-auto object-contain transition-all duration-300 group-hover:scale-110 ${isLiquidGlass ? 'drop-shadow-2xl' : 'drop-shadow-lg'}`}
              style={{
                filter: 'brightness(0) saturate(100%) invert(12%) sepia(85%) saturate(2000%) hue-rotate(200deg) brightness(90%) contrast(110%)'
              }}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`relative px-5 py-3 rounded-xl font-medium overflow-hidden group transition-all duration-300 ${
                  currentPage === item.id
                    ? `bg-gradient-to-r from-[#19355c] to-[#0f2a47] text-white shadow-lg mobile-nav-active ${isLiquidGlass ? 'shadow-2xl' : ''}`
                    : `mobile-nav-inactive ${isLiquidGlass ? 'text-gray-800 drop-shadow-sm hover:bg-white/20' : 'text-gray-700'}`
                }`}
              >
                {/* Background hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#19355c] to-[#0f2a47] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl ${isLiquidGlass ? 'opacity-90' : ''}`}></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                
                {/* Text */}
                {/* Mobile button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                
                {/* Mobile button slide effect */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#19355c] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-full"></div>
                
                <span className="relative z-10 group-hover:text-[#19355c] group-hover:translate-x-2 transition-all duration-300">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-180 group ${
              isLiquidGlass 
                ? 'text-gray-800 hover:bg-white/20 drop-shadow-sm' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              <Menu className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out relative z-10 ${
          isLiquidGlass ? 'border-t border-white/30' : 'border-t border-gray-200/50'
        } ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 py-4 transform translate-y-0' 
            : 'max-h-0 opacity-0 overflow-hidden transform -translate-y-4'
        }`}>
            <nav className="flex flex-col space-y-3">
              {navigation.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`px-5 py-4 rounded-xl font-medium text-left transition-all duration-300 transform hover:scale-102 ${
                    currentPage === item.id
                     ? `bg-gradient-to-r from-[#19355c] to-[#0f2a47] text-white shadow-lg ${isLiquidGlass ? 'shadow-2xl' : ''}`
                     : `hover:text-[#19355c] hover:shadow-md hover:translate-x-2 ${
                         isLiquidGlass 
                           ? 'text-gray-800 hover:bg-white/20 drop-shadow-sm' 
                           : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                       }`
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
        </div>
      </div>
    </header>
  );
}