import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField"
import { usePostNewLessonMutation } from "../../../../redux/api"
import { useState } from "react"

const AddLessonButton = ({ id, data }) => {
    const [addLesson, setAddLesson] = useState(false);
    const [clearLessonButton, setClearLessonButton] = useState(true);
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] =useState(false)
    const [lessonName, setLessonName] = useState("")
    const [addLessonToClass] = usePostNewLessonMutation();

    console.log(data);
    const handleAddLesson = async (event) => {
        try {
            event.preventDefault();
            if (lessonName.trim() === "") {
                setAddError(true);
            } else {
                const lessonAlreadyExists = data.lessons.some((lesson) => lesson.lessonName === lessonName);
                if (lessonAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Lesson already exists");
                    return;
                }
                else {
                    const result = await addLessonToClass({ id: Number(id), lessonName })
                    console.log(result)
                    if (result.data) {
                        setAddError(false)
                        setAddLesson(false)
                        setAddAlreadyExistsError(false)
                        setClearLessonButton(true)
                        setLessonName("");
                        console.log("Success!");
                    } else {
                        setAddError(true);
                        console.log("Could not add lesson");
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            {clearLessonButton &&
                <button
                    className="add-button"
                    onClick={() => { setAddLesson(true), setClearLessonButton(false) }}>
                    Add New Lesson
                </button>
            }
             {addAlreadyExistsError &&
                <Alert severity="error">There is already a lesson with this name. Please revise the name to make it unique. </Alert>}
            {addError &&
                <Alert severity="error">There was an error adding the lesson.</Alert>}
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
        </div>
    )
}
export default AddLessonButton