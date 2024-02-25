import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetAllLessonsQuery, useDeleteLessonMutation } from "../../../redux/api"
import NavDrawer from "../../Navigation/NavDrawer"
import AddLessonForm from "./AddLessonForm"

const WebAllLessons = () => {
    const [deleteAlert, setDelteAlert] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(false);
    const { data, error, isLoading } = useGetAllLessonsQuery();
    const [deleteLesson] = useDeleteLessonMutation();
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
            <Box sx={{ ml: 20, mr: 3 }}>
                <Card
                    sx={{ p: 1 }}
                    elevation={10}>
                    <Typography
                        sx={{ textAlign: "center" }}
                        variant="h3">
                        All Lessons:
                    </Typography>
                    <AddLessonForm />
                    {data && data.map((lesson) => (
                        <div key={lesson.id}>
                            <Card
                                sx={{ m: 1, p: 1 }}
                                elevation={10}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Stack direction="column">
                                        <Typography
                                            variant="h5"
                                            sx={{ mr: 3, mt: .5 }}>
                                            {lesson.lessonName}
                                        </Typography>
                                        <Link to={`/lesson/${lesson.id}`} >
                                            <button className="details-button">
                                                See Details
                                            </button>
                                        </Link>
                                    </Stack>
                                    <Stack direction="column">
                                        <Typography
                                        variant="h6">
                                            Lesson Objectives:
                                        </Typography>
                                        <Stack direction="column">
                                            {lesson.learningObjectives.map((objective) => (
                                                <div key={objective.id}>
                                                    <Typography>
                                                        {objective.objectiveName}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </Stack>
                                    </Stack>
                                    <button
                                        className="delete-button"
                                        style={{ width: "70px", height: "35px", marginTop: 0 }} //override CSS
                                        onClick={() => {
                                            setSelectedLesson(lesson.id);
                                            setDelteAlert(true)
                                        }}>
                                        <DeleteForeverIcon sx={{ color: "white" }} />
                                    </button>
                                </Stack>
                                {deleteAlert && selectedLesson === lesson.id &&
                                    <Alert
                                        severity="error"
                                        sx={{ m: 1 }}>
                                        <Stack direction="column">
                                            <Typography variant="h6">
                                                Are you sure you want to delete this lesson?
                                            </Typography>
                                            <Typography variant="h6">
                                                Once you do it will be gone forever.
                                            </Typography>
                                            <Stack direction="row">
                                                <button
                                                    className="add-button"
                                                    style={{ width: "150px" }}>
                                                    Keep Lesson
                                                </button>
                                                <button
                                                    onClick={() => deleteLesson(lesson.id)}
                                                    className="delete-button"
                                                    style={{ width: "150px" }}>
                                                    Delete Forever
                                                </button>
                                            </Stack>
                                        </Stack>
                                    </Alert>}
                            </Card>
                        </div>
                    ))}
                </Card>
            </Box>

        </div>
    )
}
export default WebAllLessons