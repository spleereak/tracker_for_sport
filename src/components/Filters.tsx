import React from 'react';
import { ActiveFilters } from './ActiveFilters';
import { DIFFICULTY_LEVELS, DifficultyLevel, EQUIPMENT_TYPES, EquipmentType, EXERCISE_TAGS, ExerciseTag } from '../constants/exerciseItems';

export interface IFilters {
  difficulty: DifficultyLevel[];
  equipment: EquipmentType[];
  tags: ExerciseTag[];
}

interface FiltersProps {
  isOpen: boolean;
  filters: IFilters;
  onFilterChange: (newFilters: IFilters) => void;
}

export const Filters: React.FC<FiltersProps> = ({ isOpen, filters, onFilterChange }) => {

  return (
    <div className="w-full">
      <div className={`
        mt-4 transition-all duration-200 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'}
      `}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Сложность</h3>
              <div className="space-y-3">
                {DIFFICULTY_LEVELS.map((level) => (
                  <label key={level} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        checked={filters.difficulty.includes(level)}
                        onChange={(e) => {
                          const newDifficulty = e.target.checked
                            ? [...filters.difficulty, level]
                            : filters.difficulty.filter(d => d !== level);
                          onFilterChange({ ...filters, difficulty: newDifficulty });
                        }}
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-purple-500 peer-checked:bg-purple-500 group-hover:border-purple-400" />
                      <div className="absolute w-2 h-2 rounded-sm left-1.5 top-1.5 transition-colors peer-checked:bg-white" />
                    </div>
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Оборудование</h3>
              <div className="space-y-3">
                {EQUIPMENT_TYPES.map((equipment) => (
                  <label key={equipment} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        checked={filters.equipment.includes(equipment)}
                        onChange={(e) => {
                          const newEquipment = e.target.checked
                            ? [...filters.equipment, equipment]
                            : filters.equipment.filter(eq => eq !== equipment);
                          onFilterChange({ ...filters, equipment: newEquipment });
                        }}
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-purple-500 peer-checked:bg-purple-500 group-hover:border-purple-400" />
                      <div className="absolute w-2 h-2 rounded-sm left-1.5 top-1.5 transition-colors peer-checked:bg-white" />
                    </div>
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                      {equipment}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Теги</h3>
              <div className="space-y-3">
                {EXERCISE_TAGS.map((tag) => (
                  <label key={tag} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        checked={filters.tags.includes(tag)}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...filters.tags, tag]
                            : filters.tags.filter(t => t !== tag);
                          onFilterChange({ ...filters, tags: newTags });
                        }}
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-purple-500 peer-checked:bg-purple-500 group-hover:border-purple-400" />
                      <div className="absolute w-2 h-2 rounded-sm left-1.5 top-1.5 transition-colors peer-checked:bg-white" />
                    </div>
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                      {tag}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <ActiveFilters
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;