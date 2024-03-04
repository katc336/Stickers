import MobileNav from "../../Navigation/MobileNav"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";
import KatSticker from "./KatSticker.png"
const MobileStory = () => {
    return (
        <div>
            <MobileNav />
            <Grid
                container
                sx={{ mt: 15 }}>
                <Grid item xs={6}>
                    <img
                        src={KatSticker}
                        width="180px" style={{ marginLeft: 3 }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4">
                        Hello 👋 
                    </Typography>
                    <Typography variant="h4">
                      I’m Kat, the creator, and welcome to Stickers!
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ p: 3 }}>
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
                    variant="h6">
                    This app is a free resource for educators, and I hope it helps to simplify and improve the student data tracking process so
                    you can focus on teaching and all the important work educators do. Thank you for choosing Sticker, and I welcome any feedback
                    or suggestions for future improvements. If you would like to contribute to the app, suggest a feature, or report a bug,
                    reach out to me on LinkedIn.
                </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Link
                    target="_blank"
                    to="https://www.linkedin.com/in/katcwebdeveloper/">
                    <button className="auth-button">
                        <Stack direction="row">
                            <LinkedInIcon sx={{ mx: 1 }} />
                            <Typography>
                                See LinkedIn Here
                            </Typography>
                        </Stack>
                    </button>
                </Link>
            </Box>
        </div>
    )
}
export default MobileStory