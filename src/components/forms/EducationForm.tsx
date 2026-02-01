import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { GraduationCap, Plus, X, Calendar, MapPin, BookOpen } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    cgpa: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      addEducation({ ...formData, id: uuidv4() });
    }
    setIsAdding(false);
    setFormData({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      cgpa: '',
      location: '',
    });
  };

  const handleEdit = (edu: typeof education[0]) => {
    setFormData({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      cgpa: edu.cgpa,
      location: edu.location,
    });
    setEditingId(edu.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      cgpa: '',
      location: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Education</h3>
            <p className="text-sm text-gray-500">Add your academic background</p>
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        )}
      </div>

      {/* Education List */}
      {education.length > 0 && !isAdding && (
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={() => handleEdit(edu)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{edu.school}</h4>
                  <p className="text-sm text-gray-600">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    )}
                    {edu.cgpa && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEducation(edu.id);
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">School/University *</label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                placeholder="e.g., Harvard University"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g., Bachelor of Science"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA/Percentage</label>
              <input
                type="text"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                placeholder="e.g., 3.8/4.0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Boston, MA"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary py-2 text-sm">
              {editingId ? 'Update' : 'Add'} Education
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
