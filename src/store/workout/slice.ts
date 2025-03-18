import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout, WorkoutState } from "./types";

const initialWorkouts: Workout[] = [
  {
    id: 1,
    name: "Тренировка для начинающих",
    description: "Базовая программа тренировок для новичков, включающая простые упражнения для всего тела",
    exercises: [
      {
        id: 14,
        name: "Бег на месте",
        description: "Кардио упражнение",
        instruction: "1. Встаньте прямо\n2. Начните бег на месте\n3. Поддерживайте темп",
        image: "/images/running.jpg",
        difficulty: "Начинающий",
        equipment: ["Ничего"],
        tags: ["Кардио"],
        countType: "Время",
        duration: 2,
        hasWeight: false
      },
      {
        id: 4,
        name: "Скручивания на пресс",
        description: "Базовое упражнение для мышц пресса",
        instruction: "1. Лягте на коврик\n2. Поднимите корпус\n3. Вернитесь в исходное положение",
        image: "/images/crunches.jpg",
        difficulty: "Начинающий",
        equipment: ["Коврик"],
        tags: ["Корпус"],
        countType: "Повторения",
        reps: 20,
        hasWeight: false
      },
      {
        id: 13,
        name: "Отжимания от пола",
        description: "Базовое упражнение для груди и рук",
        instruction: "1. Примите упор лёжа\n2. Опуститесь к полу\n3. Отожмитесь вверх",
        image: "/images/push-up.jpg",
        difficulty: "Средний",
        equipment: ["Ничего"],
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 15,
        hasWeight: false
      },
      {
        id: 11,
        name: "Планка",
        description: "Статическое упражнение для корпуса",
        instruction: "1. Примите упор на локтях\n2. Держите тело прямым\n3. Удерживайте позицию",
        image: "/images/plank.jpeg",
        difficulty: "Средний",
        equipment: ["Коврик"],
        tags: ["Корпус"],
        countType: "Время",
        duration: 1,
        hasWeight: false
      }
    ],
    difficulty: "Начинающий",
    equipmentRequired: ["Коврик"],
    tags: ["Кардио", "Корпус", "Грудь", "Руки"]
  },
  {
    id: 2,
    name: "Тренировка среднего уровня",
    description: "Программа для тех, кто уже освоил базовые упражнения и готов к большим нагрузкам",
    exercises: [
      {
        id: 8,
        name: "Прыжки на скакалке",
        description: "Кардио упражнение",
        instruction: "1. Возьмите скакалку\n2. Начните прыжки\n3. Поддерживайте ритм",
        image: "/images/jump-rope.jpg",
        difficulty: "Средний",
        equipment: ["Скакалка"],
        tags: ["Кардио"],
        countType: "Время",
        duration: 3,
        hasWeight: false
      },
      {
        id: 6,
        name: "Приседания с гантелями",
        description: "Базовое упражнение для ног",
        instruction: "1. Встаньте с гантелями\n2. Опуститесь в присед\n3. Поднимитесь обратно",
        image: "/images/dumbbell-squat.jpg",
        difficulty: "Средний",
        equipment: ["Гантели"],
        tags: ["Ноги"],
        countType: "Повторения",
        reps: 15,
        hasWeight: true,
        weight: 10
      },
      {
        id: 2,
        name: "Подъём гантелей на бицепс",
        description: "Изолированное упражнение для развития бицепса",
        instruction: "1. Встаньте прямо\n2. Поднимите гантели к плечам\n3. Медленно опустите гантели",
        image: "/images/bicep-curl.jpg",
        difficulty: "Средний",
        equipment: ["Гантели"],
        tags: ["Руки"],
        countType: "Повторения",
        reps: 15,
        hasWeight: true,
        weight: 5
      },
      {
        id: 9,
        name: "Махи гантелями в стороны",
        description: "Упражнение для плечевого пояса",
        instruction: "1. Встаньте с гантелями\n2. Поднимите руки в стороны\n3. Опустите руки",
        image: "/images/lateral-raises.png",
        difficulty: "Средний",
        equipment: ["Гантели"],
        tags: ["Руки"],
        countType: "Повторения",
        reps: 12,
        hasWeight: true,
        weight: 3
      },
      {
        id: 7,
        name: "Гиперэкстензия",
        description: "Упражнение для мышц спины",
        instruction: "1. Лягте на коврик\n2. Поднимите корпус\n3. Опустите корпус",
        image: "/images/hyperextension.jpg",
        difficulty: "Средний",
        equipment: ["Коврик"],
        tags: ["Спина"],
        countType: "Повторения",
        reps: 15,
        hasWeight: false
      }
    ],
    difficulty: "Средний",
    equipmentRequired: ["Скакалка", "Гантели", "Коврик"],
    tags: ["Кардио", "Ноги", "Руки", "Спина"]
  },
  {
    id: 3,
    name: "Продвинутая силовая тренировка",
    description: "Интенсивная программа для опытных атлетов, направленная на развитие силы и выносливости",
    exercises: [
      {
        id: 1,
        name: "Жим штанги лёжа",
        description: "Базовое упражнение для развития грудных мышц и трицепсов",
        instruction: "1. Лягте на скамью\n2. Возьмите штангу хватом чуть шире плеч\n3. Опустите штангу к груди\n4. Выжмите штангу вверх",
        image: "/images/bench-press.jpg",
        difficulty: "Сложный",
        equipment: ["Штанга", "Скамья"],
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 12,
        hasWeight: true,
        weight: 20
      },
      {
        id: 5,
        name: "Становая тяга",
        description: "Комплексное упражнение для спины и ног",
        instruction: "1. Подойдите к штанге\n2. Возьмите штангу хватом сверху\n3. Выпрямитесь\n4. Опустите штангу",
        image: "/images/deadlift.jpg",
        difficulty: "Сложный",
        equipment: ["Штанга"],
        tags: ["Спина", "Ноги"],
        countType: "Повторения",
        reps: 8,
        hasWeight: true,
        weight: 40
      },
      {
        id: 12,
        name: "Подтягивания",
        description: "Упражнение для спины и рук",
        instruction: "1. Возьмитесь за турник\n2. Подтяните тело вверх\n3. Опуститесь вниз",
        image: "/images/pull-up.jpg",
        difficulty: "Сложный",
        equipment: ["Турник"],
        tags: ["Спина", "Руки"],
        countType: "Повторения",
        reps: 8,
        hasWeight: false
      },
      {
        id: 3,
        name: "Бёрпи",
        description: "Комплексное кардио упражнение",
        instruction: "1. Примите положение стоя\n2. Опуститесь в упор лёжа\n3. Сделайте отжимание\n4. Выпрыгните вверх",
        image: "/images/burpees.jpg",
        difficulty: "Сложный",
        equipment: ["Ничего"],
        tags: ["Кардио", "Корпус"],
        countType: "Повторения",
        reps: 10,
        hasWeight: false
      }
    ],
    difficulty: "Сложный",
    equipmentRequired: ["Штанга", "Скамья", "Турник"],
    tags: ["Грудь", "Спина", "Ноги", "Руки", "Кардио"]
  }
];

const initialState: WorkoutState = {
  workouts: initialWorkouts
}

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<number>) => {
      state.workouts = state.workouts.filter(w => w.id !== action.payload);
    }
  }
});

export const { addWorkout, updateWorkout, deleteWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;