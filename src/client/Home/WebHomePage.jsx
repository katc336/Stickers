import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import LoginForm from "./components/LoginForm"
import teacherImg from "./images/Teacher.png"
import Logo from "./images/Logo.png"
import HomeNav from "../Navigation/HomeNav"
import HowToGetStarted from "../InformationPages/HowToGetStarted/HowToGetStarted"
import { motion } from "framer-motion"
import TeacherLoginButton from "./components/TeacherLoginButton"
import ParentLoginButton from "./components/ParentLoginButton"
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
                        <Grid item xs={6}>
                            <Stack direction="row">
                                <Stack direction="column">
                                    <img
                                        src={Logo}
                                        width="600px"
                                        style={{ marginLeft: 20 }} />
                                    <Typography
                                        variant="h4"
                                        sx={{ color: "#0A1D56", ml: 5, mr: 10 }}>
                                        Helping to track and manage student's progress to make sure learning objectives stick!
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                elevation={10}
                                sx={{ borderRadius: "20px", backgroundColor: "transparent", p: 3, }}>
                               <TeacherLoginButton />
                                <ParentLoginButton />
                            </Card>
                            {/* <Box sx={{ mr: 10 }}>
                                <LoginForm />
                            </Box> */}
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