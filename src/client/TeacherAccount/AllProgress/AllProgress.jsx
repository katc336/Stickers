import { useMediaQuery, useTheme } from "@mui/material";
import WebAllProgress from "./WebAllProgress";
import MobileAllProgress from "./MobileAllProgress";

const AllProgress = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileAllProgress />
                </div>
                :
                <div>
                    <WebAllProgress />
                </div>}
        </div>
    )
}
export default AllProgress