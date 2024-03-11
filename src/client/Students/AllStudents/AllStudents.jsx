import { useMediaQuery, useTheme } from "@mui/material";
import WebAllStudents from "./WebAllStudents";
import MobileAllStudents from "./MobileAllStudents";

const AllStudents = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                  <MobileAllStudents />
                </div>
                :
                <div>
                  <WebAllStudents />
                </div>}
        </div>
    )
}
export default AllStudents