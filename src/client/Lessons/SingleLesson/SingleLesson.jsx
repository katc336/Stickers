import { useMediaQuery, useTheme } from "@mui/material";
import WebSingleLesson from "./WebSingleLesson";
import MobileSingleLesson from "./MobileSingleLesson";

const SingleLesson = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            {isMobile
                ?
                <div>
                  <MobileSingleLesson />
                </div>
                :
                <div>
                  <WebSingleLesson />
                </div>}
        </div>
    )
}
export default SingleLesson