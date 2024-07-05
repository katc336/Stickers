import Stack from "@mui/material/Stack"
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react"
import { useMediaQuery, useTheme } from "@mui/material";
import { VictoryScatter, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const CompareStudentProgress = ({ data }) => {
    const [selectedObjective, setSelectedObjective] = useState(null);
    const [showChart, setShowChart] = useState(false)
    const [noDataAlert, setNoDataAlert] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const handleChange = (event) => {
        setSelectedObjective(event.target.value);
        setShowChart(true);
    };
    const averageForChart = []
    const studentAverages = data.progress.map((student) => {
        //Filter by selected learning objective for the Victory Chart
        const combinedObjectiveIds = student.studentProgress
            .filter((progress) => progress.combinedObjectiveId === selectedObjective)
            .map((progress) => progress.progressPrecent);

        if (combinedObjectiveIds.length > 0) {
            let totalProgress = 0;
            for (let i = 0; i < combinedObjectiveIds.length; i++) {
                totalProgress += combinedObjectiveIds[i];
            }
            const averageProgress = totalProgress / combinedObjectiveIds.length;
            averageForChart.push({ name: student.name, average: averageProgress });
        } else {
            averageForChart.push({ name: student.name, average: -10 });

        }
    });
    if(selectedObjective){
        
    }
    //Inside useEffect to avoid infinite loop...
    useEffect(() => {
        const noData = averageForChart.some((data) => data.average === -10);
        if (noData) {
            setNoDataAlert(true)
        }
    }, []);
    
    return (
        <div>

            <Stack direction="column">
                <Box>
                    <FormControl
                        fullWidth>
                        <InputLabel>Select Learning Objective</InputLabel>
                        <Select
                            value={selectedObjective}
                            label="Learning Objective"
                            onChange={handleChange}
                        >
                            {data.averageObjectives.map((progress) => (
                                <MenuItem
                                    key={progress.id}
                                    value={progress.combinedObjectiveId}>
                                    {progress.objectiveName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {noDataAlert &&
                    <Alert severity="info">
                        <Typography>
                        There are some student's without progress added from some learning objectives.
                        </Typography>
                        <Typography>
                        They will appear on the bottom of the chart.
                        </Typography>
                    </Alert>}
                {showChart &&
                    <div style={{ overflowX: "auto" }}>
                        <VictoryChart
                            domain={{ x: [0, data.progress.length] }}
                            theme={VictoryTheme.material}
                            style={{ parent: { width: isMobile ? 300 : 800 } }}
                        >
                            <VictoryAxis
                                dependentAxis
                                domain={[0, 100]}
                                tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                            />
                            <VictoryScatter
                                style={{
                                    data: {
                                        fill: ({ datum }) => {
                                            if (datum.y < 70) return "#FF9280";
                                            else if (datum.y >= 70 && datum.y <= 79) return "#F9B572";
                                            else if (datum.y >= 80 && datum.y <= 89) return "#FFE194";
                                            else return "#CDE990";
                                        }
                                    },
                                }}
                                size={13}
                                data={averageForChart.map((progress) => ({
                                    symbol: "square",
                                    x: progress.name,
                                    y: Math.max(Math.floor(progress.average), 0), // Ensure no negative values
                                    label: progress.average === -10 ? `${progress.name}:\nNo data` : `${progress.name}:\n${Math.floor(progress.average)}%`
                                }))}
                                labelComponent={<VictoryLabel dy={7} dx={8} angle={0} textAnchor="end" style={{ fontSize: 4 }} />}
                            />
                        </VictoryChart>
                    </div>
                }
            </Stack>
        </div>
    )
}
export default CompareStudentProgress