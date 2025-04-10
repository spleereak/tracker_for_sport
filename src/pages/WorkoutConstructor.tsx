import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/workout/slice';
import { Workout } from '../store/workout/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useSaveWorkout } from '../hooks/useSaveWorkout';
import { Clock, Repeat, Tag, ChevronRight, Dumbbell, Wand2, AlertTriangle } from 'lucide-react';
import { Exercise } from '@/store/exercise/types';
import { DIFFICULTY_COLORS, MAX_DURATION, MAX_REPS, TAGS_LIST } from '@/constants/workoutConstructorConstants';

interface ExerciseSettings {
  type: string;
  duration?: number;
  reps?: number;
  warning?: string;
}

const WorkoutConstructor = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const exercisesList = useSelector((state: RootState) => state.exercises.exercises);
  const dispatch = useDispatch();

  const [selectionMode, setSelectionMode] = useState<'manual' | 'auto'>('manual');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [exerciseSettings, setExerciseSettings] = useState<{ [key: number]: ExerciseSettings }>({});
  const [warnings, setWarnings] = useState<{ [key: number]: string }>({});

  const [newWorkout, setNewWorkout] = useState<Workout>(() => {
    const savedWorkout = localStorage.getItem('newWorkout');
    return savedWorkout ? JSON.parse(savedWorkout) : {
      id: Date.now(),
      name: '',
      description: '',
      exercises: [],
      difficulty: 'Простая',
      equipmentRequired: [],
      tags: [],
      fromUser: true
    };
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectionMode === 'auto' && selectedTags.length > 0) {
      const matchingExercises = exercisesList.filter(exercise =>
          exercise.tags.some(tag => selectedTags.includes(tag.toLowerCase()))
      );

      const selectedExercises = matchingExercises.slice(0, 6);

      setNewWorkout(prev => ({
        ...prev,
        exercises: selectedExercises,
        tags: selectedTags
      }));

      const newSettings: any = {};
      selectedExercises.forEach(exercise => {
        newSettings[exercise.id] = calculateRecommendedValue(exercise);
      });
      setExerciseSettings(newSettings);
    }
  }, [selectedTags, selectionMode]);

  const calculateRecommendedValue = (exercise: Exercise): ExerciseSettings => {
    let type = exercise.countType;
    let value = 0;

    if (type === 'Время') {
      value = Math.min(30, exercise.duration || 20);
      return { type: 'Время', duration: value };
    } else if (type === 'Повторения') {
      value = Math.min(15, exercise.reps || 12);
      return { type: 'Повторения', reps: value };
    }

    return { type: 'Повторения', reps: 12 };
  };

  const checkExerciseLoad = (exerciseId: number, type: string, value: number) => {
    const exercise = exercisesList.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    let warning = '';

    if (type === 'Повторения' && value > MAX_REPS) {
      warning = `Слишком много повторений! Рекомендуется не более ${MAX_REPS}`;
    } else if (type === 'Время' && value > MAX_DURATION) {
      warning = `Слишком большая длительность! Рекомендуется не более ${MAX_DURATION} минут`;
    }

    return warning;
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newWorkout.name.trim()) newErrors.name = 'Введите название';
    if (!newWorkout.description.trim()) newErrors.description = 'Введите описание';
    if (newWorkout.exercises.length === 0) newErrors.exercises = 'Добавьте хотя бы одно упражнение';
    if (newWorkout.exercises.length > 10) newErrors.exercises = 'Слишком много упражнений для одной тренировки';
    if (Object.keys(warnings).length > 0) newErrors.load = 'Исправьте предупреждения о высокой нагрузке';
    if (newWorkout.tags.length === 0) newErrors.tags = 'Добавьте хотя бы один тег';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveWorkout = useSaveWorkout();

  const handleAddWorkout = () => {
    if (!validateForm()) return;
    const workoutToAdd = {
      ...newWorkout,
      tags: Array.from(new Set([...newWorkout.tags, ...selectedTags]))
    };

    const exists = workouts.some(ex => ex.id === workoutToAdd.id);
    if (exists) return;

    dispatch(addWorkout(workoutToAdd));
    saveWorkout(workoutToAdd);
    setNewWorkout({
      id: Date.now(),
      name: '',
      description: '',
      exercises: [],
      difficulty: 'Начинающий',
      tags: [],
      fromUser: true
    });
    setSelectedTags([]);
    setExerciseSettings({});
    setWarnings({});
  };

  return (
      <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Создание тренировки</h1>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <input
                  type="text"
                  placeholder="Название тренировки"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
              />
              {errors.name && <p className="text-rose-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
            <textarea
                placeholder="Описание тренировки"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[100px] sm:min-h-[120px]"
                value={newWorkout.description}
                onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
            />
              {errors.description && <p className="text-rose-500 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Сложность</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['Начинающий', 'Средний', 'Сложный'].map((level) => (
                    <label
                        key={level}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border cursor-pointer transition-all text-sm sm:text-base
                    ${newWorkout.difficulty === level
                            ? DIFFICULTY_COLORS[level]
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                    >
                      <input
                          type="radio"
                          name="difficulty"
                          value={level}
                          checked={newWorkout.difficulty === level}
                          onChange={() => setNewWorkout({ ...newWorkout, difficulty: level as Workout['difficulty'] })}
                          className="hidden"
                      />
                      {level}
                    </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
              <button
                  onClick={() => setSelectionMode('manual')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base ${
                      selectionMode === 'manual'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
              >
                Ручной выбор
              </button>
              <button
                  onClick={() => setSelectionMode('auto')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm sm:text-base ${
                      selectionMode === 'auto'
                          ? 'bg-gradient-to-r from-blue-100 to-purple-200 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
              >
                <Wand2 className="w-3 h-3 sm:w-4 sm:h-4" />
                Автоподбор
              </button>
            </div>

            {selectionMode === 'auto' && (
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Выберите цели тренировки</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TAGS_LIST.map((tag) => (
                        <label
                            key={tag}
                            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full cursor-pointer transition-all border text-xs sm:text-sm
                      ${selectedTags.includes(tag)
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                        >
                          <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={(e) => {
                                setSelectedTags(prev =>
                                    e.target.checked
                                        ? [...prev, tag]
                                        : prev.filter(t => t !== tag)
                                );
                              }}
                              className="hidden"
                          />
                          <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                          {tag}
                        </label>
                    ))}
                  </div>
                </div>
            )}

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Упражнения</h3>
              <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto space-y-2 rounded-lg sm:rounded-xl border border-gray-200 p-2 sm:p-4 bg-gray-50">
                {(selectionMode === 'manual' ? exercisesList : newWorkout.exercises).map((exercise, i) => (
                    <div key={i} className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-sm transition-all">
                      <label className="flex items-center gap-2 sm:gap-3 flex-1 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={newWorkout.exercises.some(e => e.id === exercise.id)}
                            onChange={(e) => {
                              const updatedExercises = e.target.checked
                                  ? [...newWorkout.exercises, { ...exercise, duration: exercise.duration, reps: exercise.reps }]
                                  : newWorkout.exercises.filter(ex => ex.id !== exercise.id);
                              setNewWorkout({ ...newWorkout, exercises: updatedExercises });
                            }}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{exercise.name}</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        {exercise.countType === 'Время' && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              <input
                                  type="number"
                                  value={exercise.countType === 'Время' ? exerciseSettings[exercise.id]?.duration : ''}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value) || 0;
                                    const warning = checkExerciseLoad(exercise.id, 'Время', value);
                                    setExerciseSettings(prev => ({
                                      ...prev,
                                      [exercise.id]: { type: 'Время', duration: value, warning }
                                    }));
                                  }}
                                  className="w-16 sm:w-20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                              />
                              <span className="text-xs sm:text-sm text-gray-500">мин</span>
                            </div>
                        )}

                        {exercise.countType === 'Повторения' && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Repeat className="w-3 h-3 sm:w-4 sm:h-4" />
                              <input
                                  type="number"
                                  value={exercise.countType === 'Повторения' ? exerciseSettings[exercise.id]?.reps : ''}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value) || 0;
                                    const warning = checkExerciseLoad(exercise.id, 'Повторения', value);
                                    setExerciseSettings(prev => ({
                                      ...prev,
                                      [exercise.id]: { type: 'Повторения', reps:value, warning }
                                    }));
                                  }}
                                  className="w-16 sm:w-20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                              />
                              <span className="text-xs sm:text-sm text-gray-500">повт</span>
                            </div>
                        )}
                      </div>
                      {exerciseSettings[exercise.id]?.warning && (
                          <div className="w-full mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 text-amber-600 bg-amber-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{exerciseSettings[exercise.id].warning}</span>
                          </div>
                      )}
                    </div>
                ))}
              </div>
              {errors.exercises && <p className="text-rose-500 text-sm">{errors.exercises}</p>}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Теги</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {TAGS_LIST.map((tag) => (
                    <label
                        key={tag}
                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full cursor-pointer transition-all border text-xs sm:text-sm
                    ${newWorkout.tags.includes(tag)
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                    >
                      <input
                          type="checkbox"
                          checked={newWorkout.tags.includes(tag)}
                          onChange={(e) => {
                            const updatedTags = e.target.checked
                                ? [...newWorkout.tags, tag]
                                : newWorkout.tags.filter(t => t !== tag);
                            setNewWorkout({ ...newWorkout, tags: updatedTags });
                          }}
                          className="hidden"
                      />
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                      {tag}
                    </label>
                ))}
              </div>
              {errors.tags && <p className="text-rose-500 text-sm">{errors.tags}</p>}
            </div>

            <div className="block w-full pt-2">
              <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold
              hover:from-blue-600 hover:to-blue-700 transition-colors duration-400 flex items-center justify-center gap-1 sm:gap-2 shadow-md sm:shadow-lg shadow-blue-200 text-sm sm:text-base"
                  onClick={handleAddWorkout}
              >
                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
                Создать тренировку
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default WorkoutConstructor;