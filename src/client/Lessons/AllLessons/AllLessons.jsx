import { useMediaQuery, useTheme } from "@mui/material";

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
                  
                </div>}
        </div>
    )
}
export default AllLessons