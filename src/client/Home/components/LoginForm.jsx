import Stack from "@mui/material/Stack";
import Typograpgy from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useLoginMutation } from "../../../redux/api";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ switchForm }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [login, { error }] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await login({ username, password })
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Card sx={{ p: 5, mx: 30 }}>
                <Typograpgy
                    variant="h4"
                    sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                    Login
                </Typograpgy>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <TextField
                            label="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <button
                            onClick={() => { switchForm }}
                            className="auth-button"
                            type="submit">
                            Login
                        </button>
                    </Stack>
                </form>
                <Typograpgy sx={{
                    color: "#0A1D56",
                    textAlign: "center",
                    mt: 3
                }}>
                    Don't have an account?
                </Typograpgy>
                <Typograpgy sx={{
                    color: "#0A1D56",
                    textAlign: "center"
                }}>
                    Sign Up!
                </Typograpgy>
            </Card>
        </div>
    )
}
export default LoginForm
