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
        image: "https://tracker-sport.netlify.app/images/half-squats.jpg",
        difficulty: "Начинающий",
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
        image: "https://tracker-sport.netlify.app/images/side_turns.jpg",
        difficulty: "Начинающий",
        tags: ["Корпус", "Спина"],
        countType: "Повторения",
        reps: 10,
        fromUser: false
      },
      {
        id: 2,
        name: "Ходьба на месте",
        description: "Лёгкое кардио-упражнение, развивает выносливость и координацию.",
        instruction: "1. Встань прямо, руки согни под углом 90°. \n2. Маршируй, поднимая колени выше талии. \n3. Держи спину ровной, двигай руками в такт ногам. \n4. Выполняй упражнение заданное время.",
        image: "https://tracker-sport.netlify.app/images/walker.jpg",
        difficulty: "Начинающий",
        tags: ["Ноги", "Кардио"],
        countType: "Время",
        duration: 1,
        fromUser: false
      }
    ],
    difficulty: "Начинающий",
    tags: ["Спина", "Ноги", "Корпус", "Кардио"],
    fromUser: false
  },
  {
    id: 2,
    name: "Тренировка среднего уровня",
    description: "Программа для тех, кто уже освоил базовые упражнения и готов к большим нагрузкам",
    exercises: [
      {
        id: 6,
        name: "Отжимания от стены или с колен",
        description: "Укрепляет грудные мышцы и трицепсы",
        instruction: "1. Упрись руками в стену (или встань на колени). \n2. Медленно сгибай руки, приближая грудь к опоре. \n3. Контролируя движение, вернись назад.",
        image: "https://tracker-sport.netlify.app/images/push-ups_from_wall.jpg",
        difficulty: "Средний",
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 15,
        fromUser: false
      },
      {
        id: 7,
        name: "Планка",
        description: "Отличное упражнение для всего корпуса.",
        instruction: "1. Прими упор лёжа на предплечья. \n2. Держи тело ровным, не прогибай поясницу. \n3. Удерживай позицию заданное время.",
        image: "https://tracker-sport.netlify.app/images/plank.jpg",
        difficulty: "Средний",
        tags: ["Корпус", "Спина"],
        countType: "Время",
        duration: 1,
        fromUser: false
      },
      {
        id: 8,
        name: "Медленные подъёмы на носки",
        description: "Укрепляет мышцы голени, улучшает баланс.",
        instruction: "1. Встань прямо, ноги на ширине плеч. \n2. Медленно поднимись на носки, задержись на 2 секунды. \n3. Вернись в исходное положение.",
        image: "https://tracker-sport.netlify.app/images/toe_lifts.jpg",
        difficulty: "Средний",
        tags: ["Ноги"],
        countType: "Повторения",
        reps: 15,
        fromUser: false
      },
      {
        id: 9,
        name: "Прыжковые приседания",
        description: "Развивает силу ног и выносливость",
        instruction: "1. Выполни классический присед. \n2. Вытолкнись вверх, сделав прыжок. \n3. Приземлись мягко, сразу переходя в новый присед.",
        image: "https://tracker-sport.netlify.app/images/jumping_squats.jpg",
        difficulty: "Средний",
        tags: ["Ноги", "Кардио"],
        countType: "Повторения",
        duration: 10,
        fromUser: false
      }
    ],
    difficulty: "Средний",
    tags: ["Грудь", "Корпус", "Ноги", "Руки", "Спина"],
    fromUser: false
  },
  {
    id: 3,
    name: "Продвинутая тренировка",
    description: "Интенсивная программа для опытных атлетов, направленная на развитие силы и выносливости",
    exercises: [
      {
        id: 10,
        name: "Класические отжимания",
        description: "Отлично развивает грудные мышцы, руки и плечи",
        instruction: "1. Прими упор лёжа, руки чуть шире плеч \n2. Опускайся вниз, не касаясь пола грудью. \n3. Вернись в исходное положение.",
        image: "https://tracker-sport.netlify.app/images/push-ups.jpg",
        difficulty: "Сложный",
        tags: ["Грудь", "Руки"],
        countType: "Повторения",
        reps: 10,
        fromUser: false
      },
      {
        id: 11,
        name: "Планка с подъёмом ноги",
        description: "Укрепляет пресс и улучшает баланс.",
        instruction: "1. Встань в планку на предплечьях. \n2. Подними одну ногу вверх и удерживай 2 секунды. \n3. Опусти ногу, повтори для другой.",
        image: "https://tracker-sport.netlify.app/images/leg_plank.jpg",
        difficulty: "Сложный",
        tags: ["Корпус", "Спина"],
        countType: "Повторения",
        reps: 20,
        fromUser: false
      },
      {
        id: 12,
        name: "Высокий бег на месте",
        description: "Кардио упражнение",
        instruction: "1. Начни бег на месте, поднимая колени выше. \n2. Двигай руками в такт ногам.",
        image: "https://tracker-sport.netlify.app/images/high_run.jpg",
        difficulty: "Сложный",
        tags: ["Ноги", "Кардио"],
        countType: "Время",
        duration: 1,
        fromUser: false
      },
      {
        id: 13,
        name: "Берпи",
        description: "Одно из самых эффективных упражнений на всё тело",
        instruction: "1. Сделай присед, затем упор лёжа. \n2. Выполни отжимание. \n3. Вернись в присед и выпрыгни вверх.",
        image: "https://tracker-sport.netlify.app/images/burpee.jpg",
        difficulty: "Сложный",
        tags: ["Ноги", "Руки", "Грудь", "Корпус", "Кардио"],
        countType: "Повторения",
        reps: 12,
        fromUser: false
      }
    ],
    difficulty: "Сложный",
    tags: ["Грудь", "Спина", "Ноги", "Руки", "Корпус", "Кардио"],
    fromUser: false
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