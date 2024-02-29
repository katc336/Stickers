import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"

const LessonForClass = ({ data }) => {
    return (
        <div>
            {data.lessons.map((lesson) => (
                <div key={lesson.id}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography
                                variant="h6"
                                sx={{ mx: 3, mt: 0.5 }}>
                                {lesson.lessonName}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Link to={`/lesson/${lesson.id}`}>
                                <button className="details-button">
                                    Lesson Details
                                </button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    )
}
export default LessonForClass