import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import { motion } from "framer-motion";
import { useGetAllStudentsByTeacherQuery } from "../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";

const StudentCodes = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
                sx={{
                    mt: isMobile ? 20 : 0,
                    ml: isMobile ? 0 : 20,
                    borderRadius: "20px",
                    p: 3
                }}>
                <Typography
                    sx={{ textAlign: "center" }}
                    variant={isMobile ? "h5" : "h3"}>
                    Student's Parent Codes:
                </Typography>
                <Alert
                    sx={{ mx: 1, borderRadius: "20px" }}
                    severity="info">
                    <Typography variant={isMobile ? "" : "h5"}>
                        In order to give access to either parent or student accounts, give the corresponding codes in order to register.
                    </Typography>
                </Alert>
                {data && data.map((student) => (
                    <div>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: isMobile ? 1 : 3, m: 1 }}>
                            <Grid container>
                                <Grid item xs={isMobile ? 6 : 6}>
                                    <Typography
                                        sx={{ ml: isMobile ? 1 : 0 }}
                                        variant={isMobile ? "h6" : "h5"}>
                                        {student.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={isMobile ? 5 : 6}>
                                    <Stack direction="row">
                                        <Typography sx={{ p: 0.5 }}>
                                            Student Code:
                                        </Typography>
                                        <Typography sx={{ mx: 1, p: 0.5, color: "#850202", backgroundColor: "#fafd99", borderRadius: "20px" }}>
                                            {student.studentCode}
                                        </Typography>
                                        <Stack direction="row">
                                            <Typography sx={{ p: 0.5 }}>
                                                Parent Code:
                                            </Typography>
                                            <Typography sx={{ mx: 1, p: 0.5, color: "#850202", backgroundColor: "#fafd99", borderRadius: "20px" }}>
                                                {student.parentCode}
                                            </Typography>
                                        </Stack>
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