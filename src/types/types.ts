export type UserData = {
  height: number;
  weight: number;
  goal: 'gain' | 'lose' | 'maintain';
  achievements: number[];
  workoutsCompleted: number;
};
