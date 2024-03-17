import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import { motion } from "framer-motion";
import { useGetAllStudentsByTeacherQuery } from "../../redux/api"

const StudentCodes = () => {
    const { data, error, isLoading } = useGetAllStudentsByTeacherQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
    }
    console.log(data);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Card
                elevation={10}
                sx={{ ml: 20, borderRadius: "20px", p: 3 }}>
                <Typography
                    sx={{ textAlign: "center" }}
                    variant="h3">
                    Student Codes:
                </Typography>
                <Alert
                    sx={{ mx: 1, borderRadius: "20px" }}
                    severity="info">
                    <Typography variant="h5">
                        In order to give parents access to see their student's progress, give them this code to register an account.
                    </Typography>
                </Alert>
                {data && data.map((student) => (
                    <div>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 3, m: 1 }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="h5">
                                        {student.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack direction="row">
                                        <Typography variant="h5">
                                            Student Code:
                                        </Typography>
                                        <Typography
                                        variant="h6"
                                            sx={{ ml: 2, p: 0.5, color: "#850202", backgroundColor: "#fafd99", borderRadius: "20px" }}
                                        >
                                            {student.studentCode}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                ))}
            </Card>
        </motion.div>
    )
}
export default StudentCodes