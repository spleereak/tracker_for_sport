import { useDispatch } from "react-redux";
import { useSaveExercise } from "./useSaveExercise";
import { Exercise } from "@/store/exercise/types";
import { updateExercise } from "@/store/exercise/slice";

export const useUpdateExercise = () => {
  const dispatch = useDispatch();
  const saveExercise = useSaveExercise()

  return (exercise: Exercise) => {
    dispatch(updateExercise(exercise));
    saveExercise(exercise);
  }
}