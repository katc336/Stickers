import Box from "@mui/material/Box"
import LoginForm from "./LoginForm"
import HomeNav from "../../Navigation/HomeNav"

const LoginPage = () => {
    return (
        <div>
            <HomeNav />
            <Box sx={{ mt: 10, mx: 50 }}>
                <LoginForm />
            </Box>
        </div>
    )
}
export default LoginPage