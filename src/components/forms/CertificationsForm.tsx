import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Award, Plus, X, Calendar, Link2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { certifications } = resumeData;
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCertification(editingId, formData);
      setEditingId(null);
    } else {
      addCertification({ ...formData, id: uuidv4() });
    }
    setIsAdding(false);
    setFormData({
      name: '',
      issuer: '',
      date: '',
      url: '',
    });
  };

  const handleEdit = (cert: typeof certifications[0]) => {
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      url: cert.url,
    });
    setEditingId(cert.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      issuer: '',
      date: '',
      url: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Certifications & Achievements</h3>
            <p className="text-sm text-gray-500">Add your certifications and notable achievements</p>
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        )}
      </div>

      {/* Certifications List */}
      {certifications.length > 0 && !isAdding && (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={() => handleEdit(cert)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {cert.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </span>
                    )}
                    {cert.url && (
                      <span className="flex items-center gap-1 text-blue-600">
                        <Link2 className="w-3 h-3" />
                        Credential URL
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCertification(cert.id);
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AWS Certified Solutions Architect"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g., Amazon Web Services"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Earned</label>
              <input
                type="month"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://www.credential.net/..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary py-2 text-sm">
              {editingId ? 'Update' : 'Add'} Certification
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
