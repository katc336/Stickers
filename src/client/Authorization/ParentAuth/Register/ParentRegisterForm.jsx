import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useParentRegisterMutation } from "../../../../redux/api";
import { useNavigate } from "react-router-dom";

const ParentRegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [parentCode, setParentCode] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signup] = useParentRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (username.trim() === "" || username.length > 30) {
                setNameError(true);
                setPasswordError(false);
            } else if (password.trim() === "" || password.length < 8 || password.length > 30) {
                setPasswordError(true);
                setNameError(false);
            } else {
                const result = await signup({ username, password, parentCode })
                if (result.data) {
                    setRegisterError(false);
                    setNameError(false);
                    setPasswordError(false);
                    console.log("Success!");
                    navigate("/account_parent");
                } else {
                    setRegisterError(true);
                    console.log("Incorrect login credentials");
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                Parent Sign Up
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
                    Please make sure your username is 1-30 characters long.
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
                    label="Student code (8 character code given from your child's teacher)"
                    value={parentCode}
                    onChange={(event) => setParentCode(event.target.value)}
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
        </div>
    )
}
export default ParentRegisterForm