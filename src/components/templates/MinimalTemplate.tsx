import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function MinimalTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, skills, projects, experience, certifications, visibleSections } = resumeData;

  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.address || 
                         personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div className="bg-white text-gray-800 p-10 min-h-full font-light">
      {/* Header */}
      {visibleSections.personalInfo && (
        <header className="mb-10">
          <h1 className="text-4xl font-extralight text-gray-900 mb-4 tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          {hasContactInfo && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {personalInfo.address}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Portfolio
                </span>
              )}
            </div>
          )}
        </header>
      )}

      {/* Summary */}
      {visibleSections.personalInfo && personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-normal text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-400">
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{exp.company}{exp.location && `, ${exp.location}`}</p>
                {exp.responsibilities.length > 0 && (
                  <ul className="space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {resp}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {visibleSections.education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-normal text-gray-900">{edu.school}</h3>
                  <span className="text-xs text-gray-400">
                    {edu.startDate} — {edu.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {edu.degree}{edu.field && `, ${edu.field}`}
                </p>
                {edu.cgpa && <p className="text-xs text-gray-400 mt-1">CGPA: {edu.cgpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {visibleSections.projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-normal text-gray-900 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                {project.techStack && (
                  <p className="text-xs text-gray-400 mt-1">{project.techStack}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {visibleSections.skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Skills
          </h2>
          <p className="text-sm text-gray-600">
            {skills.map((skill) => skill.name).join(' · ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {visibleSections.certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                </div>
                {cert.date && <span className="text-xs text-gray-400">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
