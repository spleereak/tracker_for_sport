import React from 'react';
import { Clock, Dumbbell, Tag, Trash2, X } from 'lucide-react';
import { Workout } from '@/store/workout/types';
import { Exercise } from '@/store/exercise/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  workout: Workout;
  setWorkoutModalOpen: (param: boolean) => void;
  handleDelete: (e: React.MouseEvent, id: number) => void;
}

export const WorkoutFullModal: React.FC<Props> = ({ 
  workout, 
  setWorkoutModalOpen,
  handleDelete
}) => {
  const getDifficultyColor = (difficulty: Workout['difficulty']) => {
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

  const getTotalDuration = (exercises: Exercise[]) => {
    return exercises.reduce((total, exercise) => total + (exercise.duration || 0), 0);
  };

  const navigate = useNavigate()

  const startWorkout = (workoutId: number) => {
    navigate(`/workout/${workoutId}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div 
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={() => setWorkoutModalOpen(false)}
      />
      
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2" />
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{workout.name}</h2>
              <div className="flex gap-2 mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {getTotalDuration(workout.exercises)} мин
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                onClick={(e) => handleDelete(e, workout.id)}
              >
                <Trash2 className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
              <button 
                onClick={() => setWorkoutModalOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Описание</h3>
              <p className="text-gray-600">{workout.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Упражнения</h3>
              <div className="space-y-4">
                {workout.exercises.map((exercise, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full">
                      {i + 1}
                    </span>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {exercise.duration && (
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {exercise.duration} мин
                          </span>
                        )}
                        {exercise.reps && (
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                            {exercise.reps} повторений
                          </span>
                        )}
                        {exercise.weight && (
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                            {exercise.weight} кг
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Необходимое оборудование
              </h3>
              <div className="flex flex-wrap gap-2">
                {workout.equipmentRequired.map((item) => (
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
                {workout.tags.map((tag) => (
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
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors cursor-pointer"
            onClick={() => startWorkout(workout.id)}
          >
            Начать тренировку
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutFullModal;