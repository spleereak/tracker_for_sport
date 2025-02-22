import { deleteWorkout } from "@/store/workout/slice";
import { Workout } from "@/store/workout/types";
import { useDispatch } from "react-redux"

export const useDeleteWorkout = () => {
  const dispatch = useDispatch();

  return (workoutId: number) => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      const workouts: Workout[] = JSON.parse(savedWorkouts);
      const updatedWorkouts = workouts.filter(w => w.id !== workoutId);
      localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    }

    dispatch(deleteWorkout(workoutId));
  }
}