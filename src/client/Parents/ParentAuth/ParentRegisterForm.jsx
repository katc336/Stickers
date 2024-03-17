import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParentRegisterMutation } from "../../../redux/api";
import { useNavigate } from "react-router-dom";
import HomeNav from "../../Navigation/HomeNav";

const ParentRegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [studentCode, setStudentCode] = useState("");
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
                const result = await signup({ studentCode, username, password })
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
            <HomeNav />
            <Box sx={{ mt: 10 }}>
                <Card sx={{ borderRadius: "20px", p: 5, mx: 50 }}>
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                        Parent Sign Up:
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
                            value={studentCode}
                            onChange={(event) => setStudentCode(event.target.value)}
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
                    <Typography sx={{
                        color: "#0A1D56",
                        textAlign: "center",
                        mt: 3
                    }}>
                        Already registerd your account?
                    </Typography>
                    <Typography sx={{
                        color: "#0A1D56",
                        textAlign: "center"
                    }}>
                        <Link to="/login">
                            Go to Parent Login
                        </Link>
                    </Typography>
                </Card>
            </Box>
        </div>
    )
}
export default ParentRegisterForm