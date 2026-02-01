import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Wrench, Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<typeof skillLevels[number]>('Intermediate');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({
        id: uuidv4(),
        name: newSkill.trim(),
        level: selectedLevel,
      });
      setNewSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Expert':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Wrench className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          <p className="text-sm text-gray-500">Add your technical and soft skills</p>
        </div>
      </div>

      {/* Add Skill */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., JavaScript, Project Management, Photoshop"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm"
            />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as typeof skillLevels[number])}
            className="px-4 py-2 border border-gray-200 rounded-lg input-focus text-sm bg-white"
          >
            {skillLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to quickly add skills. Select proficiency level for each skill.
        </p>
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${getSkillColor(
                skill.level
              )}`}
            >
              {skill.name}
              <span className="text-xs opacity-70">({skill.level})</span>
              <button
                onClick={() => removeSkill(skill.id)}
                className="ml-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Wrench className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No skills added yet. Start adding your skills above.</p>
        </div>
      )}
    </div>
  );
}
