export interface Exercise {
  id: number;
  name: string;
  description: string;
  instruction: string;
  image: string;
  difficulty: "Начинающий" | "Средний" | "Сложный";
  equipment: string[];
  tags: string[];
  countType: 'Время' | 'Повторения';
  reps?: number;
  duration?: number;
}

export interface ExerciseState {
  exercises: Exercise[];
}
