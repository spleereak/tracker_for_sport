import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LinkButton } from '@/components/LinkButton';
import { Workout } from '@/store/workout/types';
import WorkoutFullModal from '@/components/WorkoutFullModal';
import { useDeleteWorkout } from '@/hooks/useDeleteWorkout';
import { ChevronDown, Filter, Trash2 } from 'lucide-react';
import Filters, { IFilters } from '@/components/Filters';
import { DifficultyLevel, ExerciseTag } from '@/constants/exerciseItems';

const initialFilters: IFilters = {
  difficulty: [],
  equipment: [],
  tags: []
}

function WorkoutCatalog() {
  const workouts = useSelector((state: RootState) => state.workouts.workouts);

  const [workoutModalOpen, setWorkoutModalOpen] = React.useState(false);
  const [selectedWorkout, setSelectedWorkout] = React.useState<Workout | null>(null);

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<IFilters>(initialFilters);

  const filteredWorkouts = workouts.filter(workout => {

    if (filters.difficulty.length > 0 && !filters.difficulty.includes(workout.difficulty as DifficultyLevel)) {
      return false;
    }
    
    return !(filters.tags.length > 0 && !workout.tags.some(tag => filters.tags.includes(tag as ExerciseTag)));
    

  });

  const deleteWorkout = useDeleteWorkout();

  const handleDeleteWorkout = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setWorkoutModalOpen(false);
    deleteWorkout(id);
  }

  React.useEffect(() => {
    if (workoutModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [workoutModalOpen]);

  const handleClickWorkoutCard = (workout: Workout) => {
    setWorkoutModalOpen(true);
    setSelectedWorkout(workout);
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className='max-w-7xl mx-auto'>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Каталог тренировок</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {workouts.length} тренировок
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="bg-white flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100
                        rounded-xl transition-colors"
            >
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-700">Фильтры</span>
              <ChevronDown
                size={16}
                className={`text-gray-500 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <LinkButton
                path='/constructor'
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600
                hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
            />
          </div>

          {isFiltersOpen && (
            <Filters
              isOpen={isFiltersOpen}
              filters={filters}
              onFilterChange={setFilters}
            />
          )}
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout, i) => (
              <div
                key={i}
                className="bg-white rounded-xl cursor-pointer shadow-sm hover:shadow-lg hover:scale-105 transition-all overflow-hidden group flex flex-col h-full"
                onClick={() => handleClickWorkoutCard(workout)}
              >
                <div className="mt-auto p-4 flex flex-col flex-grow">
                  <div className='flex items-center justify-between'>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>
                    {workout.fromUser && (
                      <div className='flex gap-2'>
                        <button
                          className='rounded-full p-1.5 hover:bg-gray-100 transition-colors'
                          onClick={(e) => handleDeleteWorkout(e, workout.id)}
                        >
                          <Trash2 size={20} className="text-gray-500 cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{workout.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workout.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      workout.difficulty === 'Средний' ? 'bg-yellow-50 text-yellow-700' : 
                      workout.difficulty === 'Начинающий' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {workoutModalOpen && selectedWorkout && (
        <WorkoutFullModal
          workout={selectedWorkout}
          setWorkoutModalOpen={setWorkoutModalOpen}
          handleDelete={handleDeleteWorkout}
        />
      )}
      </>
  );
}

export default WorkoutCatalog;
