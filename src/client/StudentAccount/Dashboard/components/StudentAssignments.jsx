import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { useMediaQuery, useTheme } from "@mui/material";

const StudentAssignments = ({ assingmentData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    console.log(assingmentData)
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: isMobile ? 1 : 3, m: isMobile ? 1 : 3 }}>
                {assingmentData.map((assignment) => (
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} key={assignment.id}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Stack direction="column">
                                    <Typography>
                                        {new Date(assignment.dueDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography>
                                        {new Date(assignment.dueTime).toLocaleTimeString()}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>
                                    {assignment.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>
                                    {assignment.task}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Link to={`/account_student/assignment/${assignment.id}`}>
                                    <button className="details-button">
                                        <Typography>
                                            See Assignment
                                        </Typography>
                                    </button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Card>
        </div>
    )
}
export default StudentAssignments