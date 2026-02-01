import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Plus, X, Calendar, MapPin, Building2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    location: '',
    responsibilities: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResponsibilities = formData.responsibilities.filter(r => r.trim() !== '');
    const dataToSubmit = { ...formData, responsibilities: filteredResponsibilities };
    
    if (editingId) {
      updateExperience(editingId, dataToSubmit);
      setEditingId(null);
    } else {
      addExperience({ ...dataToSubmit, id: uuidv4() });
    }
    setIsAdding(false);
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: [''],
    });
  };

  const handleEdit = (exp: typeof experience[0]) => {
    setFormData({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.location,
      responsibilities: exp.responsibilities.length > 0 ? exp.responsibilities : [''],
    });
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: [''],
    });
  };

  const addResponsibility = () => {
    setFormData({ ...formData, responsibilities: [...formData.responsibilities, ''] });
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index);
    setFormData({ ...formData, responsibilities: newResponsibilities.length > 0 ? newResponsibilities : [''] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
            <p className="text-sm text-gray-500">Add your professional experience</p>
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        )}
      </div>

      {/* Experience List */}
      {experience.length > 0 && !isAdding && (
        <div className="space-y-3">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={() => handleEdit(exp)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.role}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {exp.company}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  {exp.responsibilities.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {exp.responsibilities.slice(0, 2).map((resp, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span className="line-clamp-1">{resp}</span>
                        </li>
                      ))}
                      {exp.responsibilities.length > 2 && (
                        <li className="text-xs text-gray-400">
                          +{exp.responsibilities.length - 2} more
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(exp.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Google"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Mountain View, CA"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities & Achievements</label>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    placeholder={`Responsibility ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addResponsibility}
              className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Responsibility
            </button>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary py-2 text-sm">
              {editingId ? 'Update' : 'Add'} Experience
            </button>
            <button type="button" onClick={handleCancel} className="btn-secondary py-2 text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
