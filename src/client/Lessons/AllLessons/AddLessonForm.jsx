import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useGetClassesQuery, usePostNewLessonMutation } from "../../../redux/api"

const AddLessonForm = () => {
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false)
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
                //Check if the lesson already exists...
                let lessonAlreadyExists = false;
                data.forEach((item) => {
                    if (item.lessons.some((lesson) => lesson.lessonName === lessonName)) {
                        lessonAlreadyExists = true;
                    }
                });
                if (lessonAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Lesson already exists");
                    return;
                } else {
                    const result = await addLessonToClass({ id: Number(selectedClassId), lessonName })
                    console.log(result)
                    if (result.data) {
                        setAddError(false)
                        setAddAlreadyExistsError(false);
                        setAddLesson(false)
                        setClearButton(true)
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
            {clearButton && data.length === 0
                ?
                <div>
                    <Alert severity="info">
                        <Stack direction="row">
                            <Typography variant="h5">
                                You need to add a class first before you add a lesson.
                            </Typography>
                            <Link to="/my_classes">
                                <button
                                    style={{ marginTop: 0, marginLeft: "10px", marginBottom: 0, marginRight: "10px" }}
                                    className="add-button">
                                    Go Add Class
                                </button>
                            </Link>
                        </Stack>
                    </Alert>
                </div>
                : <div>
                    {clearButton &&
                        <button
                            className="add-button"
                            onClick={() => { setAddLesson(true), setClearButton(false) }}>
                            Add New Lesson
                        </button>
                    }
                </div>
            }
            {addLesson &&
                <form onSubmit={handleAddLesson}>
                    <Typography variant="h6">
                        Select the Lesson's Class:
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
                                            } else {
                                                setSelectedClassId(null);
                                            }
                                        }}
                                        checked={selectedClassId === className.id}
                                    />
                                    <Typography>
                                        {className.name}
                                    </Typography>
                                </Stack>
                            </div>
                        ))
                    }
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
            {addError &&
                <Alert severity="error">
                    There was an error adding the lesson.
                </Alert>}
            {addAlreadyExistsError &&
                <Alert severity="error">There is already a lesson with this name. Please revise the name to make it unique. </Alert>}
        </div>
    )
}
export default AddLessonForm