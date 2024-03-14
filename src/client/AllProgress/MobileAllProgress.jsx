import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetAllProgressQuery } from "../../redux/api";
import AllProgressPercents from "./components/AllProgressPercents";
import CompareStudentProgress from "./components/CompareStudentProgress";

const MobileAllProgress = () => {
    const { data, error, isLoading } = useGetAllProgressQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            {
                data.progress.length === 0
                    ?
                    <div>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 1, mt: 10 }}>
                            <Alert severity="info">
                                <Stack direction="row">
                                    <Typography
                                        variant="h5">
                                        There is no student data yet. Go to a class to get started!
                                    </Typography>
                                    <Link to="/my_classes">
                                        <button
                                            style={{ marginTop: 0, marginLeft: "10px", marginBottom: 0, marginRight: "10px" }}
                                            className="add-button">
                                            See Classes
                                        </button>
                                    </Link>
                                </Stack>
                            </Alert>
                        </Card>
                    </div>
                    :
                    <div>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", mt: 10, p: 1 }}
                        >
                            <Typography
                                variant="h4"
                                sx={{ textAlign: "center", mb: 3 }}
                            >
                                Progress Overview:
                            </Typography>
                            <Accordion
                                elevation={10}
                                sx={{ my: 1 }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDownwardIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    <Typography>
                                        Averaged Progress
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AllProgressPercents data={data} />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion elevation={10}>
                                <AccordionSummary
                                    expandIcon={<ArrowDownwardIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    <Typography>
                                        Compare Students
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CompareStudentProgress data={data} />
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                    </div>
            }
        </motion.div>
    )
}
export default MobileAllProgress
