import { useMediaQuery, useTheme } from "@mui/material";
import MobileDashboard from "./MobileDashboard";
import WebDashboard from "./WebDashboard";

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileDashboard />
                </div>
                :
                <div>
                    <WebDashboard />
                </div>}
        </div>
    )
}
export default Dashboard