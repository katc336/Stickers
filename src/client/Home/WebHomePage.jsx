import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import LoginForm from "./components/LoginForm"
import { useState } from "react"
import teacherImg from "./Teacher.png"
import HomeNav from "./components/HomeNav"

const WebHomePage = () => {
    const [form, setForm] = useState(false)
    return (
        <div>
            <HomeNav />
            <Box sx={{ mt: 10}}>
            <Grid container>
                <Grid item xs={7}>
                <Stack direction="row">
                    <Stack direction="column">
                    <Typography
                        variant="h1"
                        sx={{ color: "#0A1D56", fontWeight: "bold" }}>
                        Stickers
                        <Typography
                        variant="h4"
                        sx={{ color: "#0A1D56", mr: 65}}>
                        Track and manage student progress to make sure your learning objectives stick!
                    </Typography>
                    </Typography>
                    </Stack>
                    <img 
                    src={teacherImg}
                    width="400px"
                    style={{marginLeft: "23%", position: "absolute", zIndex: -1, }}/>
                    </Stack>
                </Grid>
                <Grid item xs={5}>
                    <LoginForm />
                </Grid>
            </Grid>
            </Box>
        </div>
    )
}
export default WebHomePage