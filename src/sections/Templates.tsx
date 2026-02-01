import { useEffect, useRef, useState } from 'react';
import { Check, Eye } from 'lucide-react';
import type { TemplateType } from '@/types/resume';

interface TemplatesProps {
  onSelectTemplate: () => void;
}

const templates: { id: TemplateType; name: string; description: string; color: string }[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and elegant. Perfect for conservative industries.',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary. Great for tech and creative roles.',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and refined. Focuses on content over design.',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and distinctive. Stand out while staying professional.',
    color: 'from-purple-600 to-pink-600',
  },
];

function TemplatePreview({ template, isActive }: { template: typeof templates[0]; isActive: boolean }) {
  return (
    <div
      className={`template-card bg-white rounded-xl overflow-hidden shadow-lg ${
        isActive ? 'active' : ''
      }`}
    >
      {/* Mini Preview */}
      <div className={`h-48 bg-gradient-to-br ${template.color} p-4 relative`}>
        <div className="bg-white/95 rounded-lg h-full p-3 shadow-sm">
          {/* Mock Resume Content */}
          <div className="space-y-2">
            <div className="h-3 w-3/4 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="h-2 w-16 bg-gray-200 rounded" />
              <div className="h-2 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="space-y-1">
              <div className="h-2 w-full bg-gray-200 rounded" />
              <div className="h-2 w-5/6 bg-gray-200 rounded" />
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex gap-1 flex-wrap">
              <div className="h-4 w-12 bg-gray-200 rounded-full" />
              <div className="h-4 w-12 bg-gray-200 rounded-full" />
              <div className="h-4 w-12 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Active Badge */}
        {isActive && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      
      {/* Template Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-500">{template.description}</p>
      </div>
    </div>
  );
}

export function Templates({ onSelectTemplate }: TemplatesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

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
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-100 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates designed by HR professionals.
            Each template is fully customizable and optimized for success.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700"
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <TemplatePreview template={template} isActive={selectedTemplate === template.id} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-500 text-center">
          <button
            onClick={onSelectTemplate}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Try This Template
          </button>
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
