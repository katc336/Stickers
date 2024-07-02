import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import Logo from "../images/Logo.png"

const HomeNav = () => {
    const [activePage, setActivePage] = useState("");

    const location = useLocation();
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);
    return (
        <div>
            <AppBar
                sx={{ backgroundImage: "linear-gradient(to right top, #6c5d8b, #62709e, #5a83aa, #5995b1, #63a5b4, #56b3ba, #4dc0bb, #51cdb5 )" }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                >
                    <Link to="/">
                        <img
                            src={Logo}
                            width="150px" style={{ marginLeft: 20 }} />
                    </Link>
                    <Link to="/about_teachers">
                        <Button sx={{ color: "white", textTransform: "none", ml: 10, mt: 1.5, textDecoration: activePage === "/about_teachers" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                            <Typography variant="h6">
                                Teachers
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/about_parents">
                        <Button sx={{ color: "white", textTransform: "none", ml: 10, mt: 1.5, textDecoration: activePage === "/about_parents" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                            <Typography variant="h6">
                                Parents
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/story">
                        <Button sx={{ color: "white", textTransform: "none", mt: 1.5, textDecoration: activePage === "/story" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                            <Typography variant="h6">
                                Story
                            </Typography>
                        </Button>
                    </Link>
                    <Box sx={{mt: 2, mr: 3 }}>
                        <Link to="/login">
                            <button
                                style={{ width: 170 }}
                                className="add-button">
                                Login / Sign Up
                            </button>
                        </Link>
                    </Box>
                </Stack>
            </AppBar>
        </div>
    )
}
export default HomeNav