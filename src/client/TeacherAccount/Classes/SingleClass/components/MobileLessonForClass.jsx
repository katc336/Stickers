import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"

const MobileLessonForClass = ({ data }) => {
    return (
        <div>
            {data.lessons.map((lesson) => (
                <div key={lesson.id}>
                    <Grid container>
                        <Grid item xs={7}>
                            <Typography
                                variant="h6"
                                sx={{ mx: 3, mt: 0.5 }}>
                                {lesson.lessonName}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Link to={`/lesson/${lesson.id}`}>
                                <button className="details-button">
                                    See Details
                                </button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    )
}
export default MobileLessonForClass