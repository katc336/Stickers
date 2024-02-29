import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

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
                        <Grid item xs={3}>
                            <Card
                                elevation={10}
                                sx={{ width: 250, height: 150, p: 3, m: 3 }}
                                className="all-card">
                                <Stack direction="column">
                                    <Typography
                                        variant="h6"
                                        sx={{ textAlign: "center", mb: 2 }}>
                                        {lesson.lessonName}
                                    </Typography>
                                        <Link to={`/lesson/${lesson.id}`} >
                                            <button
                                                style={{ position: "absolute", marginLeft: 35 }}//override float
                                                className="details-button">
                                                See Lesson Details
                                            </button>
                                        </Link>
                                </Stack>
                            </Card>
                        </Grid>
                    </div>
                ))
                }
            </Grid>
        </>
    )
}

export default LessonSearchResult;