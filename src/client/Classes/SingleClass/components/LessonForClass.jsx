import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"

const LessonForClass = ({ data }) => {
    return (
        <div>
            {data.lessons.map((lesson) => (
                <div key={lesson.id}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ borderBottom: "solid black 1px" }}>
                        <Typography
                            variant="h6"
                            sx={{ mx: 3, mt: 0.5 }}>
                            {lesson.lessonName}
                        </Typography>
                        <Link to={`/lesson/${lesson.id}`}>
                            <button className="details-button">
                                Lesson Details
                            </button>
                        </Link>
                    </Stack>
                </div>
            ))}
        </div>
    )
}
export default LessonForClass