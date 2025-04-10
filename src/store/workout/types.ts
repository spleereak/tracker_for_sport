import { Exercise } from "../exercise/types";

export interface Workout {
  id: number;
  name: string;
  description: string;
  exercises: Exercise[];
  difficulty: "Начинающий" | "Средний" | "Сложный";
  tags: string[];
  fromUser: boolean;
}

export interface WorkoutState {
  workouts: Workout[];
}