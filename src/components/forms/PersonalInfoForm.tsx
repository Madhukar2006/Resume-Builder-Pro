import { useResume } from '@/context/ResumeContext';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, FileText } from 'lucide-react';

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const fields = [
    { key: 'fullName', label: 'Full Name', icon: User, type: 'text', placeholder: 'John Doe', required: true },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'john@example.com', required: true },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 123-4567', required: false },
    { key: 'address', label: 'Address', icon: MapPin, type: 'text', placeholder: 'City, Country', required: false },
    { key: 'linkedin', label: 'LinkedIn URL', icon: Linkedin, type: 'url', placeholder: 'https://linkedin.com/in/johndoe', required: false },
    { key: 'github', label: 'GitHub URL', icon: Github, type: 'url', placeholder: 'https://github.com/johndoe', required: false },
    { key: 'website', label: 'Personal Website', icon: Globe, type: 'url', placeholder: 'https://johndoe.com', required: false },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <p className="text-sm text-gray-500">Add your basic contact details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key} className={field.key === 'fullName' ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={field.type}
                value={personalInfo[field.key as keyof typeof personalInfo]}
                onChange={(e) => updatePersonalInfo({ [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            placeholder="Brief overview of your professional background and career goals..."
            rows={4}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg input-focus text-sm resize-none"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          A compelling summary helps recruiters understand your value proposition quickly.
        </p>
      </div>
    </div>
  );
}
