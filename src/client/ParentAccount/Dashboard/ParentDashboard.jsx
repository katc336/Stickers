import Box from "@mui/material/Box";
import { useGetParentQuery } from "../../../redux/api"
import SelectProgressDate from "./components/SelectProgressDate";
import ParentHelloCard from "./components/ParentHelloCard";
import ParentProgressChart from "./components/ParentProgressChart";
import { useMediaQuery, useTheme } from "@mui/material";

const ParentDashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetParentQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data);
    return (
        <div>
            <Box sx={{ mt: isMobile ? 15 : 0, mx: isMobile ? 0 : 20 }}>
                <ParentHelloCard name={data.student.name} />
                <SelectProgressDate student={data.student.studentProgress} />
                <ParentProgressChart data={data.student} />
            </Box>
        </div>
    )
}
export default ParentDashboard