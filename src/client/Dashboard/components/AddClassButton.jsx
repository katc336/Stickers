import Textfield from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import { usePostNewClassMutation } from "../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";

const AddClassButton = ({ data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(false);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false);
    const [name, setName] = useState("");
    const [addClass] = usePostNewClassMutation();
    const handleAddClass = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || name.length > 50) {
                setAddError(true);
            } else {
                const classAlreadyExists = data.some((className) => className.name === name);
                if (classAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Class already exists");
                    return;
                } else {
                    const result = await addClass({ name });
                    console.log(result);
                    if (result.data) {
                        console.log("Success!" + result.data);
                        setAddError(false);
                        setAddAlreadyExistsError(false);
                        setName("");
                    } else {
                        console.error("Cannot add class");
                    }
                }
            }
        } catch (error) {
            return error.message;
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {addError &&
                <Alert
                    sx={{ mb: 5 }}
                    severity="error">
                    Please make sure you enter a name that is 1 to 50 characters.
                </Alert>
            }
            {addAlreadyExistsError &&
                <Alert severity="error">
                    There is already a class with this name. Please revise the name to make it unique.
                </Alert>}
            <button
                onClick={handleClickOpen}
                className="add-button">
                Add New Class
            </button>
            <Dialog
                open={open}
                onClose={handleClose} >
                <ClearIcon
                    sx={{ my: 3, ml: "80%" }}
                    className="delete-button"
                    onClick={handleClose} />
                <Typography
                    sx={{ p: isMobile ? 1 : 3 }}
                    variant="h5">
                    Add Class Name:
                </Typography>
                <form onSubmit={handleAddClass}>
                    <Stack
                        sx={{ px: isMobile ? 1 : 3 }}
                        direction="column">
                        <Textfield
                            fullWidth
                            size="small"
                            label="Class Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="filled"
                        />
                        <Box sx={{ ml: "25%", my:  3 }}>
                            <button
                                style={{ marginTop: "5px" }} //override margin styles for better alignent
                                className="add-button"
                                type="submit">
                                Add Class
                            </button>
                        </Box>
                    </Stack>
                </form>
            </Dialog>
        </div>
    )
}
export default AddClassButton