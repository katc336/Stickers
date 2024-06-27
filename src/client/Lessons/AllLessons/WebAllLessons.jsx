import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetAllLessonsQuery, useDeleteLessonMutation } from "../../../redux/api"
import AddLessonForm from "./AddLessonForm"
import LessonSearch from "../SearchBar/LessonSearch"
import { motion } from "framer-motion"

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
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Box sx={{ ml: 20, mr: 3 }}>
                <Card sx={{ borderRadius: "20px", p: 1 }} elevation={10}>
                    <Typography sx={{ textAlign: "center" }} variant="h3">
                        All Lessons:
                    </Typography>
                    <LessonSearch data={data} />
                    <AddLessonForm />
                    {data.map((className) => (
                        <div key={className.id}>
                            <Accordion
                                elevation={10}
                                sx={{ m: 3 }}>
                                <AccordionSummary>
                                    <Typography variant="h4">
                                        {className.name} Lessons
                                        <ExpandMoreIcon />
                                    </Typography>
                                </AccordionSummary>
                                {className.lessons.length === 0
                                    ?
                                    <div>
                                        <Alert severity="info">
                                            <Stack direction="row">
                                                <Typography variant="h5">
                                                    There are no lessons added to this class yet.
                                                </Typography>
                                                <Link
                                                    to={`/class/${className.id}`}>
                                                    <button
                                                        style={{ marginBottom: 0, marginTop: 0 }}
                                                        className="add-button">
                                                        See Class
                                                    </button>
                                                </Link>
                                            </Stack>
                                        </Alert>
                                    </div>
                                    : <div>
                                        {className.lessons.map((lesson) => (
                                            <div key={lesson.id}>
                                                <AccordionDetails>
                                                    <Card
                                                        elevation={10}
                                                        sx={{ borderRadius: "20px", p: 1, m: 1 }} >
                                                        <Grid container>
                                                            <Grid item xs={5}>
                                                                <Stack direction="column">
                                                                    <Typography variant="h6">
                                                                        {lesson.lessonName}
                                                                    </Typography>
                                                                    <Link to={`/lesson/${lesson.id}`} >
                                                                        <button
                                                                            style={{ float: "none" }}//override float
                                                                            className="details-button">
                                                                            See Lesson Details
                                                                        </button>
                                                                    </Link>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={5}>
                                                                <Stack direction="column">
                                                                    <Typography variant="h6">
                                                                        Objectives:
                                                                    </Typography>
                                                                    {lesson.learningObjectives.map((objective, index) => (
                                                                        <div key={index}>
                                                                            <Typography>
                                                                                {objective.objectiveName}
                                                                            </Typography>
                                                                        </div>
                                                                    ))}
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <button
                                                                    className="delete-button"
                                                                    style={{ width: "70px", height: "35px", marginTop: 0 }} //override CSS
                                                                    onClick={() => {
                                                                        setSelectedLesson(lesson.id);
                                                                        setDelteAlert(true)
                                                                    }}>
                                                                    <DeleteForeverIcon sx={{ color: "white" }} />
                                                                </button>
                                                            </Grid>
                                                        </Grid>
                                                        {deleteAlert && selectedLesson === lesson.id &&
                                                            <Alert
                                                                severity="error"
                                                                sx={{ m: 1 }}>
                                                                <Stack direction="column">
                                                                    <Typography variant="h6">
                                                                        Are you sure you want to delete this lesson?
                                                                        Once you do it will be gone forever.
                                                                    </Typography>
                                                                    <Stack sx={{ my: 3, ml:"40%"} }spacing={5} direction="row">
                                                                        <button
                                                                            onClick={() => setDelteAlert(false)}
                                                                            className="add-button"
                                                                            style={{ width: "150px" }}>
                                                                            Keep Lesson
                                                                        </button>
                                                                        <button
                                                                            onClick={() => deleteLesson(lesson.id)}
                                                                            className="delete-button"
                                                                            style={{ width: "150px"  }}>
                                                                            Delete Forever
                                                                        </button>
                                                                    </Stack>
                                                                </Stack>
                                                            </Alert>}
                                                    </Card>
                                                </AccordionDetails>
                                            </div>
                                        ))}
                                    </div>}



                            </Accordion>
                        </div>
                    ))}
                </Card>
            </Box>
        </motion.div>
    )
}
export default WebAllLessons