import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavDrawer = () => {
    return (
        <div>
            <Drawer
                PaperProps={{ sx: { backgroundImage: "linear-gradient(to right top, #e8e7fb, #e3ecff, #dff1ff, #ddf5ff, #ddf9ff, #e0fbfc, #e4fdf9, #e9fef6, #effef4, #f5fef3, #fbfff4, #fffff6)" } }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <Button sx={{ textTransform: "none", color: "#0A1D56", px: 10, py: 3 }}>
                    Home
                </Button>
                <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                    Progress Overview
                </Button>
                <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                    My Classes
                </Button>
                <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                    My Students
                </Button>
                <Button sx={{ textTransform: "none", color: "#0A1D56", py: 3 }}>
                    My Classes
                </Button>
            </Drawer>
        </div>
    );
}
export default NavDrawer