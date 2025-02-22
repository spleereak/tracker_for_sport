import React from 'react';
import { Filter, Plus, ChevronDown, Edit2, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Exercise } from '../store/exercise/types';
import { useSaveExercise } from '../hooks/useSaveExercise';
import { useDispatch } from 'react-redux';
import { addExercise } from '../store/exercise/slice';
import { Filters, IFilters } from '../components/Filters';
import { ExerciseFormModal } from '../components/ExerciseFormModal';
import { useDeleteExercise } from '@/hooks/useDeleteExercise';
import { ExerciseFullModal } from '@/components/ExerciseFullModal';
import { useUpdateExercise } from '@/hooks/useUpdateExercise';
import { EquipmentType, ExerciseTag } from '@/constants/exerciseItems';

const initialFilters: IFilters = {
  difficulty: [],
  equipment: [],
  tags: []
}

function ExerciseCatalog() {
  const dispatch = useDispatch();
  const exercises = useSelector((state: RootState) => state.exercises.exercises);
  const [exerciseModalOpen, setExerciseModalOpen] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<IFilters>(initialFilters);
  const [newExercise, setNewExercise] = React.useState<Exercise>({
    id: Date.now(),
    name: '',
    description: '',
    instruction: '',
    image: '',
    difficulty: 'Начинающий',
    equipment: [],
    tags: [],
    hasWeight: false,
    countType: 'Время'
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const filteredExercises = exercises.filter(exercise => {
  
  if (filters.difficulty.length > 0 && !filters.difficulty.includes(exercise.difficulty)) {
    return false;
  }
  
  if (filters.equipment.length > 0 && !exercise.equipment.some(eq => filters.equipment.includes(eq as EquipmentType))) {
    return false;
  }
  
  if (filters.tags.length > 0 && !exercise.tags.some(tag => filters.tags.includes(tag as ExerciseTag))) {
    return false;
  }
  
  return true;
});

  React.useEffect(() => {
    if (isModalOpen || exerciseModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen, exerciseModalOpen]) 

  const validateAddForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newExercise.name.trim()) newErrors.name = 'Введите название';
    if (!newExercise.description.trim()) newErrors.description = 'Введите описание';
    if (!newExercise.instruction.trim()) newErrors.instruction = 'Введите инструкцию';
    if (!newExercise.image.trim()) newErrors.image = 'Введите URL изображения/видео';
    if (newExercise.countType === 'Время' && !newExercise.duration) newErrors.duration = 'Введите кол-во минут на выполнение';
    if ( newExercise.countType === 'Повторения' && !newExercise.reps) newErrors.reps = 'Введите кол-во повторений на выполнение';
    if (newExercise.hasWeight && !newExercise.weight) newErrors.weight = 'Введите вес оборудования';
    if (newExercise.tags.length === 0) newErrors.tags = 'Необходимо выбрать хотя бы один тег';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const validateUpdateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!selectedExercise?.name.trim()) newErrors.name = 'Введите название';
    if (!selectedExercise?.description.trim()) newErrors.description = 'Введите описание';
    if (!selectedExercise?.instruction.trim()) newErrors.instruction = 'Введите инструкцию';
    if (!selectedExercise?.image.trim()) newErrors.image = 'Введите URL изображения/видео';
    
    if (selectedExercise?.countType === 'Время' && !selectedExercise?.duration) {
      newErrors.duration = 'Введите кол-во минут на выполнение';
    }
    if (selectedExercise?.countType === 'Повторения' && !selectedExercise?.reps) {
      newErrors.reps = 'Введите кол-во повторений на выполнение';
    }
    if (selectedExercise?.hasWeight && !selectedExercise.weight) {
      newErrors.weight = 'Введите вес оборудования';
    }
    if (selectedExercise?.tags.length === 0) {
      newErrors.tags = 'Необходимо выбрать хотя бы один тег';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveExercise = useSaveExercise();
  const deleteExercise = useDeleteExercise();
  const updateExercise = useUpdateExercise();

  const handleAddExercise = () => {
    if (!validateAddForm()) return;
    const exerciseToAdd = {
      ...newExercise,
      equipment: newExercise.equipment.length > 0 ? newExercise.equipment : ['Ничего']
    };


    const exists = exercises.some(ex => ex.id === exerciseToAdd.id);
    if (exists) return;

    dispatch(addExercise(exerciseToAdd));
    saveExercise(exerciseToAdd);
    setNewExercise({ id: Date.now(), name: '', description: '', instruction: '', image: '', difficulty: 'Начинающий', equipment: [], tags: [], hasWeight: false, countType: 'Время' });
    setIsModalOpen(false);
  }

  const handleUpdateExercise = (exercise: Exercise) => {
    if (!validateUpdateForm()) return;

    updateExercise(exercise);
    handleOnClose();
  }

  const handleDeleteExercise = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setExerciseModalOpen(false);
    deleteExercise(id);
  }

  const handleClickUpdateExercise = (e: React.MouseEvent, exercise: Exercise) => {
    e.stopPropagation();
    setExerciseModalOpen(false);
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  }

  const handleClickExerciseCard = (exercise: Exercise) => {
    setExerciseModalOpen(true);
    setSelectedExercise(exercise);
  }

  const handleOnClose = () => {
    setIsModalOpen(false);
    setExerciseModalOpen(false);
    setSelectedExercise(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Каталог упражнений</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredExercises.length} упражнений
                </p>
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={20} /> Добавить
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 
              rounded-xl transition-colors cursor-pointer"
            >
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-700">Фильтры</span>
              <ChevronDown 
                size={16} 
                className={`text-gray-500 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>

          {isFiltersOpen && (
            <Filters
              isOpen={isFiltersOpen}
              filters={filters}
              onFilterChange={setFilters}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 
                         cursor-pointer group"
              onClick={() => handleClickExerciseCard(exercise)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white 
                                 transition-colors"
                      onClick={(e) => handleClickUpdateExercise(e, exercise)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white 
                                 transition-colors"
                      onClick={(e) => handleDeleteExercise(e, exercise.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {exercise.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {exercise.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-xl text-xs font-medium ${
                    exercise.difficulty === 'Средний' ?
                      'bg-yellow-50 text-yellow-600'
                    : exercise.difficulty === 'Начинающий' ?
                      'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                  }`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    {exercise.equipment.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ExerciseFormModal
          isOpen={isModalOpen}
          onClose={handleOnClose}
          exercise={selectedExercise || newExercise}
          onExerciseChange={selectedExercise ? setSelectedExercise : setNewExercise}
          errors={errors}
          onSave={handleAddExercise}
          onUpdate={handleUpdateExercise}
          mode={selectedExercise ? 'edit' : 'create'}
        />
      )}
      
      {exerciseModalOpen && selectedExercise && (
        <ExerciseFullModal
          exercise={selectedExercise}
          setExerciseModalOpen={setExerciseModalOpen}
          handleUpdate={handleClickUpdateExercise}
          handleDelete={handleDeleteExercise}
          onClose={handleOnClose}
        />
      )}
    </div>
  )
}

export default ExerciseCatalog;
