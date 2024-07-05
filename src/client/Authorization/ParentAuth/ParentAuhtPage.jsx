import Typography from "@mui/material/Typography";
import ParentLoginForm from "./Login/ParentLoginForm";
import ParentRegisterForm from "./Register/ParentRegisterForm";
import { useState } from "react";

const ParentAuthPage = () => {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    return (
        <div>
            {login &&
                <div>
                    <ParentLoginForm />
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
                    <ParentRegisterForm />
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
export default ParentAuthPage