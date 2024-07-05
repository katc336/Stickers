import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom"
import { useState } from "react"
import { useGetClassesQuery, usePostNewStudentMutation } from "../../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";

const AddStudentForm = ({ allStudedntData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [name, setName] = useState("");
    const { data, error, isLoading } = useGetClassesQuery();
    const [addStudentToClass] = usePostNewStudentMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    const handleAddStudent = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || name.length > 30) {
                setAddError(true);
            } else {
                const studentAlreadyExists = allStudedntData.some((student) => student.name === name);
                if (studentAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Student already exists");
                    return;
                } else {
                    const result = await addStudentToClass({ id: Number(selectedClassId), name })
                    console.log(result)
                    if (result.data) {
                        setAddError(false);
                        setAddAlreadyExistsError(false);
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
            {data.length === 0
                ?
                <div>
                    <Alert severity="info">
                        <Stack direction="row">
                            <Typography variant="h5">
                                You need to add a class first before you add a student.
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
                    <Box sx={{ mx: isMobile ? 0 : 3, my: isMobile ? 2 : 3 }}>
                    <button
                        className="add-button"
                        onClick={handleClickOpen}>
                        Add New Student
                    </button>
                    </Box>
                </div>
            }
            <Dialog open={open}>
                <Box sx={{ px: 3}}>
                <ClearIcon
                    sx={{ my: 3, ml: "80%" }}
                    className="delete-button"
                    onClick={handleClose} />
                <form onSubmit={handleAddStudent}>
                    <Typography variant="h6">
                        Select Student's Class:
                    </Typography>
                    {data.map((className) => (
                        <div key={className.id}>
                            <Stack direction="row">
                                <input
                                    type="checkbox"
                                    value={""}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelectedClassId(className.id);
                                        } else {
                                            setSelectedClassId("");
                                        }
                                    }}
                                    checked={selectedClassId === className.id}
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
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <Box sx={{ ml: "15%", my: 3 }}>
                            <button
                                style={{ width: "150px" }}
                                className="add-button"
                                type="submit">
                                Add Student
                            </button>
                        </Box>
                    </Stack>
                </form>
                </Box>
            </Dialog>
            {addError &&
                <Alert severity="error">
                    Please make sure you enter a name that is 1 to 30 characters.
                </Alert>}
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
        </div>
    )
}
export default AddStudentForm