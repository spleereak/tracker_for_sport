import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addExercise } from "../store/exercise/slice";
import { Exercise } from "../store/exercise/types";
import { store } from "@/store/store";

export const useInitializeExercisesFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedExercises = localStorage.getItem("exercises");

    if (savedExercises) {
      const exercisesFromStorage: Exercise[] = JSON.parse(savedExercises);

      exercisesFromStorage.forEach((exercise) => {
        const currentExercises = JSON.parse(
          JSON.stringify(store.getState().exercises.exercises)
        );

        const exists = currentExercises.some((ex: Exercise) => ex.id === exercise.id);
        if (!exists) {
          dispatch(addExercise(exercise));
        }
      });
    }
  }, [dispatch]);
};

