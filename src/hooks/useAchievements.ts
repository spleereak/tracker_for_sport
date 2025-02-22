import { useState, useEffect } from 'react';
import { Achievement, UserData } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useAchievements = (userData: UserData) => {
  const [newAchievements, setNewAchievements] = useState<number[]>([]);
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const workoutsFromLS = JSON.parse(localStorage.getItem('workouts') || '[]');

  const achievements: Achievement[] = [
    { 
      id: 1, 
      name: 'Первая тренировка', 
      description: 'Завершите свою первую тренировку', 
      completed: userData.workoutsCompleted >= 1 
    },
    { 
      id: 2, 
      name: 'Серия побед', 
      description: 'Завершите 2 тренировки', 
      completed: userData.workoutsCompleted >= 2
    },
    { 
      id: 3, 
      name: 'Мастер тренировок', 
      description: 'Выполните все тренировки', 
      completed: userData.workoutsCompleted === workouts.length 
    },
    { 
      id: 4, 
      name: 'Тренер', 
      description: 'Создайте/измените тренировку', 
      completed: workoutsFromLS.length > 0 
    },
    {
      id: 5,
      name: 'Stay Hard',
      description: 'Выполни все достижения',
      completed: userData.achievements.length - 1 === 6
    }
  ];

  useEffect(() => {
    const newlyCompleted = achievements
      .filter(achievement => 
        achievement.completed && !userData.achievements.includes(achievement.id)
      )
      .map(achievement => achievement.id);

    if (newlyCompleted.length > 0) {
      setNewAchievements(newlyCompleted);
    }
  }, [userData.achievements, workouts, workoutsFromLS]); 

  const achievementRewards: Record<number, number> = {
    1: 50,  
    2: 100, 
    3: 200, 
    4: 150,
    5: 300
  };

  const getAchievementReward = (achievementId: number): number => {
    return achievementRewards[achievementId] || 0;
  };

  const calculateTotalReward = (): number => {
    return newAchievements.reduce((total, achievementId) => 
      total + getAchievementReward(achievementId), 0
    );
  };

  return {
    achievements,
    newAchievements,
    clearNewAchievements: () => setNewAchievements([]),
    getAchievementReward,
    calculateTotalReward
  };
};
