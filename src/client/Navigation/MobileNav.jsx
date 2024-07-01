import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MobileNav = () => {
    const [activePage, setActivePage] = useState("");
    const [showMenu, setShowMenu] = useState(false)
    const token = useSelector((state) => state.auth.token);

    const location = useLocation();
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);

    const sizeVariants = {
        hidden: { height: 10 },
        visible: { height: 400 },
    };
    const buttonVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div>
            <AppBar sx={{ pb: 8, backgroundImage: "linear-gradient(to right top, #6c5d8b, #62709e, #5a83aa, #5995b1, #63a5b4, #56b3ba, #4dc0bb, #51cdb5 )" }}>
                {/* This will be what is "clicked" to open and close the dropdown */}
                <motion.div
                    initial="hidden"
                    animate={showMenu ? "visible" : "hidden"}
                    variants={sizeVariants}
                    transition={{ duration: 0.5 }}
                >
                    <input
                        className="click"
                        type="checkbox"
                        onChange={(event) => {
                            if (event.target.checked) {
                                setShowMenu(true);
                            } else {
                                setShowMenu(false)
                            }
                        }}
                    />
                    {/*Bars that will rotate*/}
                    <div className="div1"></div>
                    <div className="div2"></div>
                    <div className="div3"></div>
                    {showMenu &&
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={buttonVariants}
                            transition={{ duration: 0.5 }}
                        >
                            {!token
                                ?
                                <div>
                                    <Stack
                                        sx={{ ml: 1 }}
                                        direction="column">
                                        <Link to="/">
                                            <Button sx={{ fontSize: 18, textTransform: "none", color: "white", mt: 10, textDecoration: activePage === "/" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Home
                                            </Button>
                                        </Link>
                                        <Link to="/about_teachers">
                                            <Button sx={{ fontSize: 18, textTransform: "none", color: "white", mt: 1, textDecoration: activePage === "/about_teachers" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Teachers
                                            </Button>
                                        </Link>
                                        <Link to="/about_parents">
                                            <Button sx={{ fontSize: 18, textTransform: "none", color: "white", mt: 1, textDecoration: activePage === "/about_parents" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Parents
                                            </Button>
                                        </Link>
                                        <Link to="/story">
                                            <Button sx={{ fontSize: 18, textTransform: "none", color: "white", mt: 1, textDecoration: activePage === "/story" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Story
                                            </Button>
                                        </Link>
                                        <Link to="/login">
                                            <Button sx={{ fontSize: 18, textTransform: "none", color: "white", mt: 1, textDecoration: activePage === "/login" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Login / Sign Up
                                            </Button>
                                        </Link>
                                    </Stack>
                                </div>
                                :
                                <div>
                                    <Stack
                                        sx={{ mt: 3, ml: 1 }}
                                        direction="column">
                                        <Link to="/dashboard">
                                            <Button sx={{ fontSize: 24, textTransform: "none", mt: 5, mb: 1, color: "white", textDecoration: activePage === "/dashboard" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Home
                                            </Button>
                                        </Link>
                                        <Link to="/progress">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 1, textDecoration: activePage === "/progress" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Progress Overview
                                            </Button>
                                        </Link>
                                        <Link to="/my_classes">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 1, textDecoration: activePage === "/my_classes" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                My Classes
                                            </Button>
                                        </Link>
                                        <Link to="/my_students">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 1, textDecoration: activePage === "/my_students" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                My Students
                                            </Button>
                                        </Link>
                                        <Link to="/my_lessons">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 1, textDecoration: activePage === "/my_lessons" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                My Lessons
                                            </Button>
                                        </Link>
                                        <Link to="/student_codes">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 1, textDecoration: activePage === "/student_codes" ? "orange wavy underline" : "", borderRadius: "50px" }}>
                                                Parents
                                            </Button>
                                        </Link>
                                    </Stack>
                                </div>
                            }
                        </motion.div>
                    }
                </motion.div>
            </AppBar >
        </div >
    )
}
export default MobileNav