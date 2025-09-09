import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import MotherboardPage from './pages/MotherboardPage';
import TermsPage from './pages/TermsPage';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Get page from URL hash or default to home
    const hash = window.location.hash.slice(1);
    return hash || 'home';
  });

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Update URL hash
    window.location.hash = page;
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Listen for hash changes (back/forward buttons)
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage onPageChange={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'booking':
        return <BookingPage />;
      case 'motherboard':
        return <MotherboardPage onPageChange={setCurrentPage} />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19355c] to-[#0f2a47]">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {currentPage === 'home' ? (
          <HomePage onPageChange={handlePageChange} />
        ) : (
          renderPage()
        )}
      </main>
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;