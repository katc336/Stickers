import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { usePostNewLessonMutation } from "../../../../redux/api"
import { useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material";

const AddLessonButton = ({ id, data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false)
    const [lessonName, setLessonName] = useState("")
    const [addLessonToClass] = usePostNewLessonMutation();

    const handleAddLesson = async (event) => {
        try {
            event.preventDefault();
            if (lessonName.trim() === "" || lessonName.length > 50) {
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
                        setAddError(false);
                        setAddAlreadyExistsError(false);
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
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <button
                className="add-button"
                onClick={handleClickOpen}>
                Add New Lesson
            </button>
            {addAlreadyExistsError &&
                <Alert severity="error">There is already a lesson with this name. Please revise the name to make it unique. </Alert>}
            {addError &&
                <Alert severity="error">Please make sure you enter a name that is 1 to 50 characters.</Alert>}
            <Dialog
                open={open}
                onClose={handleClose} >
                <Box sx={{ p: 3 }}>
                    <ClearIcon
                        sx={{ my: 1, ml: "80%" }}
                        className="delete-button"
                        onClick={handleClose} />
                    <Typography
                        sx={{ p: isMobile ? 1 : 3 }}
                        variant="h5">
                        Add Lesson:
                    </Typography>
                    <form onSubmit={handleAddLesson}>
                        <TextField
                            fullWidth
                            label="Lesson Name"
                            value={lessonName}
                            onChange={(event) => setLessonName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <Box sx={{ mx: "20%" }}>
                            <button
                                className="add-button"
                                type="submit">
                                Add Lesson
                            </button>
                        </Box>
                    </form>
                </Box>
            </Dialog>
        </div>
    )
}
export default AddLessonButton