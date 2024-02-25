import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useGetSingleLessonQuery, usePostNewObjectiveMutation, usePostProgressMutation, useGetAllObjectivesQuery, useDeleteObjectiveMutation } from "../../../redux/api"
import { useParams } from "react-router-dom";
import NavDrawer from "../../Navigation/NavDrawer"
import ClassLessonObjective from "./components/ClassLessonObjective"
import AddLessonObjective from "./components/AddLessonObjective"
import ClassStudentsProgress from "./components/ClassStudentsProgress";

const WebSingleLesson = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleLessonQuery(id);

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
            <Card sx={{ ml: 20, mr: 3, p: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", mx: 3 }}>
                    {data && data.lessonName}
                </Typography>
                <AddLessonObjective id={id} />
                <Grid container>
                    <Grid item xs={6}>
                        <ClassLessonObjective id={id} />
                    </Grid>
                    <Grid item xs={6}>
                        <ClassStudentsProgress id={id}/>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default WebSingleLesson