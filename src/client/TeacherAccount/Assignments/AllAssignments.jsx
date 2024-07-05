import { useMediaQuery, useTheme } from "@mui/material";
import WebAssignmentPage from "./WebAssignmentPage";


const AllAssignments = () => {

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
                   <WebAssignmentPage/>
                </div>}
        </div>
    )
}
export default AllAssignments