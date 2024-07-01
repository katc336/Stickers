import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRegisterMutation } from "../../../../redux/api";
import { useNavigate } from "react-router-dom";

const MobileRegisterForm = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signup] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || username.trim() === "" || name.length > 30 || username.length > 30) {
                setNameError(true);
                setPasswordError(false);
            } else if (password.trim() === "" || password.length < 8 || password.length > 30) {
                setPasswordError(true);
                setNameError(false);
            } else {
                const result = await signup({ name, username, password })
                if (result.data) {
                    setRegisterError(false);
                    setNameError(false);
                    setPasswordError(false);
                    console.log("Success!");
                    navigate("/account");
                } else {
                    setRegisterError(true);
                    console.log("Register failed");
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Card sx={{ mt: 15, borderRadius: "20px", p: 5, mx: 3 }}>
                <Typography
                    variant="h4"
                    sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                    Sign Up
                </Typography>
                {
                    registerError &&
                    <Alert severity="error" >
                        There was an error. Please try again with another username.
                    </Alert>
                }
                {
                    nameError &&
                    <Alert severity="error" >
                        Please make sure your username and name are 1-30 characters long.
                    </Alert>
                }
                {
                    passwordError &&
                    <Alert severity="error" >
                        Please make sure your password is 8-30 characters long.
                    </Alert>
                }
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        variant="filled"
                        sx={{ my: 1 }} />
                    <Stack direction="column">
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <TextField
                            fullWidth
                            label="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <button
                            className="auth-button"
                            type="submit">
                            Sign Up
                        </button>
                    </Stack>
                </form>
                </Card>
        </div>
    )
}
export default MobileRegisterForm