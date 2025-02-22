import { deleteExercise } from "@/store/exercise/slice";
import { Exercise } from "@/store/exercise/types";
import { useDispatch } from "react-redux"

export const useDeleteExercise = () => {
  const dispatch = useDispatch();

  return (exerciseId: number) => {
    const savedExercises = localStorage.getItem('exercises');
    if (savedExercises) {
      const exercises: Exercise[] = JSON.parse(savedExercises);
      const updatedExercises = exercises.filter(ex => ex.id !== exerciseId);
      localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    }

    dispatch(deleteExercise(exerciseId));
  }
}