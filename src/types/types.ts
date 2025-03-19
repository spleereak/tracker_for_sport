export type UserData = {
  height: number;
  weight: number;
  goal: 'gain' | 'lose' | 'maintain';
  achievements: number[];
  workoutsCompleted: number;
};

export type Achievement = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};