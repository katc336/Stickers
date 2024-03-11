import { useMediaQuery, useTheme } from "@mui/material";
import WebHowToGetStarted from "./WebHowToGetStarted";
import MobileHowToGetStarted from "./MobileHowToGetStarted";

const HowToGetStarted = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                  <MobileHowToGetStarted />
                </div>
                :
                <div>
                  <WebHowToGetStarted />
                </div>}
        </div>
    )
}
export default HowToGetStarted