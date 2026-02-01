import { useState } from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navigation } from '@/components/Navigation';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { Hero } from '@/sections/Hero';
import { Features } from '@/sections/Features';
import { Templates } from '@/sections/Templates';
import { Footer } from '@/sections/Footer';
import './App.css';

function LandingPage({ onCreateResume }: { onCreateResume: () => void }) {
  return (
    <main className="pt-16">
      <Hero onCreateResume={onCreateResume} />
      <div id="features">
        <Features />
      </div>
      <div id="templates">
        <Templates onSelectTemplate={onCreateResume} />
      </div>
      <Footer />
    </main>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'builder'>('landing');

  const handleNavigate = (page: 'landing' | 'builder') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
          
          {currentPage === 'landing' ? (
            <LandingPage onCreateResume={() => handleNavigate('builder')} />
          ) : (
            <ResumeBuilder />
          )}
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
