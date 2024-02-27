import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typograpgy from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/api";
import { useNavigate } from "react-router-dom";
import HomeNav from "./HomeNav";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [signup, { error }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await signup({ name, username, password })
            console.log(result)
            if (result.data) {
                setRegisterError(false);
                console.log("Success!");
                navigate("/account");
            } else {
                setRegisterError(true);
                console.log("Incorrect login credentials");
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <HomeNav />
            <Box sx={{ mt: 10 }}>
                <Card sx={{ p: 5, mx: 50 }}>
                    <Typograpgy
                        variant="h4"
                        sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                        Sign Up
                    </Typograpgy>
                    {registerError && <Alert severity="error" >Please try again with another username.</Alert>}
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
                    <Typograpgy sx={{
                        color: "#0A1D56",
                        textAlign: "center",
                        mt: 3
                    }}>
                        Already have an account?
                    </Typograpgy>
                    <Typograpgy sx={{
                        color: "#0A1D56",
                        textAlign: "center"
                    }}>
                        <Link to="/login">
                            Go to Login
                        </Link>
                    </Typograpgy>
                </Card>
            </Box>
        </div>
    )
}
export default RegisterForm