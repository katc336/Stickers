import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import CookieSticker from "../images/CookieSticker.png"
import GrapeSticker from "../images/GrapeSticker.png"
import RootSticker from "../images/RootSticker.png"

const MobileStudentForClass = ({ data }) => {
    return (
        <div>
            {data.students.map((student) => (
                <Box sx={{ borderBottom: 3, borderColor: 'divider', my: 1 }}>
                    <div key={student.id}>
                        <Grid container >
                            <Grid item xs={1}>
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
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    sx={{ mt: 1, ml: 2 }}>
                                    {student.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Link to={`/student/${student.id}`}>
                                    <button className="details-button">
                                        See Details
                                    </button>
                                </Link>
                            </Grid>
                        </Grid>
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
                                    sx={{ mt: 1, ml: 2 }}>
                                    {student.name}'s average progress: {Math.floor(student.averagedAllProgress)}%
                                </Typography>
                            </div>
                        }
                    </div>
                </Box>
            ))}
        </div>
    )
}
export default MobileStudentForClass