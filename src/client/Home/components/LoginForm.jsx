import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typograpgy from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useLoginMutation } from "../../../redux/api";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ switchForm }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await login({ username, password });
            if (result.data) {
                setLoginError(false);
                console.log("Success!");
                navigate("/account");
            } else {
                setLoginError(true);
                console.log("Incorrect login credentials");
            }
        } catch (error) {
            console.error(error);
            setLoginError(true);
        }
    }
    return (
        <div>
            <Card sx={{ borderRadius: "20px", p: 5 }}>
                <Typograpgy
                    variant="h4"
                    sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                    Login
                </Typograpgy>
                {loginError && <Alert severity="error">Incorrect username or password. Please try again</Alert>}
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
                <Link to="/register">
                    <Typograpgy sx={{
                        color: "#0A1D56",
                        textAlign: "center"
                    }}>
                        Sign Up!
                    </Typograpgy>
                </Link>
            </Card>
        </div>
    )
}
export default LoginForm
