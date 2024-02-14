import { useMediaQuery, useTheme } from "@mui/material";
import WebAllClasses from "./WebAllClasses";

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
                  <WebAllClasses />
                </div>}
        </div>
    )
}
export default AllClasses