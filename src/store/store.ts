import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from './exercise/slice'
import workoutReducer from './workout/slice'

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    workouts: workoutReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;