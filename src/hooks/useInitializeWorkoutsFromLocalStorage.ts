import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "@/store/store";
import { Workout } from "@/store/workout/types";
import { addWorkout } from "@/store/workout/slice";

export const useInitializeWorkoutsFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");

    if (savedWorkouts) {
      const workoutsFromStorage: Workout[] = JSON.parse(savedWorkouts);

      workoutsFromStorage.forEach((workout) => {
        const currentWorkout = JSON.parse(
          JSON.stringify(store.getState().workouts.workouts)
        );

        const exists = currentWorkout.some((w: Workout) => w.id === workout.id);
        if (!exists) {
          dispatch(addWorkout(workout));
        }
      });
    }
  }, [dispatch]);
};

