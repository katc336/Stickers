import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box'
import { useParams } from "react-router-dom"
import useGetSingleStudentQuery from "../../../../redux/api"
import StudentAllProgressPercents from "./components/StudentAllProgressPercents";
import StudentProgressOverTime from "./components/StudentProgressOverTime";
import { motion } from "framer-motion";

const MobileSingleStudent = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleStudentQuery(id);
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", mt: 10 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data && data.student.name}
                </Typography>
                {
                    data.student.studentProgress.length === 0
                        ?
                        <div>
                            <Alert severity="info">
                                <Typography>
                                    There is no data entered yet. You can add student progress in a class's lesson.
                                </Typography>
                            </Alert>
                        </div>
                        :
                        <div>
                            <Box sx={{ width: '100%' }}>
                                <Accordion
                                    elevation={10}
                                    sx={{ my: 3, mx: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDownwardIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header">
                                        <Typography>
                                            Averaged Progress
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <StudentAllProgressPercents data={data} />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion
                                    elevation={10}
                                    sx={{ my: 3, mx: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDownwardIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header">
                                        <Typography>
                                            Progress Over Time
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <StudentProgressOverTime data={data} />
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </div>
                }
            </Card>
        </motion.div>
    )
}
export default MobileSingleStudent