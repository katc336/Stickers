import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import NavDrawer from "../Navigation/NavDrawer"
import { useGetAllProgressQuery } from "../../redux/api";
import { Percent } from "@mui/icons-material"

const WebAllProgress = () => {
    const { data, error, isLoading } = useGetAllProgressQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
    }
    console.log(data);
    return (
        <div>
            <NavDrawer />
            <Card
                elevation={10}
                sx={{ ml: 20, mr: 3, p: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    Student Progress Overview:
                </Typography>
                {data.map((student) => (
                    <div key={student.id}>
                        <Stack direction="row">
                            <Typography>
                                {student.name}
                            </Typography>
                            {student.studentProgress.map((percent) => (
                                <Typography 
                                key={percent.id}
                                sx={{ mx: 1 }}>
                                    {percent.progressPrecent}
                                </Typography>

                            ))}
                        </Stack>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default WebAllProgress