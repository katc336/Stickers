import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const StudentSearchResults = ({ results }) => {
    return (
        <>
            {results.length === 0 &&
                <Alert severity="error">
                    <Typography
                        variant="h6"
                        sx={{ py: 2 }}>
                        Sorry, there is no student with that name, or has these letters in their name.
                    </Typography>
                </Alert>
            }
            <Grid container>
                {results.map((student) => (
                    <Grid
                        key={student.id}
                        item xs={3}>
                        <Card
                            elevation={10}
                            sx={{ width: 250, p: 3, m: 3 }}
                            className="all-card">
                            <Typography
                                variant="h4"
                                sx={{ textAlign: "center", mb: 2 }}>
                                {student.name}
                            </Typography>
                            {student.averagedAllProgress === null ?
                                <div>
                                    <Alert
                                        severity="info"
                                        sx={{ mb: 1 }}>
                                        No Data
                                    </Alert>
                                    <Typography sx={{ textAlign: "center" }}>
                                        <Link to={`/student/${student.id}`} >
                                            <button
                                                style={{ margin: 0, float: "none" }}
                                                className="details-button">
                                                See Details
                                            </button>
                                        </Link>
                                    </Typography>
                                </div>
                                :
                                <div>
                                    <Typography
                                        variant="h6"
                                        sx={{ m: 1 }}>
                                        Average Progress: {Math.floor(student.averagedAllProgress)}%
                                    </Typography>
                                    <Typography sx={{ textAlign: "center" }}>
                                        <Link to={`/student/${student.id}`} >
                                            <button
                                                style={{ marginTop: 10, float: "none" }}
                                                className="details-button">
                                                See Details
                                            </button>
                                        </Link>
                                    </Typography>
                                </div>}
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </>
    )
}

export default StudentSearchResults;