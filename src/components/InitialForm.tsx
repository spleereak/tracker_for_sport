import { UserData } from '@/types/types';
import React, { useState } from 'react';
import { Ruler, Weight, Target } from 'lucide-react';

export const InitialForm: React.FC<{ onSubmit: (data: UserData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: 170,
    weight: 70,
    goal: 'maintain' as UserData['goal']
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      achievements: [],
      points: 0,
      workoutsCompleted: 0,
      customization: {
        clothes: null,
        accessories: null,
        hairstyle: null
      }
    });
  };

  const goals = [
    { value: 'maintain', label: 'Поддержание формы', description: 'Сохранение текущей формы и улучшение общего тонуса' },
    { value: 'gain', label: 'Набор массы', description: 'Увеличение мышечной массы и силовых показателей' },
    { value: 'lose', label: 'Снижение веса', description: 'Снижение процента жира и улучшение рельефа' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Создайте своего персонажа</h2>
          <p className="text-gray-600 mt-2">Заполните данные для персонализации тренировок</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <div className={`transition-all duration-200 ${activeField === 'height' ? 'scale-[1.02]' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <Ruler className="w-5 h-5 text-blue-500" />
                <label className="block text-gray-700 font-medium">Рост</label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: Number(e.target.value) }))}
                  onFocus={() => setActiveField('height')}
                  onBlur={() => setActiveField(null)}
                  className="w-full p-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 
                           focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  min="120"
                  max="220"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">см</span>
              </div>
            </div>

            <div className={`transition-all duration-200 ${activeField === 'weight' ? 'scale-[1.02]' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <Weight className="w-5 h-5 text-green-500" />
                <label className="block text-gray-700 font-medium">Вес</label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  onFocus={() => setActiveField('weight')}
                  onBlur={() => setActiveField(null)}
                  className="w-full p-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 
                           focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  min="30"
                  max="200"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">кг</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-purple-500" />
                <label className="block text-gray-700 font-medium">Цель тренировок</label>
              </div>
              <div className="grid gap-3">
                {goals.map((goal) => (
                  <label
                    key={goal.value}
                    className={`relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-200
                              ${formData.goal === goal.value 
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={goal.value}
                      checked={formData.goal === goal.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value as UserData['goal'] }))}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{goal.label}</div>
                      <div className="text-sm text-gray-500 mt-1">{goal.description}</div>
                    </div>
                    <div 
                      className={`w-6 h-6 rounded-full border-2 ml-auto flex items-center justify-center transition-all
                                ${formData.goal === goal.value 
                                  ? 'border-purple-500 bg-purple-500' 
                                  : 'border-gray-300 bg-white'}`}
                    >
                      {formData.goal === goal.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl 
                       font-medium hover:from-blue-600 hover:to-purple-600 transform transition-all duration-200 
                       hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 
                       focus:ring-purple-300"
            >
              Создать персонажа
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitialForm;