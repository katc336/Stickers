import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import HomePage from "./Home/HomePage";
import Dashboard from "./Dashboard/Dashboard";
import RegisterForm from "./Home/components/RegisterForm";
import AllClasses from "./Classes/AllClasses/AllClasses";
import AllStudents from "./Students/AllStudents/AllStudents";
import SingleStudent from "./Students/SingleStudents/SingleStudent";
import AllLessons from "./Lessons/AllLessons/AllLessons";
import SingleClass from "./Classes/SingleClass/SingleClass";
import SingleLesson from "./Lessons/SingleLesson/SingleLesson";
import AllProgress from "./AllProgress/AllProgress";
import HowToGetStarted from "./InformationPages/HowToGetStarted/HowToGetStarted";
import Story from "./InformationPages/Story/Story";
import LoginPage from "./Home/components/LoginPage";
import MobileNav from "./Navigation/MobileNav";
import NavDrawer from "./Navigation/NavDrawer";

function App() {
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      {isMobile ? <MobileNav /> : <div> {!token ? <div/> : <NavDrawer /> } </div> }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HowToGetStarted />} />
        <Route path="/story" element={<Story />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/progress" element={<AllProgress />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="/my_classes" element={<AllClasses />} />
        <Route path="/class/:id" element={<SingleClass />} />
        <Route path="/my_students" element={<AllStudents />} />
        <Route path="/student/:id" element={<SingleStudent />} />
        <Route path="/my_lessons" element={<AllLessons />} />
        <Route path="/lesson/:id" element={<SingleLesson />} />
      </Routes>

    </div>
  );
}

export default App;
