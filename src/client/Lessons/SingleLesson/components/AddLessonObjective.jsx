import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { useGetAllObjectivesQuery, usePostNewObjectiveMutation } from "../../../../redux/api"

const AddLessonObjective = ({ id, data }) => {
    const [addLessonObjective, setAddLessonObjective] = useState(false);
    const [addError, setAddError] = useState(null);
    const [clearButton, setClearButton] = useState(true);
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
            if (objectiveName.trim() === "" || objectiveName.length > 30) {
                setAddError(true);
                console.log("Objective must be 50 characters or less");
                return;
            } else {
                const result = await addLessonObjectiveMutation({ id: Number(id), objectiveName })
                console.log(result)
                if (result.data) {
                    setClearButton(true);
                    setAddError(false);
                    setAddAlreadyExistsError(false)
                    setAddLessonObjective(false)
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
    return (
        <div>
            {clearButton &&
                <button
                    style={{ float: "right", marginBottom: 50, width: 200 }}
                    className="add-button"
                    onClick={() => { setAddLessonObjective(true), setClearButton(false) }}>
                    Add Lesson Objective
                </button>
            }
            {addLessonObjective &&
                <div>
                    <Card
                        elevation={10}
                        sx={{ borderRadius: "20px", p: 3, m: 1 }}>
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
                                    objectiveName.length > 50
                                        ? <Alert severity="error">Please enter a shorter objective</Alert>
                                        : null
                                } />
                            <button
                                className="add-button"
                                type="submit">
                                Add to Class
                            </button>
                        </form>
                    </Card>
                    {addError &&
                        <Alert severity="error">
                            Please make sure the objective is 1 to 30 characters to make sure they appear on the data visualization charts.
                        </Alert>}
                    {addAlreadyExistsError &&
                        <Alert severity="error">
                            This objective has already been added to the class.
                        </Alert>}
                </div>}
        </div>
    )
}
export default AddLessonObjective