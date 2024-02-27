import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { usePostNewLessonMutation } from "../../../../redux/api"
import { useState } from "react"

const AddLessonButton = ({ id }) => {
    const [addLesson, setAddLesson] = useState(false);
    const [clearLessonButton, setClearLessonButton] = useState(true);
    const [addError, setAddError] = useState(null);
    const [lessonName, setLessonName] = useState("")
    const [addLessonToClass] = usePostNewLessonMutation();
    const handleAddLesson = async (event) => {
        try {
            event.preventDefault();
            if (lessonName.trim() === "") {
                setAddError(true);
            } else {
                const result = await addLessonToClass({ id: Number(id), lessonName })
                console.log(result)
                if (result.data) {
                    setAddError(false)
                    setAddLesson(false)
                    setClearLessonButton(true)
                    setLessonName("");
                    console.log("Success!");
                } else {
                    setAddError(true);
                    console.log("Could not add lesson");
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