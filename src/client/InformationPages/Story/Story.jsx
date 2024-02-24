import { useMediaQuery, useTheme } from "@mui/material";
import WebStory from "./WebStory";

const Story = () => {

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
                  <WebStory />
                </div>}
        </div>
    )
}
export default Story