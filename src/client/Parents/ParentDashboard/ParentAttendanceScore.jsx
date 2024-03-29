import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux";
import { useGetParentQuery } from "../../../redux/api";
import ParentNavDrawer from "../../Navigation/ParentNavDrawer";

const ParentAttendanceScore = () => {
    const token = useSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetParentQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)
    console.log(token)
    return (
        <div>
            <ParentNavDrawer />
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", ml: 20, mr: 3, p: 3 }}>
                <Typography
                    sx={{ textAlign: "center" }}
                    variant="h3">
                    {data.student.name}'s Attendance and Daily Scores:
                </Typography>
                {data.student.studentProgress.map((objective) => (
                    <div key={objective.id}>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", m: 1, px: 3, py: 1 }}
                        >
                            <Grid container>
                                <Grid item xs={1}>
                                    <Typography >
                                        {new Date(objective.learningObjective.lesson.createdAt).toLocaleDateString('en-US')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography >
                                        {objective.learningObjective.lesson.attendances.map((attendance) => (
                                            !attendance.present
                                                ?
                                                <div>
                                                    <Alert
                                                        sx={{ mx: 4, p: 0 }}
                                                        severity="error">
                                                        Absent
                                                    </Alert>
                                                </div>
                                                :
                                                <div>
                                                    <Alert
                                                        severity="success"
                                                        sx={{ mx: 4, p: 0 }}>
                                                        Present
                                                    </Alert>
                                                </div>

                                        ))}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography>
                                        {objective.learningObjective.lesson.lessonName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        {objective.learningObjective.objectiveName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">
                                        {objective.progressPrecent}%
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default ParentAttendanceScore