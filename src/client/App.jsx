import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Dashboard from "./Dashboard/Dashboard";
import RegisterForm from "./Home/components/RegisterForm";
import AllClasses from "./Classes/AllClasses/AllClasses";
import AllStudents from "./Students/AllStudents/AllStudents";
import AllLessons from "./Lessons/AllLessons/AllLessons";
import AllObjectives from "./LearningObjective/AllObjectives/AllObjectives";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="/my_classes" element={<AllClasses />} />
        <Route path="/my_students" element={<AllStudents />} />
        <Route path="/my_lessons" element={<AllLessons />} />
        <Route path="/my_objectives" element={<AllObjectives />} />
      </Routes>

    </div>
  );
}

export default App;
