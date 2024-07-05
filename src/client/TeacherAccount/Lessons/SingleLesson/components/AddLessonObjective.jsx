import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import { useState } from "react"
import { useGetAllObjectivesQuery, usePostNewObjectiveMutation } from "../../../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";

const AddLessonObjective = ({ id, data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false);
    const [objectiveName, setObjectiveName] = useState("");
    const { data: objData, error: objError, isLoading: objLoading } = useGetAllObjectivesQuery();
    const [addLessonObjectiveMutation] = usePostNewObjectiveMutation();

    if (objLoading) {
        return <div></div>
    }
    if (objError) {
        console.error(error)
    }
    //Filter to only show objective names once
    const uniqueObjective = []
    objData && objData.map((objective) => {
        if (!uniqueObjective.includes(objective.objectiveName)) {
            uniqueObjective.push(objective.objectiveName)
        }
    });
    const handleAddLessonObjective = async (event) => {
        try {
            event.preventDefault();
            // Check if the objective is already added to the lesson...
            const objectiveExists = data.learningObjectives.some((objective) => objective.objectiveName === objectiveName);
            if (objectiveExists) {
                setAddAlreadyExistsError(true);
                console.log("Objective already exists");
                return;
            }
            // Check the objecitve length to make sure it's not too long...
            if (objectiveName.trim() === "" || objectiveName.length > 100) {
                setAddError(true);
                console.log("Objective must be 50 characters or less");
                return;
            } else {
                const result = await addLessonObjectiveMutation({ id: Number(id), objectiveName })
                console.log(result)
                if (result.data) {
                    setAddError(false);
                    setAddAlreadyExistsError(false)
                    setObjectiveName("");
                    console.log("Success!");
                } else {
                    setAddError(true);
                    console.log("Could not add objective");
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setAddError(false),
            setAddAlreadyExistsError(false);
    };
    return (
        <div>
            <button
                style={{ float: "right", marginBottom: 50, width: 200 }}
                className="add-button"
                onClick={handleClickOpen}>
                Add Lesson Objective
            </button>
            <Dialog
                open={open}
                onClose={handleClose} >
                <Box sx={{ p: 3 }}>
                    <ClearIcon
                        sx={{ my: 1, ml: "90%" }}
                        className="delete-button"
                        onClick={handleClose} />
                    <form onSubmit={handleAddLessonObjective}>
                        {objData.length !== 0
                            ? //if there are already objectices...
                            <div>
                                <Typography
                                    variant="h5"
                                    sx={{ mb: 1 }}>
                                    Select an existing objective:
                                </Typography>
                                {uniqueObjective.map((objective) => (
                                    <div key={objective}>
                                        <Stack direction="row">
                                            <input
                                                type="checkbox"
                                                value={objective}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setObjectiveName(objective);
                                                    } else {
                                                        setObjectiveName("");
                                                    }
                                                }}
                                                checked={objectiveName === objective}
                                            />
                                            <Typography sx={{ ml: 1 }}>
                                                {objective}
                                            </Typography>
                                        </Stack>
                                    </div>
                                ))}
                            </div>
                            : //if there are no objectives, return an empty div
                            <div></div>}
                        <Typography
                            variant="h5"
                            sx={{ mt: 3 }}>
                            Add New Objective:
                        </Typography>
                        <TextField
                            fullWidth
                            label="Lesson Objective"
                            value={objectiveName}
                            onChange={(event) => setObjectiveName(event.target.value)}
                            helperText={
                                objectiveName.length > 100
                                    ? <Alert severity="error">Please enter a shorter objective</Alert>
                                    : null
                            } />
                            <Box sx={{ my: 3, ml: "35%"}}>
                        <button
                            className="add-button"
                            type="submit">
                            Add to Class
                        </button>
                        </Box>
                    </form>
                </Box>
                {
                    addError &&
                    <Alert sx={{ p: 3 }} severity="error">
                        Please make sure the objective is 1 to 30 characters to make sure they appear on the data visualization charts.
                    </Alert>}
                {addAlreadyExistsError &&
                    <Alert sx={{ p: 3 }} severity="error">
                        This objective has already been added to the class.
                    </Alert>
                }
            </Dialog>
        </div>
    )
}
export default AddLessonObjective