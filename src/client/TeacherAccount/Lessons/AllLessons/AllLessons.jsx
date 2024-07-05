import { useMediaQuery, useTheme } from "@mui/material";
import WebAllLessons from "./WebAllLessons";
import MobileAllLessons from "./MobileAllLessons";

const AllLessons = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileAllLessons />
                </div>
                :
                <div>
                    <WebAllLessons />
                </div>}
        </div>
    )
}
export default AllLessons