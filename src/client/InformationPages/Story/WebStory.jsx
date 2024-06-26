import HomeNav from "../../Navigation/HomeNav"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";
import KatSticker from "./KatSticker.png"
import { motion } from "framer-motion";

const WebStory = () => {
    return (
        <div>
            <HomeNav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}>
                <Box sx={{ mt: 10, p: 3 }}>
                    <Grid container>
                        <Grid item xs={5}>
                            <img
                                src={KatSticker}
                                width="550px" style={{ marginLeft: 20 }} />
                        </Grid>
                        <Grid item xs={7}>
                            <Typography
                                variant="h4"
                                sx={{ mb: 3 }}>
                                Hello 👋 I’m Kat, the creator, and welcome to Stickers!
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mb: 3 }}>
                                As a teacher myself, I understand the frustration of trying to keep track of student data in a way that is simple,
                                efficient, and visually appealing. That's why I created this app;
                                to provide a free and user-friendly solution for teachers to track daily student progress.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mb: 3 }}>
                                I was inspired to create this app after seeing my colleagues spending hours creating and updating
                                large spreadsheets to calculate and track student data.
                                I knew there had to be a better way, so I set out to develop a tool that would streamline the tracking
                                process and provide a digital solution.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mb: 3 }}>
                                With this app, you can easily input and update student data, and track specific learning objectives over time.
                                It also analyzes trends and helps you identify learning gaps across entire classes, or for individual students.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mb: 3 }}>
                                This app is a free resource for educators, and I hope it helps to simplify and improve the student data tracking process so
                                you can focus on teaching and all the important work educators do.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </div>
    )
}
export default WebStory