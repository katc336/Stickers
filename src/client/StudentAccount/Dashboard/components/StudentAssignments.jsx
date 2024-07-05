import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
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
                    <div key={assignment.id}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography>
                                    {assignment.dueDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>
                                    {assignment.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    {assignment.task}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default StudentAssignments