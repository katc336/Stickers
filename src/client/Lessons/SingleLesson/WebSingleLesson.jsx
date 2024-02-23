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
                            <Typography
                                variant="h5">
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

                            <Typography
                                variant="h5">
                                Or add a new one:
                            </Typography>
                            <TextField
                                multiline
                                label="Lesson Objective"
                                value={objectiveName}
                                onChange={(event) => setObjectiveName(event.target.value)}
                                variant="filled"
                                sx={{ m: 3, width: 900 }} />
                            <button
                                className="add-button"
                                type="submit">
                                Add Lesson Objective
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
                                    <Typography sx={{ borderTop: "solid black 1px" }}>
                                        {objective.objectiveName}
                                    </Typography>
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
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        sx={{ borderBottom: "solid black 1px" }}>
                                        <Typography >
                                            {student.name}
                                        </Typography>
                                        {student.studentProgress.map((progress) => (
                                            <div key={progress.id}>
                                                <Typography
                                                    sx={{ mx: 1 }}>
                                                    {progress.learningObjective.objectiveName}
                                                </Typography>
                                                <Typography
                                                    sx={{ mx: 1 }}>
                                                    {progress.progressPrecent}
                                                </Typography>
                                            </div>
                                        ))}


                                        
                                        <Stack direction="column">
                                            <button
                                                style={{ width: 150 }}
                                                onClick={() => { setSelectedStudentId(student.id) }}
                                                className="details-button"
                                            >
                                                Add Progress
                                            </button>
                                            {selectedStudentId === student.id &&
                                                <form onSubmit={handleAddProgress}>
                                                    { data.learningObjectives.map((objective) => (
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
                                                    <TextField
                                                        multiline
                                                        label="Add Progress Percentage"
                                                        value={progress}
                                                        onChange={(event) => setProgress(event.target.value)}
                                                        variant="filled"
                                                        sx={{ m: 3, width: 100 }} />
                                                    <button className="details-button">
                                                        Add
                                                    </button>
                                                </form>
                                            }
                                        </Stack>
                                    </Stack>
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