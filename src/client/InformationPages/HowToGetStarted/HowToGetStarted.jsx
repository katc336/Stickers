import { useMediaQuery, useTheme } from "@mui/material";
import WebHowToGetStarted from "./WebHowToGetStarted";

const HowToGetStarted = () => {

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
                  <WebHowToGetStarted />
                </div>}
        </div>
    )
}
export default HowToGetStarted