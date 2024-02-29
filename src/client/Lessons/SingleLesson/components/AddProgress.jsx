import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { usePostProgressMutation } from "../../../../redux/api"

const AddProgress = ({ data, student }) => {
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedObjectiveId, setSelectedObjectiveId] = useState("");
    const [clearButton, setClearButton] = useState(true);
    const [selectedCombinedObjectiveId, setSelectedCombinedObjectiveId] = useState("");
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false)
    const [addError, setAddError] = useState(null);
    const [progress, setProgress] = useState("");
    const [addProgressMutation] = usePostProgressMutation();

    console.log(student);
    const handleAddProgress = async (event) => {
        try {
            event.preventDefault();
            const progressValue = Number(progress);
            if (progressValue < 0 || progressValue > 100) {
                setAddError(true);
                console.log("Progress percent must be between 0 and 100");
                return;
            } else {
                const progressAlreadyExists = student.studentProgress.some((objective) => objective.objectiveId === selectedObjectiveId);
                if (progressAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Student's progress already exists");
                    return;
                } else {
                    const result = await addProgressMutation({
                        studentId: Number(selectedStudentId),
                        objectiveId: Number(selectedObjectiveId),
                        progressPercent: Number(progress),
                        combinedObjectiveId: Number(selectedCombinedObjectiveId)
                    });
                    if (result.data) {
                        setClearButton(true);
                        setAddError(false);
                        setAddAlreadyExistsError(false);
                        setSelectedStudentId(null);
                        setProgress("");
                        console.log("Success!");
                    } else {
                        setAddError(true);
                        console.log("Could not add progress");
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <Stack direction="column">
                {clearButton &&
                    <button
                        style={{ width: 170 }}
                        onClick={() => { setSelectedStudentId(student.id), setClearButton(false) }}
                        className="details-button">
                        Add Progress
                    </button>
                }
                {addError &&
                    <Alert severity="error">
                        Progress was not saved: Number needs to be 0-100.
                    </Alert>}
                {selectedStudentId === student.id &&
                    <Card
                        sx={{ p: 1, m: 3 }}
                        elevation={10}>
                        <form onSubmit={handleAddProgress}>
                            <Stack direction="column">
                                <Typography variant="h5" sx={{ my: 1 }}>
                                    Select Learning Objective:
                                </Typography>
                                {data.learningObjectives.map((objective) => (
                                    <div key={objective.id}>
                                        <Stack direction="row">
                                            <input
                                                type="checkbox"
                                                value={""}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setSelectedObjectiveId(objective.id);
                                                        setSelectedCombinedObjectiveId(objective.combinedObjectiveId);
                                                        setAddError(false);
                                                    } else {
                                                        setObjectiveName("");
                                                    }
                                                }}
                                                checked={selectedObjectiveId === objective.id}
                                            />
                                            <Typography>
                                                {objective.objectiveName}
                                            </Typography>
                                        </Stack>
                                    </div>
                                ))}
                                <Typography variant="h5" sx={{ my: 1 }}>
                                    Enter Percentage of Success:
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Add a number from 1-100"
                                    value={progress}
                                    onChange={(event) => setProgress(event.target.value)}
                                    variant="filled"
                                    helperText={
                                        progress > 100 || progress < 0
                                            ? <Alert severity="error">Please enter a number from 0-100</Alert>
                                            : null
                                    }
                                    sx={{ my: 1 }}
                                />
                                {addAlreadyExistsError &&
                                    <Alert severity="error">
                                        <Typography>
                                            This student already has progress entered for this objective.
                                        </Typography>
                                        <Typography sx={{ mt: 1 }}>
                                            To edit their progress, delete their current progress, and enter a new percentage.
                                        </Typography>
                                    </Alert>}
                                <button className="add-button">
                                    Add {student.name}'s Progess
                                </button>
                            </Stack>
                        </form>
                    </Card>
                }
            </Stack>
        </div>
    )
}
export default AddProgress