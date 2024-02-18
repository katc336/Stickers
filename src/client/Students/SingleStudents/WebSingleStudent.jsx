import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
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
                    {data && data.name}
                </Typography>
                {data.studentProgress.map((progress) => (
                    <div key={progress.id}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ borderBottom: "solid black 1px" }}>
                            <Typography>
                                {progress.learningObjective.objectiveName}
                            </Typography>
                            <Typography>
                                {progress.progressPrecent}
                            </Typography>
                        </Stack>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default WebSingleStudent