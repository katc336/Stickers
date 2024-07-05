import Box from "@mui/material/Box"
import { useMediaQuery, useTheme } from "@mui/material";
import MobileRegisterForm from "./TeacherAuth/Register/MobileRegister";
import RegisterForm from "./TeacherAuth/Register/RegisterForm";

const RegisterPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileRegisterForm />
                </div>
                :
                <div>
                    <Box sx={{ mt: 10, mx: 50 }}>
                        <RegisterForm />
                    </Box>
                </div>
            }
        </div>
    )
}
export default RegisterPage