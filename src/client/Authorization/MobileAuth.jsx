import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState } from "react"
import MobileLoginForm from "./TeacherAuth/Login/MobileLogin";
import MobileRegisterForm from "./TeacherAuth/Register/MobileRegister";

const MobileAuth = () => {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);

    return (
        <div>
            {login &&
                <Card sx={{ borderRadius: "20px", p: 3, height: 430  }}>
                    <MobileLoginForm />
                    <Typography sx={{ mt: 3, mb: 1, textAlign: "center" }}>
                        Don't have an account?
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                        <button
                            onClick={() => {
                                setLogin(false);
                                setRegister(true);
                            }}
                            className="add-button"
                            style={{ padding: 5, margin: 1 }}>
                            Register For Free
                        </button>
                    </Typography>
                </Card>
            }
            {register &&
                <Card sx={{ borderRadius: "20px", p: 3, height: 430 }}>
                    <MobileRegisterForm />
                    <Typography sx={{ mt: 3, mb: 1, textAlign: "center" }}>
                        Already have an account?
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                        <button
                            onClick={() => {
                                setLogin(true);
                                setRegister(false);
                            }}
                            className="add-button"
                            style={{ padding: 5, margin: 1 }}>
                            Go to Login
                        </button>
                    </Typography>
                </Card>
            }
        </div>
    )
}
export default MobileAuth