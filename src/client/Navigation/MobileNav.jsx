import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MobileNav = () => {
    const [showMenu, setShowMenu] = useState(false)
    const token = useSelector((state) => state.auth.token);
    const location = useLocation();
    const sizeVariants = {
        hidden: { height: 10  },
        visible: { height: 400 },
    };
    const buttonVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <div>
            <AppBar sx={{ py: 4, backgroundImage: "linear-gradient(to right top, #6c5d8b, #62709e, #5a83aa, #5995b1, #63a5b4, #56b3ba, #4dc0bb, #51cdb5 )" }}>
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
                                    <Stack direction="column">
                                        <Link to="/">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mt: 7, mb: 3 }}>
                                                Home
                                            </Button>
                                        </Link>
                                        <Link to="/About">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 3 }}>
                                                About
                                            </Button>
                                        </Link>
                                        <Link to="/story">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white" }}>
                                                Story
                                            </Button>
                                        </Link>
                                    </Stack>
                                </div>
                                :
                                <div>
                                    <Stack direction="column">
                                        <Link to="/dashboard">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mt: 5, mb: 3 }}>
                                                Home
                                            </Button>
                                        </Link>
                                        <Link to="/progress">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 3 }}>
                                                Progress Overview
                                            </Button>
                                        </Link>
                                        <Link to="/my_classes">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 3 }}>
                                                My Classes
                                            </Button>
                                        </Link>
                                        <Link to="/my_students">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white", mb: 3 }}>
                                                My Students
                                            </Button>
                                        </Link>
                                        <Link to="/my_lessons">
                                            <Button sx={{ fontSize: 24, textTransform: "none", color: "white" }}>
                                                My Lessons
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