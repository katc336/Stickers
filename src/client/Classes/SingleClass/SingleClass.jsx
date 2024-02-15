import { useMediaQuery, useTheme } from "@mui/material";
import WebSingleClass from "./WebSingleClass";

const SingleClass = () => {

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
                  <WebSingleClass />
                </div>}
        </div>
    )
}
export default SingleClass