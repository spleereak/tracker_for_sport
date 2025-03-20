import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout, WorkoutState } from "./types";

const initialWorkouts: Workout[] = [
  {
    id: 1,
    name: "Тренировка для начинающих",
    description: "Базовая программа тренировок для новичков, включающая простые упражнения для всего тела",
    exercises: [
      {
        id: 3,
        name: "Медленные полуприседания",
        description: "Улучшает силу ног, снижает нагрузку на колени.",
        instruction: "1. Встань прямо, ноги на ширине плеч. \n2. Медленно сгибай колени, слегка опускаясь вниз. \n3. Не приседай глубоко, контролируй движение. \n4. Вернись в исходное положение.",
        image: "half_squat.jpg",
        difficulty: "Начинающий",
        equipment: [],
        tags: ["Ноги"],
        countType: "Повторения",
        reps: 15,
        fromUser: false
      },
      {
        id: 4,
        name: "Повороты корпуса в стороны",
        description: "Улучшает подвижность позвоночника и укрепляет корпус.",
        instruction: "1. Встань прямо, руки положи на талию. \n2. Плавно поворачивай корпус вправо, затем влево. \n3. Держи ноги неподвижными, двигай только верхнюю часть тела. \n4. Сделай 10 повторений в каждую сторону.",
        image: "torso_twist.jpg",
        difficulty: "Начинающий",
        equipment: [],
        tags: ["Корпус", "Спина"],
        countType: "Повторения",
        reps: 10,
        fromUser: false
      },
      {
        id: 5,
        name: "Статическое сжимание ладоней",
        description: "Укрепляет мышцы груди и рук без дополнительного оборудования.",
        instruction: "1. Соедини ладони перед грудью, пальцы направь вверх. \n2. Сильно надави ладонями друг на друга. \n3. Удерживай напряжение 5–10 секунд, затем расслабь.",
        image: "palms_press.jpg",
        difficulty: "Начинающий",
        equipment: [],
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 10,
        fromUser: false
      },
    ],
    difficulty: "Начинающий",
    equipmentRequired: [],
    tags: ["Спина", "Ноги", "Корпус", "Грудь", "Руки"]
  },
  {
    id: 2,
    name: "Тренировка среднего уровня",
    description: "Программа для тех, кто уже освоил базовые упражнения и готов к большим нагрузкам",
    exercises: [
      {
        id: 7,
        name: "Отжимания от стены или с колен",
        description: "Укрепляет грудные мышцы и трицепсы",
        instruction: "1. Упрись руками в стену (или встань на колени). \n2. Медленно сгибай руки, приближая грудь к опоре. \n3. Контролируя движение, вернись назад.",
        image: "jumping_jacks.jpg",
        difficulty: "Средний",
        equipment: [],
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 15,
        fromUser: false
      },
      {
        id: 8,
        name: "Планка",
        description: "Отличное упражнение для всего корпуса.",
        instruction: "1. Прими упор лёжа на предплечья. \n2. Держи тело ровным, не прогибай поясницу. \n3. Удерживай позицию заданное время.",
        image: "plank.jpg",
        difficulty: "Средний",
        equipment: [],
        tags: ["Корпус", "Спина"],
        countType: "Время",
        duration: 1,
        fromUser: false
      },
      {
        id: 9,
        name: "Медленные подъёмы на носки",
        description: "Укрепляет мышцы голени, улучшает баланс.",
        instruction: "1. Встань прямо, ноги на ширине плеч. \n2. Медленно поднимись на носки, задержись на 2 секунды. \n3. Вернись в исходное положение.",
        image: "burpee.jpg",
        difficulty: "Средний",
        equipment: [],
        tags: ["Ноги"],
        countType: "Повторения",
        reps: 15,
        fromUser: false
      },
      {
        id: 10,
        name: "Боковые наклоны корпуса",
        description: "Развивает гибкость корпуса и укрепляет косые мышцы живота.",
        instruction: "1. Встань прямо, руки положи на талию. \n2. Медленно наклоняйся в сторону, не двигая бёдрами.\n3. Вернись в исходное положение, наклонись в другую сторону.",
        image: "./images/lunges.jpg",
        difficulty: "Средний",
        equipment: ["Гантели"],
        tags: ["Спина", "Корпус"],
        countType: "Повторения",
        reps: 10,
        fromUser: false
      }
    ],
    difficulty: "Средний",
    equipmentRequired: [],
    tags: ["Грудь", "Корпус", "Ноги", "Руки", "Спина"]
  },
  {
    id: 3,
    name: "Продвинутая тренировка",
    description: "Интенсивная программа для опытных атлетов, направленная на развитие силы и выносливости",
    exercises: [
      {
        id: 11,
        name: "Прыжковые приседания",
        description: "Развивает силу ног и выносливость",
        instruction: "1. Выполни классический присед. \n2. Вытолкнись вверх, сделав прыжок. \n3. Приземлись мягко, сразу переходя в новый присед.",
        image: "./images/plank.jpeg",
        difficulty: "Средний",
        equipment: [],
        tags: ["Ноги", "Кардио"],
        countType: "Повторения",
        duration: 10,
        fromUser: false
      },
      {
        id: 12,
        name: "Класические отжимания",
        description: "Отлично развивает грудные мышцы, руки и плечи",
        instruction: "1. Прими упор лёжа, руки чуть шире плеч \n2. Опускайся вниз, не касаясь пола грудью. \n3. Вернись в исходное положение.",
        image: "./images/pull-up.jpg",
        difficulty: "Сложный",
        equipment: [],
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 10,
        fromUser: false
      },
      {
        id: 13,
        name: "Планка с подъёмом ноги",
        description: "Укрепляет пресс и улучшает баланс.",
        instruction: "1. Встань в планку на предплечьях. \n2. Подними одну ногу вверх и удерживай 2 секунды. \n3. Опусти ногу, повтори для другой.",
        image: "./images/push-up.jpg",
        difficulty: "Средний",
        equipment: [],
        tags: ["Корпус", "Спина"],
        countType: "Повторения",
        reps: 20,
        fromUser: false
      },
      {
        id: 15,
        name: "Берпи",
        description: "Одно из самых эффективных упражнений на всё тело",
        instruction: "1. Сделай присед, затем упор лёжа. \n2. Выполни отжимание. \n3. Вернись в присед и выпрыгни вверх.",
        image: "./images/tricep-extension.jpg",
        difficulty: "Средний",
        equipment: [],
        tags: ["Ноги", "Руки", "Грудь", "Корпус", "Кардио"],
        countType: "Повторения",
        reps: 12,
        fromUser: false
      }
    ],
    difficulty: "Сложный",
    equipmentRequired: [],
    tags: ["Грудь", "Спина", "Ноги", "Руки", "Корпус", "Кардио"]
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