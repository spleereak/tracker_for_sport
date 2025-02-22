import { Route, Routes } from "react-router-dom";
import WorkoutCatalog from "./pages/WorkoutCatalog";
import WorkoutConstructor from "./pages/WorkoutConstructor";
import { MainLayout } from "./layouts/MainLayout";
import ExerciseCatalog from "./pages/ExerciseCatalog";
import { WorkoutMode } from "./components/WorkoutMode";
import ProfilePage from "./pages/ProfilePage";
import { useInitializeExercisesFromLocalStorage } from "./hooks/useInitializeExercisesFromLocalStorage";
import { useInitializeWorkoutsFromLocalStorage } from "./hooks/useInitializeWorkoutsFromLocalStorage";

function App() {
  useInitializeExercisesFromLocalStorage();
  useInitializeWorkoutsFromLocalStorage();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/exercises" element={<ExerciseCatalog />} />
        <Route path="/workouts" element={<WorkoutCatalog />} />
        <Route path="/constructor" element={<WorkoutConstructor />} />
        <Route path="/workout/:workoutId" element={<WorkoutMode />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </Routes>
  )
}

export default App;