import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import { useState } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const SelectProgressDate = ({ student }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    }
    const handleDateChange = (date) => setSelectedDate(date);
    const filteredStudent = student.filter((progress) => dayjs(progress.createdAt).isSame(selectedDate, "day"));
 
    return (
        <Box sx={{ mx: isMobile ? 1 : 3.5 }}>
            <Card elevation={10} sx={{ borderRadius: "20px", p: isMobile ? 1 : 3 }}>
                <Stack direction="row">
                    <Typography variant={isMobile ? "h6" :"h5"} sx={{ my: 2, mr: isMobile ? 1 : 3, color: "#0A1D56" }}>
                        Select Date:
                    </Typography>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                    />
                </Stack>
                {selectedDate && filteredStudent.length > 0 
                ? filteredStudent.map((progress) => (
                        <div key={progress.id}>
                            <Card
                                sx={{
                                    borderRadius: "20px",
                                    p: isMobile ? 1 : 2,
                                    border: 1,
                                    borderColor: progress.progressPrecent < 70 ? "red" : progress.progressPrecent >= 70 && progress.progressPrecent <= 79 ? "orange" : progress.progressPrecent >= 80 && progress.progressPrecent <= 89 ? "yellow" : "green",
                                    backgroundColor: progress.progressPrecent < 70 ? "#FEA1A1" : progress.progressPrecent >= 70 && progress.progressPrecent <= 79 ? "#FFC97C" : progress.progressPrecent >= 80 && progress.progressPrecent <= 89 ? "#F9DE79" : "#CDE990"
                                }}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography sx={{ color: "#0A1D56" }}>
                                            {formatDate(progress.createdAt)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ color: "#0A1D56" }}>
                                            {progress.learningObjective.objectiveName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography sx={{ color: "#0A1D56" }}>
                                            {progress.progressPrecent}%
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    ))
                 : //If no data for the selected date is found...
                    <Alert severity="info">
                        <Typography>
                            There's no progress found for the selected date
                        </Typography>
                    </Alert>
                }
            </Card>
        </Box>
    );
 }

 
 export default SelectProgressDate;
 