import { useMediaQuery, useTheme } from "@mui/material";
import MobileHomePage from "./MobileHomePage";
import WebHomePage from "./WebHomePage";

const HomePage = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileHomePage />
                </div>
                :
                <div>
                    <WebHomePage />
                </div>}
        </div>
    )
}
export default HomePage