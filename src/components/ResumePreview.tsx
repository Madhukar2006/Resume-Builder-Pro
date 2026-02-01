import { useRef, useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { Download, Loader2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { TemplateType } from '@/types/resume';

const templates: { id: TemplateType; name: string; component: React.FC }[] = [
  { id: 'classic', name: 'Classic', component: ClassicTemplate },
  { id: 'modern', name: 'Modern', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
  { id: 'creative', name: 'Creative', component: CreativeTemplate },
];

export function ResumePreview() {
  const { resumeData, setTemplate, completionPercentage } = useResume();
  const { template } = resumeData;
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const CurrentTemplate = templates.find((t) => t.id === template)?.component || ModernTemplate;

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resumeData.personalInfo.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrevTemplate = () => {
    const currentIndex = templates.findIndex((t) => t.id === template);
    const prevIndex = currentIndex === 0 ? templates.length - 1 : currentIndex - 1;
    setTemplate(templates[prevIndex].id);
  };

  const handleNextTemplate = () => {
    const currentIndex = templates.findIndex((t) => t.id === template);
    const nextIndex = currentIndex === templates.length - 1 ? 0 : currentIndex + 1;
    setTemplate(templates[nextIndex].id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Template Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTemplateSelector(!showTemplateSelector)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
            >
              <FileText className="w-4 h-4" />
              {templates.find((t) => t.id === template)?.name}
            </button>
            
            {showTemplateSelector && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-[150px]">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTemplate(t.id);
                      setShowTemplateSelector(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      template === t.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevTemplate}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextTemplate}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress & Download */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{completionPercentage}%</span>
          </div>
          
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating || completionPercentage < 20}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-8">
        <div className="max-w-[210mm] mx-auto">
          {/* Resume Container - A4 Size */}
          <div 
            ref={resumeRef}
            className="bg-white shadow-2xl"
            style={{ 
              width: '210mm', 
              minHeight: '297mm',
              aspectRatio: '210/297'
            }}
          >
            <CurrentTemplate />
          </div>
        </div>
      </div>

      {/* Click outside to close template selector */}
      {showTemplateSelector && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowTemplateSelector(false)}
        />
      )}
    </div>
  );
}
