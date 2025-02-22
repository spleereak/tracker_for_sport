import { Exercise } from '@/store/exercise/types';
import { Clock, Dumbbell, Edit2, Hash, Tag, Trash2, Weight, X } from 'lucide-react';
import React from 'react';

interface Props {
  exercise: Exercise;
  setExerciseModalOpen: (param: boolean) => void;
  handleUpdate: (e: React.MouseEvent, exercise: Exercise) => void;
  handleDelete: (e: React.MouseEvent, id: number) => void;
  onClose: () => void;
}

export const ExerciseFullModal: React.FC<Props> = ({
  exercise,
  setExerciseModalOpen,
  handleUpdate,
  handleDelete,
  onClose
}) => {
  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'Начинающий':
        return 'bg-green-100 text-green-800';
      case 'Средний':
        return 'bg-yellow-100 text-yellow-800';
      case 'Сложный':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div 
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={() => onClose()}
      />
      
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2" />
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className='rounded-full p-1 hover:bg-gray-100 transition-colors'
                onClick={(e) => handleUpdate(e, exercise)}
              >
                <Edit2 className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
              <button
                className='rounded-full p-1 hover:bg-gray-100 transition-colors'
                onClick={(e) => handleDelete(e, exercise.id)}
              >
                <Trash2 className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
              <button 
                onClick={() => setExerciseModalOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="relative h-64 lg:h-128 w-full">
            <img 
              src={exercise.image} 
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-6">
              {exercise.reps && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Hash className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Повторения</p>
                    <p className="font-semibold">{exercise.reps}</p>
                  </div>
                </div>
              )}
              {exercise.duration && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Длительность</p>
                    <p className="font-semibold">{exercise.duration} мин.</p>
                  </div>
                </div>
              )}
              {exercise.weight && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Weight className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Вес</p>
                    <p className="font-semibold">{exercise.weight} кг</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Описание</h3>
              <p className="text-gray-600">{exercise.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Как выполнять</h3>
              <p className="text-gray-600 whitespace-pre-line">{exercise.instruction}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Необходимое оборудование
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.equipment.map((item) => (
                  <span 
                    key={item}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Теги
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};