import { useMediaQuery, useTheme } from "@mui/material";
import WebAllLessons from "./WebAllLessons";

const AllLessons = () => {

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
                  <WebAllLessons />
                </div>}
        </div>
    )
}
export default AllLessons