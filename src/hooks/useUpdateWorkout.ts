import { useDispatch } from "react-redux";
import { useSaveWorkout } from "./useSaveWorkout";
import { Workout } from "@/store/workout/types";
import { updateWorkout } from "@/store/workout/slice";

export const useUpdateWorkout = () => {
  const dispatch = useDispatch();
  const saveWorkout = useSaveWorkout()

  return (workout: Workout) => {
    dispatch(updateWorkout(workout));
    saveWorkout(workout);
  }
}