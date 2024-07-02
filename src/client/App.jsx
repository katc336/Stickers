import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Dashboard from "./TeacherAccount/Dashboard/Dashboard"
import AllClasses from "./TeacherAccount/Classes/AllClasses/AllClasses";
import AllStudents from "./TeacherAccount/Students/AllStudents/AllStudents";
import SingleStudent from "./TeacherAccount/Students/SingleStudents/SingleStudent";
import AllLessons from "./TeacherAccount/Lessons/AllLessons/AllLessons";
import SingleClass from "./TeacherAccount/Classes/SingleClass/SingleClass";
import SingleLesson from "./TeacherAccount/Lessons/SingleLesson/SingleLesson";
import AllProgress from "./TeacherAccount/AllProgress/AllProgress";
import HowToGetStarted from "./Home/InformationPages/HowToGetStarted/HowToGetStarted";
import Story from "./Home/InformationPages/Story/Story";
import MobileNav from "./Navigation/MobileNav";
import TeacherNavDrawer from "./Navigation/Teacher/TeacherNavDrawer";
import StudentCodes from "./TeacherAccount/StudentCodes.jsx/StudentCodes";
import RegisterPage from "./Authorization/RegisterPage";
import AuthPage from "./Authorization/AuthPage";
import HomeNav from "./Navigation/HomeNoAccount/HomeNav";
import ParentDashboard from "./ParentAccount/Dashboard/ParentDashboard";
import StudentDashboard from "./StudentAccount/Dashboard/StudentDashboard";

function App() {
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const HomeNoAccountPages = ["/", "/about_teachers", "/about_parents", "/story", "/account_parent"];
  const hideNavDrawer = HomeNoAccountPages.includes(location.pathname);
  const ParentPages = ["/account_parent", ];
  const parentNav = ParentPages.includes(location.pathname);
  const StudentPages = ["/account_student", ];
  const studentNav = StudentPages.includes(location.pathname);
 
  return (
    <div>
      {isMobile ? <MobileNav /> : (!hideNavDrawer && token) ? <TeacherNavDrawer /> : <HomeNav />}
      <Routes>
        {/* Home Page Paths */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about_teachers" element={<HowToGetStarted />} />
        <Route path="/about_parents" element={<HowToGetStarted />} />
        <Route path="/story" element={<Story />} />
        {/* Authorization Page Paths */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<AuthPage />} />
        {/* Teacher's Account Page Paths */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student_codes" element={<StudentCodes />} />
        <Route path="/progress" element={<AllProgress />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="/my_classes" element={<AllClasses />} />
        <Route path="/class/:id" element={<SingleClass />} />
        <Route path="/my_students" element={<AllStudents />} />
        <Route path="/student/:id" element={<SingleStudent />} />
        <Route path="/my_lessons" element={<AllLessons />} />
        <Route path="/lesson/:id" element={<SingleLesson />} />
        {/* Parent's Account Page Paths */}
        <Route path="/account_parent" element={<ParentDashboard/>} />
        {/* Students's Account Page Paths */}
        <Route path="/account_student" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
