import { UserData } from "@/types/types";
import { useEffect, useRef, useState, FC } from "react";
import { AchievementsModal } from "./AchievementsModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAchievements } from "@/hooks/useAchievements";
import { Trophy, Ruler, Weight, Target, Dumbbell } from 'lucide-react';
import {ProportionsModal} from "./ProportionsModal.tsx";

export const Dashboard: FC<{
  userData: UserData;
  onUpdateUser: (data: UserData) => void;
}> = ({ userData, onUpdateUser }) => {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showHeightModal, setShowHeightModal] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData);
  const hasUpdated = useRef(false);

  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  
  const { 
    achievements, 
    newAchievements, 
    clearNewAchievements, 
    calculateTotalReward 
  } = useAchievements(localUserData);

  useEffect(() => {
    setLocalUserData(userData);
  }, [userData])

  useEffect(() => {
    if (newAchievements.length > 0 && !hasUpdated.current) {
      hasUpdated.current = true;

      onUpdateUser({
        ...localUserData,
        achievements: [...localUserData.achievements, ...newAchievements],
        points: localUserData.points + calculateTotalReward()
      });

      clearNewAchievements();
    }
  }, [newAchievements]);

  const goal = {
    label: 'Цель',
    value: localUserData.goal === 'gain' ?
      'Набор массы'
      : localUserData.goal === 'lose' ?
        'Снижение веса'
        : 'Поддержание формы',
    color: localUserData.goal === 'gain' ?
      'from-blue-500 to-blue-600'
      : localUserData.goal === 'lose' ?
        'from-green-500 to-green-600'
        : 'from-purple-500 to-purple-600'
  };

  const stats = [
    { 
      label: 'Рост', 
      value: `${localUserData.height} см`,
      icon: Ruler,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600' 
    },
    { 
      label: 'Вес', 
      value: `${localUserData.weight} кг`,
      icon: Weight,
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      label: 'Достижения', 
      value: `${achievements.filter(a => a.completed).length}/${achievements.length}`,
      icon: Trophy,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    { 
      label: 'Тренировок', 
      value: `${localUserData.workoutsCompleted}/${workouts.length}`,
      icon: Dumbbell,
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  const calculateProgress = () => {
    return (localUserData.workoutsCompleted / workouts.length) * 100;
  };

  const handleUpdateUserData = (data: UserData) => {
    setLocalUserData(data);
    onUpdateUser(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${goal.color} h-2`} />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Ваша цель</h2>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">{goal.value}</h1>
              </div>
              <Target className={`w-8 h-8 ${
                goal.color.includes('blue') ? 'text-blue-500' : 
                goal.color.includes('green') ? 'text-green-500' : 
                'text-purple-500'}`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Общий прогресс</h2>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(calculateProgress())}%
            </span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-2xl shadow-lg overflow-hidden transition-transform 
                         hover:scale-105 cursor-pointer`}
              onClick={
              () => {
                stat.label === "Достижения" ? setShowAchievements(true) :
                  stat.label === 'Вес' ? setShowWeightModal(true) :
                    stat.label === 'Рост' && setShowHeightModal(true)
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>
          ))}
        </div>

        {showAchievements ? (
          <AchievementsModal
            achievements={achievements}
            onClose={() => setShowAchievements(false)}
          />
        ) : showWeightModal ? (
          <ProportionsModal icon={stats[1].icon} onClose={() => setShowWeightModal(false)} weight={localUserData.weight} onSave={handleUpdateUserData} userData={localUserData} />
        ) : showHeightModal && (
          <ProportionsModal icon={stats[0].icon} onClose={() => setShowHeightModal(false)} height={localUserData.height} onSave={handleUpdateUserData} userData={localUserData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;