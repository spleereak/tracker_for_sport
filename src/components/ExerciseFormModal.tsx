import React from 'react';
import { Plus, X, ChevronRight, Edit2 } from 'lucide-react';
import { Exercise } from '../store/exercise/types';

interface ExerciseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
  onExerciseChange: (exercise: Exercise) => void;
  errors: { [key: string]: string };
  onSave: () => void;
  onUpdate?: (exercise: Exercise) => void;
  mode?: 'create' | 'edit';
}

export const ExerciseFormModal: React.FC<ExerciseFormModalProps> = ({
  isOpen,
  onClose,
  exercise,
  onExerciseChange,
  errors,
  onSave,
  onUpdate,
  mode = 'create'
}) => {
  if (!isOpen) return null;

  const handleSaveOrUpdate = () => {
    if (mode === 'edit' && onUpdate) {
      onUpdate(exercise);
    } else {
      onSave();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-4 relative flex flex-col max-h-[calc(100vh-2rem)]">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white">{mode === 'create' ? 'Новое упражнение' : 'Редактирование упражнения'}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Название</label>
            <input
              type="text"
              placeholder="Например: Приседания с собственным весом"
              className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
                errors.name ? 'border-rose-300 focus:ring-rose-200' : 'border-gray-200 focus:ring-blue-200'
              } focus:border-blue-500 focus:ring-2 outline-none transition-all`}
              value={exercise.name}
              onChange={(e) => onExerciseChange({ ...exercise, name: e.target.value })}
            />
            {errors.name && <p className="text-rose-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Описание</label>
            <textarea
              placeholder="Опишите технику выполнения упражнения..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
                errors.description ? 'border-rose-300 focus:ring-rose-200' : 'border-gray-200 focus:ring-blue-200'
              } focus:border-blue-500 focus:ring-2 outline-none transition-all resize-none`}
              value={exercise.description}
              onChange={(e) => onExerciseChange({ ...exercise, description: e.target.value })}
            />
            {errors.description && <p className="text-rose-500 text-sm">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Инструкция</label>
            <textarea
              placeholder="Опишите пошаговую инструкцию выполнения..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
                errors.instruction ? 'border-rose-300 focus:ring-rose-200' : 'border-gray-200 focus:ring-blue-200'
              } focus:border-blue-500 focus:ring-2 outline-none transition-all resize-none`}
              value={exercise.instruction}
              onChange={(e) => onExerciseChange({ ...exercise, instruction: e.target.value })}
            />
            {errors.instruction && <p className="text-rose-500 text-sm">{errors.instruction}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Ссылка на изображение</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
                errors.image ? 'border-rose-300 focus:ring-rose-200' : 'border-gray-200 focus:ring-blue-200'
              } focus:border-blue-500 focus:ring-2 outline-none transition-all`}
              value={exercise.image}
              onChange={(e) => onExerciseChange({ ...exercise, image: e.target.value })}
            />
            {errors.image && <p className="text-rose-500 text-sm">{errors.image}</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Сложность</label>
            <div className="flex gap-3 flex-wrap">
              {['Начинающий', 'Средний', 'Сложный'].map((level, i) => (
                <label
                  key={i}
                  className={`px-4 py-2 rounded-xl border cursor-pointer transition-all flex-1 text-center ${
                    exercise.difficulty === level
                      ? level === 'Начинающий' 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : level === 'Средний'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={exercise.difficulty === level}
                    onChange={() => onExerciseChange({ ...exercise, difficulty: level as Exercise['difficulty'] })}
                    className="hidden"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Тип подсчета</label>
            <div className="grid grid-cols-2 gap-3">
              {['Время', 'Повторения'].map((type, i) => (
                <label
                  key={i}
                  className={`px-4 py-2 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                    exercise.countType === type
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    checked={exercise.countType === type}
                    onChange={() => onExerciseChange({ ...exercise, countType: type as Exercise['countType'] })}
                    className="hidden"
                  />
                  {exercise.countType === type && <ChevronRight className="w-4 h-4" />}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {exercise.countType && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {exercise.countType.charAt(0).toUpperCase() + exercise.countType.slice(1)}
              </label>
              <input
                type='number'
                placeholder={exercise.countType === 'Время' as Exercise['countType'] ? 'Мин' : 'Кол-во'}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-blue-200 focus:border-blue-500 focus:ring-2 outline-none transition-all"
                value={exercise.countType === 'Время' ? exercise.duration! > 0 ? exercise.duration : '' : exercise.reps! > 0 ? exercise.reps : ''}
                defaultValue=''
                onChange={(e) => onExerciseChange({
                  ...exercise,
                  duration: exercise.countType === 'Время' ? Number(e.target.value) : exercise.duration,
                  reps: exercise.countType === 'Повторения' ? Number(e.target.value) : exercise.reps
                })}
              />
              {exercise.countType === 'Время' && errors.duration && (
                <p className="text-rose-500 text-sm">{errors.duration}</p>
              )}
              {exercise.countType === 'Повторения' && errors.reps && (
                <p className="text-rose-500 text-sm">{errors.reps}</p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Теги</label>
            <div className="flex flex-wrap gap-2">
              {['Ноги', 'Руки', 'Спина', 'Грудь', 'Корпус', 'Кардио'].map((tag, i) => (
                <label
                  key={i}
                  className={`px-4 py-2 rounded-full cursor-pointer transition-all border ${
                    exercise.tags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={exercise.tags.includes(tag)}
                    onChange={(e) => {
                      const newTags = e.target.checked
                        ? [...exercise.tags, tag]
                        : exercise.tags.filter(t => t !== tag);
                      onExerciseChange({ ...exercise, tags: newTags });
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
            {errors.tags && <p className="text-rose-500 text-sm">{errors.tags}</p>}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-between gap-3 bg-white rounded-b-2xl sticky bottom-0 z-10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSaveOrUpdate}
            className="px-6 py-2.5 text-sm cursor-pointer font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-colors flex items-center gap-2"
          >
            {mode === 'create' ? <Plus size={20} /> : <Edit2 size={20} />}
            {mode === 'create' ? 'Создать' : 'Изменить'}
          </button>
        </div>
      </div>
    </div>
  );
};
