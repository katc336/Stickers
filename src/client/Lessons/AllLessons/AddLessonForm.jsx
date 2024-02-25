import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { useGetClassesQuery,  usePostNewLessonMutation } from "../../../redux/api"

const AddLessonForm = () => {
    const [addError, setAddError] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [lessonName, setLessonName] = useState("")
    const [addLesson, setAddLesson] = useState(false);
    const [clearButton, setClearButton] = useState(true);
    const { data, error, isLoading } = useGetClassesQuery();
    const [addLessonToClass] = usePostNewLessonMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)
    const handleAddLesson = async (event) => {
        try {
            event.preventDefault();
            if (lessonName.trim() === "") {
                setAddError(true);
            } else {
                const result = await addLessonToClass({ id: Number(selectedClassId), lessonName })
                console.log(result)
                if (result.data) {
                    setAddError(false)
                    setAddLesson(false)
                    setClearButton(true)
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
            {addError &&
                <Alert severity="error">
                    There was an error adding the lesson.
                </Alert>}
            {clearButton && data.length !== 0 
            ? 
            <div>
                 <button
                    className="add-button"
                    onClick={() => { setAddLesson(true), setClearButton(false) }}>
                    Add New Lesson
                </button>
            </div> 
            : <div> 
                <Alert severity="info">
                    You need to add a class first before you add a lesson. 
                </Alert>
            </div>
               
            }
            {addLesson &&
                <form onSubmit={handleAddLesson}>
                    <Typography variant="h6">
                        Select Student's Class:
                    </Typography>
                    {
                    data.map((className) => (
                        <div key={className.id}>
                            <Stack direction="row">
                                <input
                                    type="checkbox"
                                    value={""}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelectedClassId(className.id);
                                        }
                                    }}
                                />
                                <Typography>
                                    {className.name}
                                </Typography>
                            </Stack>
                        </div>
                    ))}
                    <Stack direction="column">
                        <TextField
                            label="Student Name"
                            value={lessonName}
                            onChange={(event) => setLessonName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1, width: "35%" }} />
                        <button
                            style={{ width: "150px" }}
                            className="add-button"
                            type="submit">
                            Add Lesson
                        </button>
                    </Stack>
                </form>}
        </div>
    )
}
export default AddLessonForm