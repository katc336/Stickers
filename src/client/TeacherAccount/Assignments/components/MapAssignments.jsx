import { useGetClassesQuery } from "../../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Alert from "@mui/material/Alert"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from "react";
import { useDeleteAssignmentMutation } from "../../../../redux/api";

const MapAssignments = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedAssignment, setSelectedAssignment] = useState(false);
    const [deleteAlert, setDelteAlert] = useState(false);
    const { data, error, isLoading } = useGetClassesQuery();
    const [deleteAssignment] = useDeleteAssignmentMutation();
    if (isLoading) {
        return <div />
    }
    if (error) {
        console.error(error)
    }
    console.log(selectedAssignment)
    return (
        <div>
            {data && data.map((className) => (
                <Accordion key={className.id}>
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="class-content">
                        <Typography variant="h5"> {className.name} </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {className.lessons.map((lesson) => (
                                <div key={lesson.id}>
                                    <Card key={lesson.id} sx={{ p: 1, m: 1 }}>
                                        <Typography variant="h6">{lesson.lessonName} </Typography>
                                        {lesson.Assignment.map((assignment) => (
                                            <div>
                                                <Stack sx={{ my: 2, }} direction="row">
                                                    <Stack direction={"column"}>
                                                        <Typography sx={{ marginRight: "auto" }}>
                                                            {assignment.name}
                                                        </Typography>
                                                    </Stack>
                                                    <Box sx={{ ml: 2, marginLeft: "auto" }}>
                                                        <button
                                                            className="delete-button"
                                                            onClick={() => { setSelectedAssignment(assignment.id); setDelteAlert(true); }}>
                                                            <DeleteForeverIcon sx={{ color: "white" }} />
                                                        </button>
                                                    </Box>
                                                </Stack>
                                                {deleteAlert && selectedAssignment === assignment.id &&
                                                    <Alert
                                                        severity="error"
                                                        sx={{ m: 1 }}>
                                                        <Stack direction="column">
                                                            <Typography sx={{ mb: 1 }}>
                                                                Are you sure you want to delete this assignment?
                                                                Once you do it and all student submissions for it will be gone forever.
                                                            </Typography>
                                                            <Stack sx={{ ml: "15%" }} spacing={5} direction="row">
                                                                <button
                                                                    onClick={() => { setDelteAlert(false) }}
                                                                    className="add-button"
                                                                    style={{ width: "180px" }}>
                                                                    Keep Assignment
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteAssignment(selectedAssignment)}
                                                                    className="delete-button"
                                                                    style={{ width: "180px" }}>
                                                                    Delete Forever
                                                                </button>
                                                            </Stack>
                                                        </Stack>
                                                    </Alert>}
                                            </div>
                                        ))}
                                    </Card>
                                </div>
                            ))}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
export default MapAssignments