import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import teacherImg from "./images/Teacher.png"
import Logo from "./images/Logo.png"
import HomeNav from "../Navigation/HomeNoAccount/HomeNav"
import HowToGetStarted from "./InformationPages/HowToGetStarted/HowToGetStarted"
import { motion } from "framer-motion"

const WebHomePage = () => {
    return (
        <div>
            <HomeNav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}>
                <Box sx={{
                    mt: 15
                }}>
                    <Grid container>
                        <Grid item xs={7}>
                            <Stack direction="row">
                                <Stack direction="column">
                                    <img
                                        src={Logo}
                                        width="800px"
                                        style={{ marginLeft: 10 }} />
                                    <Typography
                                        variant="h2"
                                        sx={{ fontWeight: "bold", color: "#0A1D56", ml: 5, mr: 50 }}>
                                        Tracking every student's progress
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{ color: "#0A1D56", ml: 5, mr: 50 }}>
                                        to make sure your learning objectives stick!
                                    </Typography>
                                </Stack>

                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <img
                                src={teacherImg}
                                width="600px"
                                style={{ position: "absolute", zIndex: -1, }}
                            />
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