import { Workout } from "@/store/workout/types";

export const useSaveWorkout = () => {
  return (workout: Workout) => {
    const savedWorkouts: Workout[] | [] = JSON.parse(localStorage.getItem("workouts") || "[]");
    
    const updatedWorkouts = savedWorkouts.filter(w => w.id !== workout.id);
    updatedWorkouts.push(workout);

    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };
};
