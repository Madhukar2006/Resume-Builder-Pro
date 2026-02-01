import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { FolderGit, Plus, X, Link2, Code2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
      setEditingId(null);
    } else {
      addProject({ ...formData, id: uuidv4() });
    }
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      techStack: '',
      githubUrl: '',
      liveUrl: '',
    });
  };

  const handleEdit = (project: typeof projects[0]) => {
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      techStack: '',
      githubUrl: '',
      liveUrl: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
            <FolderGit className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
            <p className="text-sm text-gray-500">Showcase your personal and professional projects</p>
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        )}
      </div>

      {/* Projects List */}
      {projects.length > 0 && !isAdding && (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={() => handleEdit(project)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{project.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                  {project.techStack && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Code2 className="w-3 h-3" />
                      <span>{project.techStack}</span>
                    </div>
                  )}
                  <div className="flex gap-3 mt-2">
                    {project.githubUrl && (
                      <span className="text-xs text-blue-600 flex items-center gap-1">
                        <Link2 className="w-3 h-3" />
                        GitHub
                      </span>
                    )}
                    {project.liveUrl && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Link2 className="w-3 h-3" />
                        Live Demo
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(project.id);
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., E-Commerce Platform"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project, its features, and your contributions..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="e.g., React, Node.js, MongoDB, Express"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://your-project.com"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary py-2 text-sm">
              {editingId ? 'Update' : 'Add'} Project
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
