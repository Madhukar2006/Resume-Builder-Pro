import { useEffect, useRef } from 'react';
import { ArrowRight, FileText, Sparkles, Download } from 'lucide-react';

interface HeroProps {
  onCreateResume: () => void;
}

export function Hero({ onCreateResume }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-[15%] animate-float-slow">
          <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="absolute top-48 right-[20%] animate-float-medium">
          <div className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div className="absolute bottom-40 right-[15%] animate-float-slow">
          <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <Download className="w-7 h-7 text-green-600" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Free Professional Resume Builder
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Build Your Professional{' '}
          <span className="gradient-text">Resume</span>
          <br />
          in Minutes
        </h1>

        {/* Subtitle */}
        <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-200 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Create stunning, ATS-friendly resumes with our easy-to-use builder.
          Choose from professional templates and download your resume as PDF instantly.
        </p>

        {/* CTA Buttons */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={onCreateResume} className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
            Create Your Resume
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onCreateResume}
            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
          >
            View Templates
          </button>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-400 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">4+</div>
            <div className="text-sm text-gray-500 mt-1">Templates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-500 mt-1">Free</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">ATS</div>
            <div className="text-sm text-gray-500 mt-1">Friendly</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      <style>{`
        .animate-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
