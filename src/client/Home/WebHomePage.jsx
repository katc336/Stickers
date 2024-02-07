import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LoginForm from "./components/LoginForm"
import { useState } from "react"
import RegisterForm from "./components/RegisterForm"
const WebHomePage = () => {
    const [form, setForm] = useState(false)
    return (
        <div>
            <Grid container>
                <Grid item xs={5}>
                    <Typography
                        variant="h2"
                        sx={{ color: "#0A1D56", fontWeight: "bold" }}>
                        Stickers = Success
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ color: "#0A1D56" }}>
                        Tracking student progress to make sure your learning objective stick
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <LoginForm />
                </Grid>
            </Grid>
        </div>
    )
}
export default WebHomePage