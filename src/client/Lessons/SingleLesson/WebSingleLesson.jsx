import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { useGetSingleLessonQuery, usePostNewObjectiveMutation, usePostProgressMutation, useGetAllObjectivesQuery } from "../../../redux/api"
import { useParams } from "react-router-dom";
import NavDrawer from "../../Navigation/NavDrawer"

const WebSingleLesson = () => {
    const { id } = useParams()
    const [addLessonObjective, setAddLessonObjective] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedObjectiveId, setSelectedObjectiveId] = useState("");
    const [selectedCombinedObjectiveId, setSelectedCombinedObjectiveId] = useState("");
    const [addError, setAddError] = useState(null);
    const [objectiveName, setObjectiveName] = useState("");
    const [progress, setProgress] = useState("");

    const { data, error, isLoading } = useGetSingleLessonQuery(id);
    const { data: objData, error: objError, isLoading: objLoading } = useGetAllObjectivesQuery();
    const [addLessonObjectiveMutation] = usePostNewObjectiveMutation();
    const [addProgressMutation] = usePostProgressMutation();
    if (isLoading || objLoading) {
        return <div></div>
    }
    if (error || objError) {
        console.error(error)
    }
    console.log(data)

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
            <NavDrawer />
            <Card sx={{ ml: 20, mr: 3, p: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", mx: 3 }}>
                    {data && data.lessonName}
                </Typography>
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
                <Grid container>
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ m: 1, p: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center", my: 1 }}>
                                Lesson Objectives:
                            </Typography>
                            {data.learningObjectives.map((objective) => (
                                <div key={objective.id}>
                                    <Card 
                                    sx={{ m: 1, p: 1 }}
                                    elevation={10}>
                                    <Typography>
                                        {objective.objectiveName}
                                    </Typography>
                                    </Card>
                                </div>
                            ))}
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ m: 1, p: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center", my: 1 }}>
                                Students:
                            </Typography>
                            {data.class.students.map((student) => (
                                <div key={student.id}>
                                    <Card 
                                    elevation={10}
                                    sx={{ p: 1, m: 1}}>
                                    <Stack justifyContent="space-between">
                                        <Typography variant="h6">
                                            {student.name}
                                        </Typography>
                                        {student.studentProgress.map((progress) => (
                                            <div key={progress.id}>
                                                <Stack direction="row">
                                                    <Typography
                                                        sx={{ mx: 1 }}>
                                                        {progress.learningObjective.objectiveName}:
                                                    </Typography>
                                                    <Typography
                                                        sx={{ mx: 1 }}>
                                                        {progress.progressPrecent}%
                                                    </Typography>
                                                </Stack>
                                            </div>
                                        ))}
                                        <Stack direction="column">
                                            <button
                                                style={{ width: 170, marginLeft: "70%" }}
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
                                    </Stack>
                                    </Card>
                                </div>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default WebSingleLesson