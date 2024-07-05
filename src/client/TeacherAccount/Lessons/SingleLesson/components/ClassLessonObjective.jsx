import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react"
import { useGetSingleLessonQuery, useDeleteObjectiveMutation } from "../../../../../redux/api"

const ClassLessonObjective = ({ id }) => {
    const [deleteObjectiveAlert, setDelteObjectiveAlert] = useState(false);
    const [selectedObjective, setSelectedObjective] = useState(false);
    const { data, error, isLoading } = useGetSingleLessonQuery(id);
    const [deleteObjective] = useDeleteObjectiveMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", m: 1, p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", my: 1 }}>
                    Lesson Objectives:
                </Typography>
                {data.learningObjectives.map((objective) => (
                    <div key={objective.id}>
                        <Card
                            sx={{ borderRadius: "20px", m: 1, p: 1 }}
                            elevation={10}>
                            <Stack direction="row"
                                justifyContent="space-between">
                                <Typography
                                    variant="h6"
                                    sx={{ mr: 5 }}>
                                    {objective.objectiveName}
                                </Typography>
                                <button
                                    className="delete-button"
                                    style={{ maxHeight: "40px"}} //override margin in CSS
                                    onClick={() => {
                                        setDelteObjectiveAlert(true);
                                        setSelectedObjective(objective.id)
                                    }}>
                                    <DeleteForeverIcon sx={{ color: "white" }} />
                                </button>
                            </Stack>
                        </Card>
                        {deleteObjectiveAlert && selectedObjective === objective.id &&
                            <Alert
                                severity="error"
                                sx={{ m: 1 }}>
                                <Stack direction="column">
                                    <Typography variant="h6">
                                        Are you sure you want to delete this class?
                                    </Typography>
                                    <Typography variant="h6">
                                        Once you do it will be gone forever.
                                    </Typography>
                                    <Stack direction="row">
                                        <button
                                            onClick={() => setDelteObjectiveAlert(false)}
                                            className="add-button"
                                            style={{ width: "150px" }}>
                                            Keep Objective
                                        </button>
                                        <button
                                            onClick={() => deleteObjective(objective.id)}
                                            className="delete-button"
                                            style={{ width: "150px" }}>
                                            Delete Forever
                                        </button>
                                    </Stack>
                                </Stack>
                            </Alert>}
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default ClassLessonObjective