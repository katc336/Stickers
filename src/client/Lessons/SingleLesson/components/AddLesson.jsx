
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { useGetAllObjectivesQuery, usePostNewObjectiveMutation } from "../../../../redux/api"

const AddLesson = ({ id }) => {
    const [deleteObjectiveAlert, setDelteObjectiveAlert] = useState(false);
    const [addLessonObjective, setAddLessonObjective] = useState(false);
    const [addError, setAddError] = useState(null);
    const [objectiveName, setObjectiveName] = useState("");
    const { data: objData, error: objError, isLoading: objLoading } = useGetAllObjectivesQuery();
    const [addLessonObjectiveMutation] = usePostNewObjectiveMutation();
    if (objLoading) {
        return <div></div>
    }
    if (objError) {
        console.error(error)
    }
    const handleAddLessonObjective = async (event) => {
        try {
            event.preventDefault();
            const result = await addLessonObjectiveMutation({ id: Number(id), objectiveName })
            console.log(result)
            if (result.data) {
                setAddError(false);
                setAddLessonObjective(false)
                setObjectiveName("");
                console.log("Success!");
            } else {
                setAddError(true);
                console.log("Could not add objective");
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            {addError &&
                <Alert severity="error">There was an error updating this lesson.</Alert>}
            <button
                style={{ float: "right", marginBottom: "50px", width: "200px" }}
                className="add-button"
                onClick={() => { setAddLessonObjective(true) }}>
                Add Lesson Objective
            </button>
            {addLessonObjective &&
                <div style={{ float: "right" }}>
                    <form onSubmit={handleAddLessonObjective}>
                        {objData.length > 0
                            ? //if there are already objectices...
                            <div>
                                <Typography
                                    variant="h5"
                                    sx={{ mb: 1 }}>
                                    Select an existing objective:
                                </Typography>
                                {objData && objData.map((objective) => (
                                    <div key={objective.id}>
                                        <Stack direction="row">
                                            <input
                                                type="checkbox"
                                                value={objectiveName}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setObjectiveName(objective.objectiveName);
                                                    }
                                                }}
                                            />
                                            <Typography sx={{ ml: 1 }}>
                                                {objective.objectiveName}
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
                            Add New Ojective:
                        </Typography>
                        <TextField
                            multiline
                            label="Lesson Objective"
                            value={objectiveName}
                            onChange={(event) => setObjectiveName(event.target.value)}
                            sx={{ m: 3, width: 900 }} />
                        <button
                            className="add-button"
                            type="submit">
                            Add to Class
                        </button>
                    </form>
                </div>}
        </div>
    )
}
export default AddLesson