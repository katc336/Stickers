import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Dashboard from "./Dashboard/Dashboard";
import RegisterForm from "./Home/components/RegisterForm";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/account" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

export default App;
