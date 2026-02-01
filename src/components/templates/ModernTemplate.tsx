import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export function ModernTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, skills, projects, experience, certifications, visibleSections } = resumeData;

  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.address || 
                         personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div className="bg-white text-gray-800 min-h-full">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-1/3 bg-slate-800 text-white p-6">
          {/* Name */}
          {visibleSections.personalInfo && (
            <div className="mb-8">
              <h1 className="text-2xl font-bold leading-tight">
                {personalInfo.fullName || 'Your Name'}
              </h1>
            </div>
          )}

          {/* Contact Info */}
          {visibleSections.personalInfo && hasContactInfo && (
            <div className="mb-8 space-y-2">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Contact</h2>
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="w-4 h-4 text-slate-400" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Portfolio</span>
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {visibleSections.skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <span className="text-sm">{skill.name}</span>
                    <div className="mt-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 rounded-full"
                        style={{ 
                          width: skill.level === 'Expert' ? '100%' : 
                                 skill.level === 'Advanced' ? '80%' : 
                                 skill.level === 'Intermediate' ? '60%' : '40%' 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {visibleSections.education && education.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-sm">{edu.school}</p>
                    <p className="text-sm text-slate-300">{edu.degree}</p>
                    {edu.field && <p className="text-xs text-slate-400">{edu.field}</p>}
                    <p className="text-xs text-slate-400 mt-1">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                    {edu.cgpa && <p className="text-xs text-slate-400">CGPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-6">
          {/* Summary */}
          {visibleSections.personalInfo && personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-3">
                About Me
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {visibleSections.experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-4">
                Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-blue-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
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

          {/* Projects */}
          {visibleSections.projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-4">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      {(project.githubUrl || project.liveUrl) && (
                        <ExternalLink className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                    {project.techStack && (
                      <p className="text-xs text-blue-600 mt-2 font-medium">{project.techStack}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {visibleSections.certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-4">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                    {cert.date && <span className="text-sm text-blue-600">{cert.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
