import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../store/store'; 
import { Workout } from '../store/workout/types';

export const useWorkout = (workoutId: number): {
  workout: Workout | null;
  isLoading: boolean;
  error: string | null;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);

  const reduxWorkout = useSelector((state: RootState) => 
    state.workouts.workouts.find(w => w.id === workoutId)
  );

  useEffect(() => {
    const fetchWorkout = () => {
      try {
        setIsLoading(true);
        setError(null);

        if (reduxWorkout) {
          setWorkout(reduxWorkout);
          setIsLoading(false);
          return;
        }

        const storedWorkoutsJson = localStorage.getItem('workouts');
        if (storedWorkoutsJson) {
          const storedWorkouts = JSON.parse(storedWorkoutsJson) as Workout[];
          const storedWorkout = storedWorkouts.find(w => w.id === workoutId);
          
          if (storedWorkout) setWorkout(storedWorkout);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutId, reduxWorkout]);

  return { workout, isLoading, error };
};