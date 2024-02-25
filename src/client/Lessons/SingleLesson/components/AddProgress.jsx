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
    const [selectedCombinedObjectiveId, setSelectedCombinedObjectiveId] = useState("");
    const [addError, setAddError] = useState(null);
    const [progress, setProgress] = useState("");
    const [addProgressMutation] = usePostProgressMutation();

    const handleAddProgress = async (event) => {
        try {
            event.preventDefault();
            const result = await addProgressMutation({
                studentId: Number(selectedStudentId),
                objectiveId: Number(selectedObjectiveId),
                progressPercent: Number(progress),
                combinedObjectiveId: Number(selectedCombinedObjectiveId)
            });
            if (result.data) {
                setAddError(false);
                setSelectedStudentId(null);
                setProgress("");
                console.log("Success!");
            } else {
                setAddError(true);
                console.log("Could not add progress");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <Stack direction="column">
                <button
                    style={{ width: 170 }}
                    onClick={() => { setSelectedStudentId(student.id) }}
                    className="details-button">
                    Add New Progress
                </button>
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
                                                    }
                                                }}
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
                                    multiline
                                    fullWidth
                                    label="Add a number from 1-100"
                                    value={progress}
                                    onChange={(event) => setProgress(event.target.value)}
                                    variant="filled"
                                    sx={{ my: 1 }}
                                />
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