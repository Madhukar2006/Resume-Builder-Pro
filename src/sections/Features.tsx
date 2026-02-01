import { useEffect, useRef } from 'react';
import { Zap, FileCheck, Download, Palette, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Easy to Use',
    description:
      'Intuitive drag-and-drop interface. No design skills needed. Build your resume in minutes with our step-by-step guide.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: FileCheck,
    title: 'ATS-Friendly',
    description:
      'Our templates are optimized for Applicant Tracking Systems. Ensure your resume gets past automated filters.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Download,
    title: 'Instant PDF Download',
    description:
      'Download your resume as a high-quality PDF with one click. Perfect for job applications and email attachments.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Palette,
    title: 'Multiple Templates',
    description:
      'Choose from classic, modern, minimal, and creative templates. Switch between them instantly without losing data.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your data stays on your device. We store everything locally in your browser. No account required, no data shared.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Clock,
    title: 'Auto-Save',
    description:
      'Never lose your progress. Your resume is automatically saved as you type. Come back anytime to continue editing.',
    color: 'bg-cyan-100 text-cyan-600',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Resume Builder?
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-100 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a professional resume that stands out and gets you hired.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`animate-on-scroll opacity-0 translate-y-6 transition-all duration-700`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 h-full">
                <div
                  className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .animate-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
