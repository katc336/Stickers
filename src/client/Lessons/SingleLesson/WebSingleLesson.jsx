import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useGetSingleLessonQuery } from "../../../redux/api"
import { useParams } from "react-router-dom";
import ClassLessonObjective from "./components/ClassLessonObjective"
import AddLessonObjective from "./components/AddLessonObjective"
import ClassStudentsProgress from "./components/ClassStudentsProgress";
import { motion } from "framer-motion"

const WebSingleLesson = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleLessonQuery(id);

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Card sx={{ ml: 20, mr: 3, p: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", mx: 3 }}>
                    {data && data.lessonName}
                </Typography>
                <AddLessonObjective
                    data={data}
                    id={id}
                />
                <Grid container>
                    <Grid item xs={6}>
                        <ClassLessonObjective id={id} />
                    </Grid>
                    <Grid item xs={6}>
                        {data && data.learningObjectives.length === 0
                            ?
                            <div>
                                <Alert severity="info">
                                    <Typography variant="h5">
                                        Add a lesson objective to add student's progress
                                    </Typography>
                                </Alert>
                            </div>
                            :
                            <div>
                                <ClassStudentsProgress id={id} />
                            </div>}
                    </Grid>
                </Grid>
            </Card>
        </motion.div>
    )
}
export default WebSingleLesson