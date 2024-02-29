import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const LessonSearchResult = ({ results }) => {
    return (
        <>
            {results.length === 0 &&
                <Alert severity="error">
                    <Typography
                        variant="h6"
                        sx={{ py: 2 }}>
                        Sorry, there is no lesson with that name, or has these letters in their name.
                    </Typography>
                </Alert>
            }
            <Grid container>
                {results.map((lesson) => (
                    <div key={lesson.id}>
                        <Grid item xs={12}>
                            <Card
                                elevation={10}
                                sx={{ width: 250, p: 3, m: 3 }}
                                className="all-card">
                                <Typography
                                    variant="h4"
                                    sx={{ textAlign: "center", mb: 2 }}>
                                    {lesson.lessonName}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}></Grid> {/* Added for spacing */}
                        <Grid xs={4}>
                            <Link to={`/lesson/${lesson.id}`} >
                                <button
                                    style={{ float: "none" }}//override float
                                    className="details-button">
                                    See Lesson Details
                                </button>
                            </Link>
                        </Grid>
                        <Grid item xs={4}></Grid> {/* Added for spacing */}
                    </div>
                ))
                }
            </Grid>
        </>
    )
}

export default LessonSearchResult;