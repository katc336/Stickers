import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import teacherImg from "./images/Teacher.png"
import Logo from "./images/Logo.png"
import MobileAuth from "./components/MobileAuth"
import MobileNav from "../Navigation/MobileNav"

const MobileHomePage = () => {
    return (
        <div>
             {/* <Card
                elevation={10}
                sx={{ m: 1, p: 3, borderRadius: 10, backgroundColor: "transparent" }}
            >
                <Stack direction="column">
                    <img
                        src={Logo}
                        width="250px"
                    />
                    <Alert severity="info">
                        <Typography
                            sx={{ textAlign: "center" }}
                            variant="h4">
                            Welcome to Stickers!
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ my: 1 }}>
                            Sorry, but Stickers is not available on mobile devices yet.
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ my: 1 }}>
                            Please use a desktop or laptop to stat tracking your student's progress, and to make sure your learning objectives stick!
                        </Typography>
                    </Alert>
                </Stack>
            </Card> */}
            <MobileNav />
            <Card
                elevation={10}
                sx={{ mt: 10, mx: 1, p: 3, borderRadius: 10, backgroundColor: "transparent" }}
            >
                <Stack direction="column">
                    <img
                        src={Logo}
                        width="300px"
                    />
                    <Typography
                        variant="h5"
                        sx={{ color: "#0A1D56" , my: 3 }}>
                        Track and manage your student's progress to make sure your learning objectives stick!
                    </Typography>
                    <MobileAuth />
                </Stack>
            </Card>
        </div>
    )
}
export default MobileHomePage