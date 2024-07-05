import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { usePostNewStudentMutation } from "../../../../../redux/api"
import { useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material";

const AddStudentButton = ({ id, data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false)
    const [addStudentToClass] = usePostNewStudentMutation();
    const [name, setName] = useState("")

    const handleAddStudent = async (event) => {
        try {
            event.preventDefault();

            if (name.trim() === "" || name.length > 30) {
                setAddError(true);
            } else {
                const studentAlreadyExists = data.students.some((student) => student.name === name);
                if (studentAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Student already exists");
                    return;
                } else {
                    const result = await addStudentToClass({ id: Number(id), name })
                    console.log(result)
                    if (result.data) {
                        setAddError(false)
                        setAddAlreadyExistsError(false)
                        setName("");
                        console.log("Success!");
                    } else {
                        setAddError(true);
                        console.log("Could not add student");
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
            {addAlreadyExistsError &&
                <Alert severity="error">
                    <Typography>
                        There is already a student with this name.
                    </Typography>
                    <Typography>
                        Please revise the name.
                    </Typography>
                    <Typography>
                        Example: Add the first initial of their last name.
                    </Typography>
                </Alert>}
            {addError &&
                <Alert severity="error">
                    Please make sure you enter a name that is 1 to 30 characters.
                </Alert>}
            <button
                className="add-button"
                onClick={handleClickOpen}>
                Add New Student
            </button>
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
                    Add Student:
                </Typography>
                <form onSubmit={handleAddStudent}>
                    <TextField
                        label="Student Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        variant="filled"
                        sx={{ my: 1 }} />
                        <Box sx={{ mx: "20%"}}>
                    <button
                        className="add-button"
                        type="submit">
                        Add Student
                    </button>
                    </Box>
                </form>
                </Box>
            </Dialog>
        </div>
    )
}
export default AddStudentButton