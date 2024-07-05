import Box from "@mui/material/Box";
import { useGetStudentAccountQuery } from "../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";
import StudentHelloCard from "./components/StudentHelloCard";
import StudentAssignments from "./components/StudentAssignments";

const StudentDashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetStudentAccountQuery();
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
                <StudentHelloCard name={data.student.name} />
            <StudentAssignments assingmentData={data.student.class.Assignment} />
            </Box>
        </div>
    )
}
export default StudentDashboard