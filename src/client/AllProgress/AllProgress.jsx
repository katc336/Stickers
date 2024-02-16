import { useMediaQuery, useTheme } from "@mui/material";
import WebAllProgress from "./WebAllProgress";

const AllProgress = () => {

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
                    <WebAllProgress />
                </div>}
        </div>
    )
}
export default AllProgress