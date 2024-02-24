import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"

const HomeNav = () => {
    return (
        <div>
            <AppBar
                sx={{ backgroundImage: "linear-gradient(to right top, #6c5d8b, #62709e, #5a83aa, #5995b1, #63a5b4, #56b3ba, #4dc0bb, #51cdb5 )" }}>
                <Stack
                    dir="rtl"
                    direction="row">
                    <Link to="/register">
                        <button className="add-button">
                            Sign Up for Free
                        </button>
                    </Link>
                    <Link to="/story">
                        <Button sx={{ color: "white", textTransform: "none", mr: 60 }}>
                            <Typography variant="h6">
                                Story
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/get_started">
                        <Button sx={{ color: "white", textTransform: "none", mr: 7 }}>
                            <Typography variant="h6">
                                How to Get Started
                            </Typography>
                        </Button>
                    </Link>
                </Stack>
            </AppBar>
        </div>
    )
}
export default HomeNav