import { useMediaQuery, useTheme } from "@mui/material";

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
                  
                </div>}
        </div>
    )
}
export default SingleLesson