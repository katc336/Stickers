import { useMediaQuery, useTheme } from "@mui/material";
import WebSingleClass from "./WebSingleClass";
import MobileSingleClass from "./MobileSingleClass";

const SingleClass = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileSingleClass />
                </div>
                :
                <div>
                    <WebSingleClass />
                </div>}
        </div>
    )
}
export default SingleClass