import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Dashboard from "./Dashboard/Dashboard";
import RegisterForm from "./Home/components/RegisterForm";
import AllClasses from "./Classes/AllClasses/AllClasses";
import AllStudents from "./Students/AllStudents/AllStudents";
import SingleStudent from "./Students/SingleStudents/SingleStudent";
import AllLessons from "./Lessons/AllLessons/AllLessons";
import AllObjectives from "./LearningObjective/AllObjectives/AllObjectives";
import SingleClass from "./Classes/SingleClass/SingleClass";
import SingleLesson from "./Lessons/SingleLesson/SingleLesson";
import AllProgress from "./AllProgress/AllProgress";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/progress" element={<AllProgress />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="/my_classes" element={<AllClasses />} />
        <Route path="/class/:id" element={<SingleClass />} />
        <Route path="/my_students" element={<AllStudents />} />
        <Route path="/student/:id" element={<SingleStudent />} />
        <Route path="/my_lessons" element={<AllLessons />} />
        <Route path="/lesson/:id" element={<SingleLesson />} />
        <Route path="/my_objectives" element={<AllObjectives />} />
      </Routes>

    </div>
  );
}

export default App;
