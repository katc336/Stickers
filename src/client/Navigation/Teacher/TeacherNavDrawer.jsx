import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from "../images/Logo.png"

const TeacherNavDrawer = () => {
    const [activePage, setActivePage] = useState("");
    const location = useLocation();
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);
    return (
        <div>
            <Drawer
                PaperProps={{ sx: { backgroundImage: "linear-gradient(to right top, #e8e7fb, #e3ecff, #dff1ff, #ddf5ff, #ddf9ff, #e0fbfc, #e4fdf9, #e9fef6, #effef4, #f5fef3, #fbfff4, #fffff6)" } }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <img
                    src={Logo}
                    width="110px"
                    style={{ marginLeft: 10 }}/>
                <Link to="/dashboard">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", my: 3, border: activePage === "/dashboard" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        Home
                    </Button>
                </Link>
                <Link to="/progress">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", my: 3, border: activePage === "/progress" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        Progress Overview
                    </Button>
                </Link>
                <Link to="/my_classes">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", my: 3, border: activePage === "/my_classes" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        My Classes
                    </Button>
                </Link>
                <Link to="/my_students">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", my: 3, border: activePage === "/my_students" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        My Students
                    </Button>
                </Link>
                <Link to="/my_lessons">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", my: 3, border: activePage === "/my_lessons" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        My Lessons
                    </Button>
                </Link>
                <Link to="/student_codes">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", my: 3, border: activePage === "/student_codes" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        Parents
                    </Button>
                </Link>
            </Drawer>
        </div>
    );
}
export default TeacherNavDrawer