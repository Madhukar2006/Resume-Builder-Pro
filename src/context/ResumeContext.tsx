import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ResumeData, TemplateType } from '@/types/resume';
import { defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: ResumeData['skills'][0]) => void;
  updateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: ResumeData['projects'][0]) => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addExperience: (experience: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addCertification: (cert: ResumeData['certifications'][0]) => void;
  updateCertification: (id: string, cert: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;
  setTemplate: (template: TemplateType) => void;
  toggleSection: (section: keyof ResumeData['visibleSections']) => void;
  clearAllData: () => void;
  completionPercentage: number;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        try {
          return { ...defaultResumeData, ...JSON.parse(saved) };
        } catch {
          return defaultResumeData;
        }
      }
    }
    return defaultResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const calculateCompletion = useCallback(() => {
    let total = 0;
    let filled = 0;

    // Personal info (8 fields)
    const personalFields = Object.values(resumeData.personalInfo);
    total += personalFields.length;
    filled += personalFields.filter(v => v && v.trim() !== '').length;

    // Arrays (each item counts)
    total += 5; // 5 sections
    if (resumeData.education.length > 0) filled++;
    if (resumeData.skills.length > 0) filled++;
    if (resumeData.projects.length > 0) filled++;
    if (resumeData.experience.length > 0) filled++;
    if (resumeData.certifications.length > 0) filled++;

    return Math.round((filled / total) * 100);
  }, [resumeData]);

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    setCompletionPercentage(calculateCompletion());
  }, [calculateCompletion]);

  const updatePersonalInfo = useCallback((info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const addEducation = useCallback((education: ResumeData['education'][0]) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education],
    }));
  }, []);

  const updateEducation = useCallback((id: string, education: Partial<ResumeData['education'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill: ResumeData['skills'][0]) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  }, []);

  const updateSkill = useCallback((id: string, skill: Partial<ResumeData['skills'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        s.id === id ? { ...s, ...skill } : s
      ),
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  }, []);

  const addProject = useCallback((project: ResumeData['projects'][0]) => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  }, []);

  const updateProject = useCallback((id: string, project: Partial<ResumeData['projects'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, ...project } : p
      ),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  }, []);

  const addExperience = useCallback((experience: ResumeData['experience'][0]) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));
  }, []);

  const updateExperience = useCallback((id: string, experience: Partial<ResumeData['experience'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  }, []);

  const addCertification = useCallback((cert: ResumeData['certifications'][0]) => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, cert],
    }));
  }, []);

  const updateCertification = useCallback((id: string, cert: Partial<ResumeData['certifications'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c =>
        c.id === id ? { ...c, ...cert } : c
      ),
    }));
  }, []);

  const removeCertification = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
    }));
  }, []);

  const setTemplate = useCallback((template: TemplateType) => {
    setResumeData(prev => ({ ...prev, template }));
  }, []);

  const toggleSection = useCallback((section: keyof ResumeData['visibleSections']) => {
    setResumeData(prev => ({
      ...prev,
      visibleSections: {
        ...prev.visibleSections,
        [section]: !prev.visibleSections[section],
      },
    }));
  }, []);

  const clearAllData = useCallback(() => {
    setResumeData(defaultResumeData);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addExperience,
        updateExperience,
        removeExperience,
        addCertification,
        updateCertification,
        removeCertification,
        setTemplate,
        toggleSection,
        clearAllData,
        completionPercentage,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
