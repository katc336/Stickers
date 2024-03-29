import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import LoginForm from "./components/LoginForm"
import teacherImg from "./images/Teacher.png"
import Logo from "./images/Logo.png"
import HomeNav from "../Navigation/HomeNav"
import HowToGetStarted from "../InformationPages/HowToGetStarted/HowToGetStarted"
import { motion } from "framer-motion"
const WebHomePage = () => {
    return (
        <div>
            <HomeNav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}>
                <Box sx={{ mt: 15 }}>
                    <Grid container>
                        <Grid item xs={7}>
                            <Stack direction="row">
                                <Stack direction="column">
                                    <img
                                        src={Logo}
                                        width="500px"
                                        style={{ marginLeft: 10 }} />
                                    <Typography
                                        variant="h4"
                                        sx={{ color: "#0A1D56", ml: 5, mr: 50 }}>
                                        Track and manage your student's progress to make sure your learning objectives stick!
                                    </Typography>
                                </Stack>
                                <img
                                    src={teacherImg}
                                    width="400px"
                                    style={{ marginLeft: "25%", position: "absolute", zIndex: -1, }} />
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Box sx={{ mr: 10 }}>
                                <LoginForm />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 40 }}>
                    <HowToGetStarted />
                </Box>
            </motion.div>
        </div>
    )
}
export default WebHomePage