import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import CookieSticker from "../images/CookieSticker.png"
import GrapeSticker from "../images/GrapeSticker.png"
import RootSticker from "../images/RootSticker.png"

const StudentForClass = ({ data }) => {
    return (
        <div>
            {data.students.map((student) => (
                <div key={student.id}>
                    <Grid container>
                        <Grid xs={1}>
                            {student.averagedAllProgress === null ?
                                <div></div>
                                :
                                <div>
                                    <img
                                    style={{ marginTop: 3 }}
                                        width="40px"
                                        src={
                                            student.averagedAllProgress >= 90
                                                ? CookieSticker
                                                : student.averagedAllProgress >= 80
                                                    ? GrapeSticker
                                                    : RootSticker
                                        }
                                    />
                                </div>
                            }
                        </Grid>
                        <Grid xs={3}>
                            <Typography
                                variant="h6"
                                sx={{ mt: 1, ml: 2 }}>
                                {student.name}
                            </Typography>
                        </Grid>
                        <Grid xs={5}>
                            {student.averagedAllProgress === null ?
                                <div>
                                    <Alert
                                        severity="info"
                                        sx={{ ml: 2 }}>
                                        No Data
                                    </Alert>
                                </div>
                                :
                                <div>
                                    <Typography
                                        sx={{ mt: 1.5, ml: 2 }}>
                                        Average Progress: {Math.floor(student.averagedAllProgress)}%
                                    </Typography>
                                </div>
                            }
                        </Grid>
                        <Grid xs={3}>
                            <Link to={`/student/${student.id}`}>
                                <button className="details-button">
                                    Student Details
                                </button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ borderBottom: "solid black 1px" }}>
                        <Stack direction="row">



                        </Stack>

                    </Stack>
                </div>
            ))}

        </div>
    )
}
export default StudentForClass