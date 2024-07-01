import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typograpgy from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useParentLoginMutation } from '../../../../redux/api';
import { useNavigate } from "react-router-dom";

const StudentLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [login] = useParentLoginMutation();
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
            <Typograpgy
                variant="h4"
                sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                Student Login
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
        </div>
    )
}
export default StudentLoginForm