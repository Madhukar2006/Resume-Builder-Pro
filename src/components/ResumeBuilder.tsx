import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import type { ResumeData } from '@/types/resume';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { DesignSettingsForm } from './forms/DesignSettingsForm';
import { ResumePreview } from './ResumePreview';
import { 
  User, 
  GraduationCap, 
  Wrench, 
  Briefcase, 
  FolderGit, 
  Award, 
  Eye,
  EyeOff,
  Trash2,
  Check,
  LayoutTemplate,
  FileText,
  Menu,
  X,
  ChevronLeft,
  Save,
  Sparkles,
  Palette,
  ArrowLeft
} from 'lucide-react';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'skills', label: 'Skills', icon: Wrench, component: SkillsForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'projects', label: 'Projects', icon: FolderGit, component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
  { id: 'design', label: 'Design & Layout', icon: Palette, component: DesignSettingsForm },
] as const;

const sectionKeyMap: Record<string, keyof ResumeData['visibleSections']> = {
  personal: 'personalInfo',
  education: 'education',
  skills: 'skills',
  experience: 'experience',
  projects: 'projects',
  certifications: 'certifications',
  design: 'personalInfo',
};

const arraySections = ['education', 'skills', 'experience', 'projects', 'certifications'] as const;

// API function to save resume data
async function saveResumeToServer(resumeData: ResumeData) {
  try {
    const response = await fetch('/api/save-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to save to server:', error);
    return { success: false, error };
  }
}

interface ResumeBuilderProps {
  onBack?: () => void;
}

export function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const { resumeData, toggleSection, clearAllData, completionPercentage } = useResume();
  const { visibleSections } = resumeData;
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const ActiveComponent = sections.find((s) => s.id === activeSection)?.component || PersonalInfoForm;

  const handleClear = () => {
    clearAllData();
    setShowClearConfirm(false);
  };

  const handleSaveToServer = async () => {
    setIsSaving(true);
    setSaveMessage('');
    const result = await saveResumeToServer(resumeData);
    if (result.success) {
      setSaveMessage('Saved successfully!');
    } else {
      setSaveMessage('Save failed - saved locally');
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowMobileNav(false);
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Resume Builder</h2>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{completionPercentage}%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Go Back Button - Mobile */}
          {onBack && (
            <button
              onClick={handleGoBack}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2.5 rounded-xl transition-all ${showPreview ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            <LayoutTemplate className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {showMobileNav && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={() => setShowMobileNav(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Sections</h2>
              </div>
              <button onClick={() => setShowMobileNav(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Go Back Button in Mobile Menu */}
            {onBack && (
              <div className="p-3 border-b border-gray-100">
                <button
                  onClick={() => {
                    handleGoBack();
                    setShowMobileNav(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back to Previous Page
                </button>
              </div>
            )}

            <nav className="flex-1 overflow-y-auto p-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span>{section.label}</span>
                  {section.id === 'personal' && resumeData.personalInfo.fullName && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50">
              <button
                onClick={handleSaveToServer}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-green-500/25 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save to Cloud'}
              </button>
              {saveMessage && (
                <p className={`text-xs text-center ${saveMessage.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>
                  {saveMessage}
                </p>
              )}
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex-col shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          {/* Go Back Button - Desktop */}
          {onBack && (
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Resume Builder</h2>
              <p className="text-xs text-gray-500">Create your perfect resume</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Profile Completion</span>
              <span className="font-medium text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-2">Sections</p>
          {sections.map((section) => {
            const sectionKey = sectionKeyMap[section.id];
            const isVisible = visibleSections[sectionKey];
            return (
              <div key={section.id} className="flex items-center gap-1 mb-1.5">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{section.label}</span>
                  {section.id === 'personal' && resumeData.personalInfo.fullName && (
                    <Check className="w-3.5 h-3.5 ml-auto" />
                  )}
                  {arraySections.includes(section.id as typeof arraySections[number]) && 
                   (resumeData[section.id as typeof arraySections[number]]?.length || 0) > 0 && (
                    <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {resumeData[section.id as typeof arraySections[number]].length}
                    </span>
                  )}
                </button>
                {section.id !== 'design' && (
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                      isVisible ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300'
                    }`}
                    title={isVisible ? 'Hide section' : 'Show section'}
                  >
                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2.5 bg-gray-50/50">
          <button
            onClick={handleSaveToServer}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save to Cloud'}
          </button>
          {saveMessage && (
            <p className={`text-xs text-center ${saveMessage.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>
              {saveMessage}
            </p>
          )}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
              showPreview 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Area */}
        <main 
          className={`${showPreview ? 'hidden lg:block lg:w-1/2' : 'w-full'} overflow-y-auto transition-all duration-300 bg-gradient-to-br from-slate-50 to-white`}
        >
          {/* Form Header */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-800">
                {sections.find(s => s.id === activeSection)?.label}
              </span>
            </div>
            {!showPreview && (
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}
          </div>

          {/* Form Content */}
          <div className="p-4 lg:p-8 pb-24 lg:pb-8">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 lg:p-8">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </main>

        {/* Preview Area */}
        {showPreview && (
          <aside className="fixed inset-0 lg:static lg:w-1/2 z-40 bg-gray-100 lg:border-l border-gray-200 overflow-hidden flex flex-col">
            {/* Mobile Preview Header */}
            <div className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Preview</h3>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ResumePreview />
            </div>
          </aside>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Clear All Data?</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">
              This will permanently delete all your resume data. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
