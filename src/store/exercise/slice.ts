import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, ExerciseState } from "./types";

const initialExercises: Exercise[] = [
  {
    id: 1,
    name: "Приседания у стены",
    description: "Статическое упражнение для ног и корпуса, помогает улучшить выносливость",
    instruction: "1. Встань спиной к стене, ноги на ширине плеч.\n2. Медленно скользи вниз, пока колени не образуют угол 90°.\n3. Держи спину ровной, не отрывай пятки от пола.\n4. Удерживай положение, затем вставай.",
    image: "./images/wall_squats.jpg",
    difficulty: "Начинающий",
    equipment: [],
    tags: ["Ноги", "Корпус"],
    countType: "Время",
    duration: 1,
    fromUser: false
  },
  {
    id: 2,
    name: "Ходьба на месте",
    description: "Лёгкое кардио-упражнение, развивает выносливость и координацию.",
    instruction: "1. Встань прямо, руки согни под углом 90°. \n2. Маршируй, поднимая колени выше талии. \n3. Держи спину ровной, двигай руками в такт ногам. \n4. Выполняй упражнение заданное время.",
    image: "./images/walker.jpg",
    difficulty: "Начинающий",
    equipment: [],
    tags: ["Ноги", "Кардио"],
    countType: "Время",
    duration: 1,
    fromUser: false
  },
  {
    id: 3,
    name: "Медленные полуприседания",
    description: "Улучшает силу ног, снижает нагрузку на колени.",
    instruction: "1. Встань прямо, ноги на ширине плеч. \n2. Медленно сгибай колени, слегка опускаясь вниз. \n3. Не приседай глубоко, контролируй движение. \n4. Вернись в исходное положение.",
    image: "./images/half-squats.jpg",
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
    image: "./images/side_turns.jpg",
    difficulty: "Начинающий",
    equipment: [],
    tags: ["Корпус", "Спина"],
    countType: "Повторения",
    reps: 10,
    fromUser: false
  },
  {
    id: 5,
    name: "Классические приседания",
    description: "Базовое упражнение для ног и ягодиц",
    instruction: "1. Встань прямо, ноги на ширине плеч. \n2. Медленно опусти таз вниз, пока бедра не станут параллельны полу. \n3. Следи, чтобы колени не выходили за носки. 4. Вернись в исходное положение.",
    image: "./images/classic_squats.jpg",
    difficulty: "Начинающий",
    equipment: [],
    tags: ["Ноги"],
    countType: "Повторения",
    reps: 15,
    fromUser: false
  },
  {
    id: 6,
    name: "Отжимания от стены или с колен",
    description: "Укрепляет грудные мышцы и трицепсы",
    instruction: "1. Упрись руками в стену (или встань на колени). \n2. Медленно сгибай руки, приближая грудь к опоре. \n3. Контролируя движение, вернись назад.",
    image: "./images/push-ups_from_wall.jpg",
    difficulty: "Средний",
    equipment: [],
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
    image: "./images/plank.jpg",
    difficulty: "Средний",
    equipment: [],
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
    image: "./images/toe_lifts.jpg",
    difficulty: "Средний",
    equipment: [],
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
    image: "./images/jumping_squats.jpg",
    difficulty: "Средний",
    equipment: [],
    tags: ["Ноги", "Кардио"],
    countType: "Повторения",
    duration: 10,
    fromUser: false
  },
  {
    id: 10,
    name: "Класические отжимания",
    description: "Отлично развивает грудные мышцы, руки и плечи",
    instruction: "1. Прими упор лёжа, руки чуть шире плеч \n2. Опускайся вниз, не касаясь пола грудью. \n3. Вернись в исходное положение.",
    image: "./images/push-ups.jpg",
    difficulty: "Сложный",
    equipment: [],
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
    image: "./images/leg_plank.jpg",
    difficulty: "Сложный",
    equipment: [],
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
    image: "./images/high_run.jpg",
    difficulty: "Сложный",
    equipment: [],
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
    image: "./images/burpee.jpg",
    difficulty: "Средний",
    equipment: [],
    tags: ["Ноги", "Руки", "Грудь", "Корпус", "Кардио"],
    countType: "Повторения",
    reps: 12,
    fromUser: false
  }
];

const initialState: ExerciseState = {
  exercises: initialExercises
};

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.exercises.push(action.payload);
    },
    updateExercise: (state, action: PayloadAction<Exercise>) => {
      const index = state.exercises.findIndex(ex => ex.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },
    deleteExercise: (state, action: PayloadAction<number>) => {
      state.exercises = state.exercises.filter(ex => ex.id !== action.payload);
    },
    clearExercises: (state) => {
      state.exercises = [];
    }
  }
});

export const { addExercise, updateExercise, deleteExercise, clearExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;