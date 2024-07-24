import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { useTeacherPostAssignmentMutation, useGetClassesQuery } from "../../../../redux/api";
import { useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AddNewAssignment = ({ objectiveId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(null);
    const [assignmentName, setAssignmentName] = useState("");
    const [task, setTask] = useState("");
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(false);
    const [selectedLessonName, setSelectedLessonName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [addNewAssignment] = useTeacherPostAssignmentMutation();
console.log(selectedDate)
    const { data, error, isLoading } = useGetClassesQuery();
    if (isLoading) {
        return <div />
    }
    if (error) {
        console.error(error)
    }
    const handleAddNewAssignment = async (event) => {
        try {
            event.preventDefault();
            if (assignmentName.trim() === "" || assignmentName.length > 50 || task.trim() === "") {
                setAddError(true);
            } else {
                const result = await addNewAssignment({ name: assignmentName, task, dueDate: selectedDate.$d, classId: Number(selectedClassId), lessonId: Number(selectedLessonId) })
                console.log(result)
                if (result.data) {
                    setAddError(false);
                    setAssignmentName("");
                    setOpen(false);
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
    const handleOpenClass = () => {
        setOpen(true);
    };
    const handleClickLesson = (lessonId, lessonName) => {
        setAnchorEl(null);
        setSelectedLesson(true);
        setSelectedLessonId(lessonId)
        setSelectedLessonName(lessonName)
    };
    const handleClickClass = (event, className) => {
        setSelectedClassId(className.id);
        setAnchorEl(event.currentTarget);
    };
    const handleAddLessonPopUp = () => {
        setOpen(false);
    };
    const handleLessonSelectAnchor = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <button
                className="add-button"
                onClick={handleOpenClass}>
                Add New Assignment
            </button>
            <Dialog
                open={open}
                onClose={handleAddLessonPopUp} >
                <Box sx={{ p: 3 }}>
                    <ClearIcon
                        sx={{ my: 1, ml: "80%" }}
                        className="delete-button"
                        onClick={handleAddLessonPopUp} />
                    <Typography sx={{ textAlign: "center" }} variant="h5">
                        Add Assignment:
                    </Typography>
                    <Typography variant="h6">
                        Select Class
                    </Typography>
                    <form onSubmit={handleAddNewAssignment}>
                        {data.map((className) => (
                            <div key={className.id}>
                                <Button
                                    variant="outlined"
                                    sx={{ mb: 2, borderColor: "#0A1D56" }}
                                    onClick={(event) => handleClickClass(event, className)}>
                                    <Typography sx={{ color: "#0A1D56" }}>
                                        {className.name}
                                    </Typography>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl && selectedClassId === className.id)}
                                    onClose={handleLessonSelectAnchor}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>
                                    <Typography sx={{ m: 2 }} variant="h6">Select Lesson:</Typography>
                                    {className.lessons.map((lesson) => (
                                        <MenuItem
                                            key={lesson.id}
                                            onClick={() => handleClickLesson(lesson.id, lesson.lessonName)}>
                                            <Typography>
                                                {lesson.lessonName}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        ))}
                        {selectedLesson &&
                            <Alert sx={{ my: 1, p: 1 }} severity="info">
                                Assignment's Lesson: {selectedLessonName}
                            </Alert>}
                        <DatePicker
                            value={selectedDate}
                            label="Due Date"
                            onChange={(date) => setSelectedDate(date)}
                            slotProps={{
                                textField: {
                                    helperText: 'MM/DD/YYYY',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Assignment Name"
                            value={assignmentName}
                            onChange={(event) => setAssignmentName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <TextField
                            fullWidth
                            label="Task"
                            multiline
                            value={task}
                            onChange={(event) => setTask(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        {addError &&
                            <Alert severity="error">Please make sure you enter a name (1-50 character) and task for the assignment.</Alert>}
                        <Box sx={{ mx: "20%" }}>
                            <button
                                className="add-button"
                                type="submit">
                                Add Assignment
                            </button>
                        </Box>
                    </form>
                </Box>
            </Dialog>
        </div>
    )
}
export default AddNewAssignment