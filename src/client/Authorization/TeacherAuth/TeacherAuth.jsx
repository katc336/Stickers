import Typography from "@mui/material/Typography";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import { useState } from "react";

const TeacherAuthPage = () => {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    return (
        <div>
            {login &&
                <div>
                    <LoginForm />
                    <Typography sx={{ mt: 3, mb: 1, textAlign: "center" }}>
                        Don't have an account?
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}
                        className="text-link"
                        onClick={() => { setLogin(false); setRegister(true); }}>
                        Sign Up
                    </Typography>
                </div>
            }
            {register &&
                <div>
                    <RegisterForm />
                    <Typography sx={{ mt: 3, mb: 1, textAlign: "center" }}>
                        Already have an account?
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}
                        className="text-link"
                        onClick={() => { setLogin(true); setRegister(false); }} >
                        Go to Login
                    </Typography>
                </div>
            }
        </div>
    )
}
export default TeacherAuthPage