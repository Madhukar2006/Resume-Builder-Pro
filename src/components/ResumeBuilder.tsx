import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { useTheme } from '@/context/ThemeContext';
import type { ResumeData } from '@/types/resume';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
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
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft,
  Save
} from 'lucide-react';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'skills', label: 'Skills', icon: Wrench, component: SkillsForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'projects', label: 'Projects', icon: FolderGit, component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
] as const;

const sectionKeyMap: Record<string, keyof ResumeData['visibleSections']> = {
  personal: 'personalInfo',
  education: 'education',
  skills: 'skills',
  experience: 'experience',
  projects: 'projects',
  certifications: 'certifications',
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

export function ResumeBuilder() {
  const { resumeData, toggleSection, clearAllData, completionPercentage } = useResume();
  const { theme, toggleTheme } = useTheme();
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

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden glass-header px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Resume Builder</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
          >
            <LayoutTemplate className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {showMobileNav && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileNav(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-72 glass-sidebar flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sections</h2>
              <button onClick={() => setShowMobileNav(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              {sections.map((section) => {
                return (
                  <div key={section.id} className="flex items-center gap-1 mb-1">
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span>{section.label}</span>
                    </button>
                  </div>
                );
              })}
            </nav>
            <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
              <button
                onClick={handleSaveToServer}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save to Cloud'}
              </button>
              {saveMessage && (
                <p className={`text-xs text-center ${saveMessage.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                  {saveMessage}
                </p>
              )}
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 glass-sidebar flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Resume Builder</h2>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
            </button>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map((section) => {
            const sectionKey = sectionKeyMap[section.id];
            const isVisible = visibleSections[sectionKey];
            return (
              <div key={section.id} className="flex items-center gap-1 mb-1">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 glass-active'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{section.label}</span>
                  {section.id === 'personal' && resumeData.personalInfo.fullName && (
                    <Check className="w-3 h-3 text-green-500 ml-auto flex-shrink-0" />
                  )}
                  {arraySections.includes(section.id as typeof arraySections[number]) && 
                   (resumeData[section.id as typeof arraySections[number]]?.length || 0) > 0 && (
                    <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded flex-shrink-0">
                      {resumeData[section.id as typeof arraySections[number]].length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    isVisible ? 'text-gray-400 hover:text-gray-600 dark:text-gray-500' : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
          <button
            onClick={handleSaveToServer}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save to Cloud'}
          </button>
          {saveMessage && (
            <p className={`text-xs text-center ${saveMessage.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
              {saveMessage}
            </p>
          )}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
              showPreview 
                ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
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
          className={`${showPreview ? 'hidden lg:block lg:w-1/2' : 'w-full'} overflow-y-auto transition-all duration-300`}
        >
          {/* Form Header */}
          <div className="sticky top-0 z-10 glass-header px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-200 text-sm lg:text-base">
                {sections.find(s => s.id === activeSection)?.label}
              </span>
            </div>
            {!showPreview && (
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}
          </div>

          {/* Form Content */}
          <div className="p-4 lg:p-6 pb-24 lg:pb-6">
            <div className="max-w-xl mx-auto">
              <div className="glass-card rounded-xl p-4 lg:p-6">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </main>

        {/* Preview Area */}
        {showPreview && (
          <aside className="fixed inset-0 lg:static lg:w-1/2 z-40 bg-gray-100 dark:bg-gray-800 lg:border-l border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            {/* Mobile Preview Header */}
            <div className="lg:hidden glass-header px-4 py-3 flex items-center justify-between flex-shrink-0">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-modal rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Clear All Data?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              This will permanently delete all your resume data. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
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
