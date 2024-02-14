import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { useGetAllLessonsQuery } from "../../../redux/api"
import NavDrawer from "../../Navigation/NavDrawer"

const WebAllLessons = () => {
    const { data, error, isLoading } = useGetAllLessonsQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data);
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
                           All Lessons:
                        </Typography>
                    {data && data.map((lesson) => (
                        <div key={lesson.id}>
                            <Card
                                sx={{ m: 1, p: 1 }}
                                elevation={10}>
                                <Typography>
                                    {lesson.lessonName}
                                </Typography>
                            </Card>
                        </div>
                    ))}
                </Card>
            </Box>

        </div>
    )
}
export default WebAllLessons