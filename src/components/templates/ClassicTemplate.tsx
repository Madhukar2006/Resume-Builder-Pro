import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function ClassicTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, skills, projects, experience, certifications, visibleSections } = resumeData;

  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.address || 
                         personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div className="bg-white text-gray-800 p-8 min-h-full font-serif">
      {/* Header */}
      {visibleSections.personalInfo && (
        <header className="text-center border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          {hasContactInfo && (
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-3">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.address && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {personalInfo.address}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" />
                  LinkedIn
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  GitHub
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Portfolio
                </span>
              )}
            </div>
          )}
        </header>
      )}

      {/* Summary */}
      {visibleSections.personalInfo && personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-600 italic">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                {exp.responsibilities.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />
                        <span>{resp}</span>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <span className="text-sm text-gray-600 italic">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.school}{edu.location && `, ${edu.location}`}</p>
                {edu.cgpa && <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {visibleSections.skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {skills.map((skill) => (
              <span key={skill.id} className="text-sm text-gray-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {visibleSections.projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                {project.techStack && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Technologies:</span> {project.techStack}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {visibleSections.certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 pb-1 mb-3">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                </div>
                {cert.date && <span className="text-sm text-gray-600 italic">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
