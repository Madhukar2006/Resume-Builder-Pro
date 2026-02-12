import { useResume } from '@/context/ResumeContext';
import { Palette, Type, Layout, Sparkles, Check } from 'lucide-react';
import { fontOptions, colorThemeOptions } from '@/types/resume';
import type { TemplateCategory } from '@/types/resume';
import { useState } from 'react';

const categories: { id: TemplateCategory; name: string }[] = [
  { id: 'all', name: 'All Templates' },
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'creative', name: 'Creative' },
  { id: 'professional', name: 'Professional' },
];

export function DesignSettingsForm() {
  const { resumeData, setTemplate, setFont, setColorTheme, allTemplates, getTemplatesByCategory } = useResume();
  const { template, font, colorTheme } = resumeData;
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const filteredTemplates = getTemplatesByCategory(selectedCategory);
  const displayedTemplates = showAllTemplates ? filteredTemplates : filteredTemplates.slice(0, 12);

  const currentTemplate = allTemplates.find(t => t.id === template);

  return (
    <div className="space-y-8">
      {/* Current Selection Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">Current Selection</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-blue-200">
            Template: {currentTemplate?.name || 'Modern'}
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-blue-200">
            Font: {fontOptions.find(f => f.id === font)?.name || 'Inter'}
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-blue-200 capitalize">
            Color: {colorTheme}
          </span>
        </div>
      </div>

      {/* Template Selection */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Layout className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Choose Template</h3>
            <p className="text-sm text-gray-500">Select from 100+ professional designs</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowAllTemplates(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto p-2">
          {displayedTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`relative p-3 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                template === t.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {/* Template Preview */}
              <div className={`h-16 rounded-lg bg-gradient-to-br ${t.color} mb-2 opacity-80`} />
              <p className="font-medium text-sm text-gray-900 truncate">{t.name}</p>
              <p className="text-xs text-gray-500 truncate">{t.description}</p>
              
              {/* Badges */}
              <div className="flex gap-1 mt-1">
                {t.popular && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                    Popular
                  </span>
                )}
                {t.new && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Selected Indicator */}
              {template === t.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Show More/Less */}
        {filteredTemplates.length > 12 && (
          <button
            onClick={() => setShowAllTemplates(!showAllTemplates)}
            className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAllTemplates ? 'Show Less' : `Show All ${filteredTemplates.length} Templates`}
          </button>
        )}
      </div>

      {/* Font Selection */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Type className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Choose Font</h3>
            <p className="text-sm text-gray-500">Select your preferred typography</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {fontOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setFont(f.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all hover:scale-[1.02] ${
                font === f.id
                  ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/20'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <p 
                className="font-medium text-lg mb-1"
                style={{ fontFamily: f.id === 'playfair' ? 'serif' : f.id === 'merriweather' ? 'serif' : 'sans-serif' }}
              >
                Aa
              </p>
              <p className="text-sm text-gray-700">{f.name}</p>
              <p className="text-xs text-gray-400">{f.category}</p>
              {font === f.id && (
                <div className="mt-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Color Theme Selection */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Choose Color Theme</h3>
            <p className="text-sm text-gray-500">Pick your accent color</p>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {colorThemeOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => setColorTheme(c.id)}
              className={`relative aspect-square rounded-xl transition-all hover:scale-110 ${
                colorTheme === c.id ? 'ring-4 ring-offset-2 ring-gray-300 scale-110' : ''
              }`}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${c.gradient}`} />
              {colorTheme === c.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
