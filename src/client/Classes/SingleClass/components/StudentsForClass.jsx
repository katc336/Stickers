import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"

const StudentForClass = ({ data }) => {
    return (
        <div>
            {data.students.map((student) => (
                <div key={student.id}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ borderBottom: "solid black 1px" }}>
                        <Typography
                            variant="h6"
                            sx={{ mx: 3, mt: 0.5 }}>
                            {student.name}
                        </Typography>
                        <Link to={`/student/${student.id}`}>
                            <button className="details-button">
                                Student Details
                            </button>
                        </Link>
                    </Stack>
                </div>
            ))}

        </div>
    )
}
export default StudentForClass