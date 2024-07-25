import { useGetClassesQuery } from "../../../../redux/api"
import { useMediaQuery, useTheme } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MapAssignments = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { data, error, isLoading } = useGetClassesQuery();
    if (isLoading) {
        return <div />
    }
    if (error) {
        console.error(error)
    }
    return (
        <div>
            {data && data.map((className) => (
                <Accordion key={className.id}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="class-content"
                    >
                        <Typography variant="h5"> {className.name} </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {className.lessons.map((lesson) => (
                                <div key={lesson.id}>
                                    <Card key={lesson.id} sx={{ p: 1, m: 1 }}>
                                        <Typography variant="h6">{lesson.lessonName} </Typography>
                                        {lesson.Assignment.map((assignment) => (
                                            <Button 
                                            variant="text"
                                            sx={{ textTransform: "none"}}
                                            >
                                                {assignment.name}
                                            </Button>
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