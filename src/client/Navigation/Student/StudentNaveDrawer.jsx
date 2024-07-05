import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from "../images/Logo.png"

const StudentNavDrawer = () => {
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
                    style={{ margin: 15 }}/>
                <Link to="/account_student">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", mx: 1, my: 3, border: activePage === "/account_student" ? "5px solid orange" : "", borderRadius: "50px"  }}>
                        Home
                    </Button>
                </Link>
            </Drawer>
        </div>
    );
}
export default StudentNavDrawer