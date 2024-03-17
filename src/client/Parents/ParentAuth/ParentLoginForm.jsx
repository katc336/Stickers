import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import Typograpgy from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useParentLoginMutation } from '../../../redux/api';
import { useNavigate } from "react-router-dom";

const ParentLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [login] =  useParentLoginMutation();
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Card sx={{ borderRadius: "20px", p: 5, mx: 50 }}>
                <Typograpgy
                    variant="h4"
                    sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                    Parent Login:
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
                        Register with your child's account
                    </Typograpgy>
                </Link>
            </Card>
        </motion.div>
    )
}
export default ParentLoginForm