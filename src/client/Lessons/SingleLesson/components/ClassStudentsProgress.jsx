import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react"
import { useGetSingleLessonQuery, useDeleteProgressMutation } from "../../../../redux/api"
import AddProgress from "./AddProgress"
import AttendenceToggle from "./AttendenceToggle"


const ClassStudentsProgress = ({ id }) => {
    const [deleteProgressAlert, setDelteProgressAlert] = useState(false);
    const [selectedProgress, setSelectedProgress] = useState(false);
    const { data, error, isLoading } = useGetSingleLessonQuery(id);
    const [deleteProgress] = useDeleteProgressMutation();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", m: 1, p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", my: 1 }}>
                    Students:
                </Typography>
                {data.class.students.map((student) => (
                    <div key={student.id}>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 1, m: 1 }}>
                            <Stack justifyContent="space-between">
                                <Typography variant="h6">
                                    {student.name}
                                </Typography>
                                <AttendenceToggle
                                    studentData={student}
                                    studentId={student.id}
                                    lessonId={id} />
                                {student.studentProgress.map((progress) => (
                                    <div key={progress.id}>
                                        <Card
                                            sx={{
                                                borderRadius: "20px",
                                                p: 1,
                                                border: 1,
                                                borderColor: progress.progressPrecent < 70 ? "red" : progress.progressPrecent >= 70 && progress.progressPrecent <= 79 ? "orange" : progress.progressPrecent >= 80 && progress.progressPrecent <= 89 ? "yellow" : "green",
                                                backgroundColor: progress.progressPrecent < 70 ? "#FEA1A1" : progress.progressPrecent >= 70 && progress.progressPrecent <= 79 ? "#FFC97C" : progress.progressPrecent >= 80 && progress.progressPrecent <= 89 ? "#F9DE79" : "#CDE990"
                                            }}>
                                            <Grid container>
                                                <Grid item xs={5}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ mx: 1 }}>
                                                        {progress.learningObjective.objectiveName}:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={isMobile ? 2 : 3}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ mx: 1 }}>
                                                        {progress.progressPrecent}%
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <button
                                                        className="delete-button"
                                                        style={{ width: "70px", marginTop: 0, marginBottom: 0, marginLeft: "65%" }} //override margin in CSS
                                                        onClick={() => {
                                                            setDelteProgressAlert(true);
                                                            setSelectedProgress(progress.id)
                                                        }}>
                                                        <DeleteForeverIcon sx={{ color: "white" }} />
                                                    </button>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        {deleteProgressAlert && selectedProgress === progress.id &&
                                            <Alert
                                                severity="error"
                                                sx={{ m: 1 }}>
                                                <Stack direction="column">
                                                    <Typography variant="h6">
                                                        Are you sure you want to delete this progress?
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        Once you do it will be gone forever.
                                                    </Typography>
                                                    <Stack direction="row">
                                                        <button
                                                            onClick={() => setDelteProgressAlert(false)}
                                                            className="add-button"
                                                            style={{ width: "150px" }}>
                                                            Keep Progress
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProgress(progress.id)}
                                                            className="delete-button"
                                                            style={{ width: "150px" }}>
                                                            Delete Forever
                                                        </button>
                                                    </Stack>
                                                </Stack>
                                            </Alert>}
                                    </div>
                                ))}
                                <AddProgress
                                    data={data}
                                    student={student} />
                            </Stack>
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default ClassStudentsProgress