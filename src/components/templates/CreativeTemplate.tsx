import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export function CreativeTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, education, skills, projects, experience, certifications, visibleSections } = resumeData;

  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.address || 
                         personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div className="bg-white text-gray-800 min-h-full">
      {/* Header with accent */}
      {visibleSections.personalInfo && (
        <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          {personalInfo.summary && (
            <p className="text-white/90 max-w-2xl leading-relaxed">{personalInfo.summary}</p>
          )}
          
          {hasContactInfo && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-white/80">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.address}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1.5">
                  <Github className="w-4 h-4" />
                  GitHub
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  Portfolio
                </span>
              )}
            </div>
          )}
        </header>
      )}

      <div className="p-8">
        {/* Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              Experience
            </h2>
            <div className="space-y-6 ml-10">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-purple-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <span className="font-medium text-purple-600">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    {exp.location && (
                      <>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                  {exp.responsibilities.length > 0 && (
                    <ul className="space-y-1">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0" />
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
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              Education
            </h2>
            <div className="space-y-4 ml-10">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-pink-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-pink-500 rounded-full" />
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-gray-700">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                    {edu.cgpa && (
                      <>
                        <span>•</span>
                        <span>CGPA: {edu.cgpa}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    {(project.githubUrl || project.liveUrl) && (
                      <ExternalLink className="w-4 h-4 text-purple-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.split(',').map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {visibleSections.skills && skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 ml-10">
              {skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 rounded-lg text-sm font-medium border border-purple-100"
                >
                  {skill.name}
                  <span className="ml-2 text-xs text-purple-500">({skill.level})</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {visibleSections.certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              Certifications
            </h2>
            <div className="space-y-3 ml-10">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-sm text-purple-600 font-medium">{cert.date}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
