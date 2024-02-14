import { useMediaQuery, useTheme } from "@mui/material";
import WebSingleStudent from "./WebSingleStudent";

const SingleStudent = () => {

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
                    <WebSingleStudent />
                </div>}
        </div>
    )
}
export default SingleStudent