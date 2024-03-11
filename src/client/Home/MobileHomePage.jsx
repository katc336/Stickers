import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Logo from "./images/Logo.png"
import MobileAuth from "./components/MobileAuth"
import MobileNav from "../Navigation/MobileNav"

const MobileHomePage = () => {
    return (
        <div>
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
                        sx={{ color: "#0A1D56", my: 3 }}>
                        Track and manage your student's progress to make sure your learning objectives stick!
                    </Typography>
                    <MobileAuth />
                </Stack>
            </Card>
        </div>
    )
}
export default MobileHomePage