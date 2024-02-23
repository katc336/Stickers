import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import { useParams } from "react-router-dom"
import { useGetSingleStudentQuery } from "../../../redux/api"
import NavDrawer from "../../Navigation/NavDrawer"


const WebSingleStudent = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleStudentQuery(id)

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }

    console.log(data)
    return (
        <div>
            <NavDrawer />
            <Card
                elevation={10}
                sx={{ p: 3, ml: 20, mr: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data && data.student.name}
                </Typography>
                {
                    data.student.studentProgress.length === 0
                        ?
                        <div>
                            <Alert severity="info">
                                <Typography>
                                    There is no data entered for {data.name} yet.
                                </Typography>
                            </Alert>
                        </div>
                        :
                        <div>
                            {data.averageObjectives.map((progress) => (
                                <div key={progress.id}>
                                   <Card
                                    sx={{
                                       p: 1,
                                       border: `3px solid`,
                                       borderColor: progress.average < 70 ? "red" : progress.average >= 70 && progress.average <= 80 ? "orange" : progress.average >= 81 && progress.average <= 89 ? "yellow" : "green",
                                       backgroundColor: progress.average < 70 ? "#FEA1A1" : progress.average >= 70 && progress.average <= 80 ? "#FFC97C" : progress.average >= 81 && progress.average <= 89 ? "#F9DE79" : "#CDE990",
                                     }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between">
                                            <Typography>
                                                {progress.objectiveName}
                                            </Typography>
                                            <Typography>
                                                {Math.floor(progress.average)}
                                            </Typography>
                                        </Stack>
                                    </Card>
                                </div>
                            ))}
                        </div>
                }
            </Card>
        </div>
    )
}
export default WebSingleStudent