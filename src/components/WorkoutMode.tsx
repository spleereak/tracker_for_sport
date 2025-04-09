import { useWorkout } from '@/hooks/useWorkout';
import React from 'react';
import { useParams } from 'react-router-dom';

export const WorkoutMode = () => {
  const { workoutId } = useParams();
  const { workout } = useWorkout(Number(workoutId));

  const [isStarted, setIsStarted] = React.useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
  const [isResting, setIsResting] = React.useState(false);
  const [restTime, setRestTime] = React.useState(60);
  const [timer, setTimer] = React.useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = React.useState(false);
  const [statistics, setStatistics] = React.useState({
    totalTime: 0,
    completedExercises: 0,
    skippedExercises: 0,
    totalReps: 0,
    pointsEarned: 0,
  });
  const [startTime, setStartTime] = React.useState(0);

  const currentExercise = workout?.exercises[currentExerciseIndex];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(prev => prev - 1);
      }, 1000);
    } else if (!isResting && currentExercise?.countType === 'Время' && !isWorkoutComplete) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting, restTime, currentExercise]);

  const startWorkout = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const adjustRestTime = (adjustment: number) => {
    setRestTime(prev => Math.max(0, prev + adjustment));
  };

  const completeExercise = () => {
    const newStats = { ...statistics };
    newStats.completedExercises += 1;
    if (currentExercise?.countType === 'Повторения' && currentExercise.reps) {
      newStats.totalReps += currentExercise.reps;
    }
    setStatistics(newStats);

    if (currentExerciseIndex < workout!!.exercises.length - 1) {
      setIsResting(true);
      setRestTime(60);
      setTimer(0);
    } else {
      finishWorkout();
    }
  };

  const skipExercise = () => {
    setStatistics(prev => ({
      ...prev,
      skippedExercises: prev.skippedExercises + 1
    }));
    nextExercise();
  };

  const nextExercise = () => {
    if (currentExerciseIndex < workout!!.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsResting(false);
      setTimer(0);
    } else {
      finishWorkout();
    }
  };

  const updateCharacterStats = () => {
    const characterData = localStorage.getItem('userData');
    if (characterData) {
      const character = JSON.parse(characterData);

      const pointsEarned = Math.floor(
        (statistics.completedExercises * 2) +
        (statistics.totalReps * 2) +
        (Math.floor(statistics.totalTime / 60))
      );

      const updatedCharacter = {
        ...character,
        points: character.points + pointsEarned,
        workoutsCompleted: character.workoutsCompleted + 1
      };

      localStorage.setItem('userData', JSON.stringify(updatedCharacter));

      return pointsEarned;
    }
    return 0;
  };

  const finishWorkout = () => {
    setIsWorkoutComplete(true);
    const finalStats = {
      ...statistics,
      totalTime: Math.floor((Date.now() - startTime) / 1000)
    };
    setStatistics(finalStats);
    
    const pointsEarned = updateCharacterStats();
    
    setStatistics(prev => ({
      ...prev,
      pointsEarned
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold tracking-tight">{workout?.name}</h1>
              <p className="mt-2 text-gray-200">{workout?.description}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-sm text-gray-500">Упражнения</div>
                <div className="text-2xl font-bold mt-1">{workout?.exercises.length}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-sm text-gray-500">Сложность</div>
                <div className="text-2xl font-bold mt-1">{workout?.difficulty}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-sm text-gray-500">Примерное время</div>
                <div className="text-2xl font-bold mt-1">{workout?.exercises.length!! * 3} мин</div>
              </div>
            </div>

            <button
              onClick={startWorkout}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold 
              hover:from-blue-600 hover:to-blue-700 transform transition-all duration-200 hover:scale-[1.02] 
              active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Начать тренировку
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isWorkoutComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Тренировка завершена!</h2>
            <p className="text-gray-600 mt-2">Отличная работа! Вот ваши результаты:</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-sm text-gray-500">Общее время</div>
              <div className="text-3xl font-bold mt-1">{formatTime(statistics.totalTime)}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-sm text-gray-500">Выполнено упражнений</div>
              <div className="text-3xl font-bold mt-1">{statistics.completedExercises}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-sm text-gray-500">Всего повторений</div>
              <div className="text-3xl font-bold mt-1">{statistics.totalReps}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-sm text-gray-500">Заработано очков</div>
              <div className="text-3xl font-bold mt-1">{statistics.pointsEarned}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{workout?.name}</h1>
              <div className="text-sm font-medium text-gray-500">
                {currentExerciseIndex + 1} / {workout?.exercises.length}
              </div>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div 
                className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${((currentExerciseIndex + 1) / (workout?.exercises.length || 1)) * 100}%` }}
              />
            </div>

            {isResting ? (
              <div className="text-center py-8">
                <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Время отдыха</h2>
                <div className="text-5xl font-bold text-blue-600 mb-6">{formatTime(restTime)}</div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => adjustRestTime(-10)}
                    className="px-6 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 
                             transition-colors duration-200"
                  >
                    -10 сек
                  </button>
                  <button
                    onClick={() => adjustRestTime(10)}
                    className="px-6 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 
                             transition-colors duration-200"
                  >
                    +10 сек
                  </button>
                </div>
                {restTime === 0 && (
                  <button
                    onClick={nextExercise}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 
                             rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 
                             transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Следующее упражнение
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <img
                    src={currentExercise?.image}
                    alt={currentExercise?.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentExercise?.difficulty === "Начинающий" ? "bg-green-100 text-green-800" :
                      currentExercise?.difficulty === "Средний" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {currentExercise?.difficulty}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">{currentExercise?.name}</h2>
                <p className="text-gray-600 mb-6">{currentExercise?.instruction}</p>

                {currentExercise?.countType === 'Время' ? (
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-gray-900 mb-4">
                      {formatTime(timer)} / {formatTime(currentExercise.duration! * 60)}
                    </div>
                    {timer >= currentExercise.duration! * 60 && (
                      <button
                        onClick={completeExercise}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white 
                                 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 
                                 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Завершить
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-gray-900 mb-4">
                      {currentExercise?.reps}
                    </div>
                    <div className="text-gray-500 mb-4">повторений</div>
                    <button
                      onClick={completeExercise}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white 
                               py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 
                               transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Завершить упражнение
                    </button>
                  </div>
                )}

                <button
                  onClick={skipExercise}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold 
                           hover:bg-gray-200 transition-colors duration-200"
                >
                  Пропустить упражнение
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};