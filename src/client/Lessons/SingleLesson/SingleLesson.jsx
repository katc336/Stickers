import { useMediaQuery, useTheme } from "@mui/material";
import WebSingleLesson from "./WebSingleLesson";

const SingleLesson = () => {

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
                  <WebSingleLesson />
                </div>}
        </div>
    )
}
export default SingleLesson