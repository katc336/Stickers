import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavDrawer = () => {
    return (
        <div>
            <Drawer
                PaperProps={{ sx: { backgroundImage: "linear-gradient(to right top, #e8e7fb, #e3ecff, #dff1ff, #ddf5ff, #ddf9ff, #e0fbfc, #e4fdf9, #e9fef6, #effef4, #f5fef3, #fbfff4, #fffff6)" } }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <Link to="/">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", px: 10, py: 3 }}>
                        Home
                    </Button>
                </Link>
                <Link to="">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                        Progress Overview
                    </Button>
                </Link>
                <Link to="/my_classes">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                        My Classes
                    </Button>
                </Link>
                <Link to="/my_students">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                        My Students
                    </Button>
                </Link>
                <Link to="/my_lessons">
                    <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                        My Lessons
                    </Button>
                </Link>
            </Drawer>
        </div>
    );
}
export default NavDrawer