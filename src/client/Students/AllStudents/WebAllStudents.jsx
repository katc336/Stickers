import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { useGetAllStudentsByTeacherQuery } from "../../../redux/api"
import NavDrawer from "../../Navigation/NavDrawer"


const WebAllStudents = () => {
    const { data, error, isLoading } = useGetAllStudentsByTeacherQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
    }
    return (
        <div>
            <NavDrawer />
            <Box sx={{ ml: 30 }}>
                <Card
                    sx={{ p: 1 }}
                    elevation={10}>
                        <Typography
                        sx={{ textAlign: "center" }}
                        variant="h3">
                           All Students
                        </Typography>
                    {data && data.map((student) => (
                        <div key={student.id}>
                            <Card
                                sx={{ m: 1, p: 1 }}
                                elevation={10}>
                                <Typography>
                                    {student.name}
                                </Typography>
                            </Card>
                        </div>
                    ))}
                </Card>
            </Box>

        </div>
    )
}
export default WebAllStudents