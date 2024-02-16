import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { useGetSingleLessonQuery, usePostNewObjectiveMutation } from "../../../redux/api"
import { useParams } from "react-router-dom";
import NavDrawer from "../../Navigation/NavDrawer"

const WebSingleLesson = () => {
    const { id } = useParams()
    const [addLessonObjective, setAddLessonObjective] = useState(false);
    const [clearButton, setClearButton] = useState(true);
    const [addError, setAddError] = useState(null);
    const [objectiveName, setObjectiveName] = useState("")

    const { data, error, isLoading } = useGetSingleLessonQuery(id);
    const [addLessonObjectiveObjective] = usePostNewObjectiveMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data);
    const handleAddLessonObjective = async (event) => {
        try {
            event.preventDefault();
            const result = await addLessonObjectiveObjective({ id: Number(id), objectiveName })
            console.log(result)
            if (result.data) {
                setAddError(false);
                setAddLessonObjective(false)
                console.log("Success!");
            } else {
                setAddError(true);
                console.log("Could not add student");
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <NavDrawer />
            <Card sx={{ ml: 20, mr: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", mx: 3 }}>
                    { data && data.lessonName}
                </Typography>
                {addError &&
                    <Alert severity="error">There was a mistake adding this objective.</Alert>}
                {clearButton &&
                    <button
                        className="details-button"
                        onClick={() => { setAddLessonObjective(true), setClearButton(false) }}>
                        Add Lesson Objective
                    </button>
                }
                {addLessonObjective &&
                    <form onSubmit={handleAddLessonObjective}>
                        <TextField
                            multiline
                            label="Lesson Objective"
                            value={objectiveName}
                            onChange={(event) => setObjectiveName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <button
                            className="submit-button"
                            type="submit">
                            Add Lesson Objective
                        </button>
                    </form>}
                <Grid container>
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ m: 1, p: 1 }}>
                            {data.learningObjectives.map((objective) => (
                                <Typography>
                                    {objective.objectiveName}
                                </Typography>
                            ))}
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ m: 1, p: 1 }}>

                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default WebSingleLesson