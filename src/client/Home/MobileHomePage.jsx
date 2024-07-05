import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Logo from "./images/Logo.png"
import teacherImg from "./images/Teacher.png"
import { motion } from "framer-motion"
import MobileHowToGetStarted from "./InformationPages/HowToGetStarted/MobileHowToGetStarted"

const MobileHomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Box sx={{ mt: 10, mx: 1, p: 1, backgroundColor: "transparent" }}>
                <Stack direction="column">
                    <img
                        src={Logo}
                        width="70%"
                    />
                    <img
                        src={teacherImg}
                        width="60%"
                        style={{ marginLeft: "45vw", position: "absolute" }}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", color: "#0A1D56", marginRight: "30vw" }}>
                        Tracking every student's progress
                    </Typography>
                    <Typography
                        sx={{ color: "#0A1D56",  marginRight: "40vw" }}>
                        to make sure your learning objectives stick!
                    </Typography>
                </Stack>
            </Box>
            <Box sx={{ mt: 30 }}>
                <MobileHowToGetStarted />
            </Box>
        </motion.div>
    )
}
export default MobileHomePage