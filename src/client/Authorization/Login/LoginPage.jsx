import Box from "@mui/material/Box"
import LoginForm from "./LoginForm"
import { useMediaQuery, useTheme } from "@mui/material";
import MobileLoginForm from "./MobileLogin";

const LoginPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            { isMobile
                    ?
                    <div>
                        <MobileLoginForm />
                    </div>
                    :
                    <div>
                        <Box sx={{ mt: 20, mx: 50 }}>
                            <LoginForm />
                        </Box>
                    </div>
            }
        </div>
    )
}
export default LoginPage