export type UserData = {
  height: number;
  weight: number;
  goal: 'gain' | 'lose' | 'maintain';
  achievements: number[];
  points: number;
  workoutsCompleted: number;
  customization: {
    clothes: string | null;
    accessories: string | null;
    hairstyle: string | null;
  };
};

export type CustomizationItem = {
  id: string;
  name: string;
  type: 'clothes' | 'accessories' | 'hairstyle';
  price: number;
  image: string;
};

export type Achievement = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};