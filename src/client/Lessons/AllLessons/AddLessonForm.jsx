import Alert from "@mui/material/Alert"
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom"
import { useState } from "react"
import { useGetClassesQuery, usePostNewLessonMutation } from "../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";

const AddLessonForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [lessonName, setLessonName] = useState("");
    const [date, setDate] = useState("");
    const { data, error, isLoading } = useGetClassesQuery();
    const [addLessonToClass] = usePostNewLessonMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    const handleAddLesson = async (event) => {
        try {
            event.preventDefault();
            setOpen(false);
            if (lessonName.trim() === "" || lessonName.length > 50) {
                setAddError(true);
            }
            else {
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
                    const result = await addLessonToClass({ id: Number(selectedClassId), lessonName, date })
                    console.log(result)
                    if (result.data) {
                        setAddError(false)
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
            {data.length === 0
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
                    <Box sx={{ my: isMobile ? 3 : 5, mx: 1 }}>
                        <button
                            className="add-button"
                            onClick={handleClickOpen}>
                            Add New Lesson
                        </button>
                    </Box>
                </div>
            }
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose} >
                    <ClearIcon
                        sx={{ my: 3,  ml: "80%" }}
                        className="delete-button"
                        onClick={handleClose} />
                    <Typography
                        sx={{ px: isMobile ? 1 : 3 }}
                        variant="h5">
                        Select the Lesson's Class:
                    </Typography>
                    <form onSubmit={handleAddLesson}>
                        {data.map((className) => (
                            <div key={className.id}>
                                <Stack
                                    sx={{ px: isMobile ? 1 : 5 }}
                                    direction="row">
                                    <input
                                        type="checkbox"
                                        value={""}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedClassId(className.id);
                                            } else {
                                                setSelectedClassId(null);
                                            }
                                        }} checked={selectedClassId === className.id}
                                    />
                                    <Typography>
                                        {className.name}
                                    </Typography>
                                </Stack>
                            </div>
                        ))}
                        <Typography
                            sx={{ mt: 3, px: isMobile ? 1 : 3 }}
                            variant="h5">
                            Add Lesson's Objective:
                        </Typography>
                        <Stack
                            sx={{ px: isMobile ? 1 : 3 }}
                            direction="column">
                            <TextField
                                label="Lesson's Date: dd/mm/yyyy"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                variant="filled"
                                sx={{ m: 1 }} />
                            <TextField
                                label="Lesson Name"
                                value={lessonName}
                                onChange={(event) => setLessonName(event.target.value)}
                                variant="filled"
                                sx={{ m: 1 }} />
                        </Stack>
                        <Typography sx={{ my: 3, textAlign: "center" }}>
                            <button
                                style={{ width: "150px" }}
                                className="add-button"
                                type="submit">
                                Add Lesson
                            </button>
                        </Typography>
                    </form>
                </Dialog>
            </div>
            {addError &&
                <Alert severity="error">
                    Please make sure you enter a name that is 1 to 50 characters.
                </Alert>}
            {addAlreadyExistsError &&
                <Alert severity="error">There is already a lesson with this name. Please revise the name to make it unique. </Alert>}
        </div>
    )
}
export default AddLessonForm