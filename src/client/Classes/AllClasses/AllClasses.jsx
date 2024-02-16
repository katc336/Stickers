import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import MyClasses from "../../Dashboard/components/MyClasses";
import NavDrawer from "../../Navigation/NavDrawer";

const AllClasses = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>

                </div>
                :
                <div>
                    <NavDrawer />
                    <Box sx={{ ml: 20, mr: 3 }}>
                        <MyClasses />  {/* In dashboard folder: reusing component */}
                    </Box>
                </div>}
        </div>
    )
}
export default AllClasses