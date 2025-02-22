import { Exercise } from "../store/exercise/types"

export const useSaveExercise = () => {
  return (exercise: Exercise) => {
    const savedExercises = localStorage.getItem('exercises');
    let exercises: Exercise[] = [];

    if (savedExercises) {
      exercises = JSON.parse(savedExercises);
    }

    const existingIndex = exercises.findIndex(ex => ex.id === exercise.id);

    if (existingIndex !== -1) {
      exercises[existingIndex] = exercise;
    } else {
      exercises.push(exercise);
    }

    localStorage.setItem('exercises', JSON.stringify(exercises));
  }
};