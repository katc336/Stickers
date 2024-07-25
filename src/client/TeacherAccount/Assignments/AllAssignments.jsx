import { useMediaQuery, useTheme } from "@mui/material";
import WebAssignmentPage from "./WebAssignmentPage";
import MobileAssignmentPage from "./MobileAssignmentPage";


const AllAssignments = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileAssignmentPage />
                </div>
                :
                <div>
                   <WebAssignmentPage/>
                </div>}
        </div>
    )
}
export default AllAssignments