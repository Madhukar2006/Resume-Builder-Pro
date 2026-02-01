export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  cgpa: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export type TemplateType = 'classic' | 'modern' | 'minimal' | 'creative';

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  template: TemplateType;
  visibleSections: {
    personalInfo: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    certifications: boolean;
  };
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    website: '',
    summary: '',
  },
  education: [],
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  template: 'modern',
  visibleSections: {
    personalInfo: true,
    education: true,
    skills: true,
    projects: true,
    experience: true,
    certifications: true,
  },
};
