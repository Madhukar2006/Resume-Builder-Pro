import { useState } from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import { Navigation } from '@/components/Navigation';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { Hero } from '@/sections/Hero';
import { Features } from '@/sections/Features';
import { Templates } from '@/sections/Templates';
import { ResumeTemplatesShowcase } from '@/sections/ResumeTemplatesShowcase';
import { Footer } from '@/sections/Footer';
import './App.css';

function LandingPage({ onCreateResume }: { onCreateResume: () => void }) {
  return (
    <main className="pt-16">
      <Hero onCreateResume={onCreateResume} />
      <div id="features">
        <Features />
      </div>
      <ResumeTemplatesShowcase onSelectTemplate={onCreateResume} />
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
    <ResumeProvider>
      <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        
        {currentPage === 'landing' ? (
          <LandingPage onCreateResume={() => handleNavigate('builder')} />
        ) : (
          <ResumeBuilder onBack={() => handleNavigate('landing')} />
        )}
      </div>
    </ResumeProvider>
  );
}

export default App;
