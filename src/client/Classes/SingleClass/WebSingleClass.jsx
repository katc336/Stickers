import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useGetSingleClassQuery } from "../../../redux/api"
import { usePostNewStudentMutation, usePostNewLessonMutation } from "../../../redux/api"
import { useState } from "react"
import NavDrawer from "../../Navigation/NavDrawer"

const WebSingleClass = () => {
    const { id } = useParams()
    const [addStudent, setAddStudent] = useState(false);
    const [addLesson, setAddLesson] = useState(false);

    const [clearStudentButton, setClearStudentButton] = useState(true);
    const [clearLessonButton, setClearLessonButton] = useState(true);
    const [addError, setAddError] = useState(null);

    const [name, setName] = useState("")

    const [lessonName, setLessonName] = useState("")

    const { data, error, isLoading } = useGetSingleClassQuery(id)
    const [addStudentToClass] = usePostNewStudentMutation();
    const [addLessonToClass] = usePostNewLessonMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data);
    const handleAddStudent = async (event) => {
        try {
            event.preventDefault();
            const result = await addStudentToClass({ id: Number(id), name })
            console.log(result)
            if (result.data) {
                setAddError(false)
                setAddStudent(false)
                setClearStudentButton(true)
                setName("");
                console.log("Success!");
            } else {
                setAddError(true);
                console.log("Could not add student");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddLesson = async (event) => {
        try {
            event.preventDefault();
            const result = await addLessonToClass({ id: Number(id), lessonName })
            console.log(result)
            if (result.data) {
                setAddError(false)
                setAddLesson(false)
                setClearLessonButton(true)
                console.log("Success!");
            } else {
                setAddError(true);
                console.log("Could not add lesson");
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <NavDrawer />
            <Card
                elevation={10}
                sx={{ p: 3, ml: 20 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data.name}
                </Typography>
                {addError &&
                    <Alert severity="error">There was an error updating your class.</Alert>}
                <Grid container>
                    {/* <--------------------------STUDENTS FOR CLASS--------------------------> */}
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ p: 1, m: 1 }}>
                                <Typography
                                variant="h5"
                                sx={{ mb: 3, textAlign:"center"}}>
                                    Students:
                                </Typography>
                            {data.students.map((student) => (
                                <div key={student.id}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        sx={{ borderBottom: "solid black 1px" }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ mx: 3, mt: 0.5 }}>
                                            {student.name}
                                        </Typography>
                                        <Link to={`/student/${student.id}`}>
                                            <button className="details-button">
                                                Student Details
                                            </button>
                                        </Link>
                                    </Stack>
                                </div>
                            ))}
                            {clearStudentButton &&
                                <button
                                    className="add-button"
                                    onClick={() => { setAddStudent(true), setClearStudentButton(false) }}>
                                    Add New Student
                                </button>
                            }
                            {addStudent &&
                                <form onSubmit={handleAddStudent}>
                                    <TextField
                                        fullWidth
                                        label="Student Name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        variant="filled"
                                        sx={{ my: 1 }} />
                                    <button
                                        className="add-button"
                                        type="submit">
                                        Add Student
                                    </button>
                                </form>}
                        </Card>
                    </Grid>
                    {/* <--------------------------LESSONS FOR CLASS--------------------------> */}
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ p: 1, m: 1 }}>
                                <Typography
                                variant="h5"
                                sx={{ mb: 3, textAlign:"center"}}>
                                    Lessons:
                                </Typography>
                            {data.lessons.map((lesson) => (
                                <div key={lesson.id}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        sx={{ borderBottom: "solid black 1px" }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ mx: 3, mt: 0.5 }}>
                                            {lesson.lessonName}
                                        </Typography>
                                        <Link to={`/lesson/${lesson.id}`}>
                                            <button className="details-button">
                                                Lesson Details
                                            </button>
                                        </Link>
                                    </Stack>
                                </div>
                            ))}
                            {clearLessonButton &&
                                <button
                                    className="add-button"
                                    onClick={() => { setAddLesson(true), setClearLessonButton(false) }}>
                                    Add New Lesson
                                </button>
                            }
                            {addLesson &&
                                <form onSubmit={handleAddLesson}>
                                    <TextField
                                        fullWidth
                                        label="Lesson Name"
                                        value={lessonName}
                                        onChange={(event) => setLessonName(event.target.value)}
                                        variant="filled"
                                        sx={{ my: 1 }} />
                                    <button
                                        className="add-button"
                                        type="submit">
                                        Add Lesson
                                    </button>
                                </form>}
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default WebSingleClass