import Stack from "@mui/material/Stack"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"
import { VictoryScatter, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const CompareStudentProgress = ({ data }) => {
    const [selectedObjective, setSelectedObjective] = useState(23);

    const handleChange = (event) => {
        setSelectedObjective(event.target.value);
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
    console.log(averageForChart);
    return (
        <div>

            <Stack direction="column">
                <Box>
                    <FormControl
                        fullWidth>
                        <InputLabel>Learning Objective</InputLabel>
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

                <VictoryChart
                    theme={VictoryTheme.material}
                    style={{ parent: { width: "500px" } }}
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
                                    else if (datum.y >= 70 && datum.y <= 80) return "#F9B572";
                                    else if (datum.y >= 81 && datum.y <= 89) return "#FFE194";
                                    else return "#CDE990";
                                }
                            },
                        }}
                        size={7}
                        data={averageForChart.map((progress) => ({
                            x: progress.name,
                            y: Math.max(Math.floor(progress.average), 0), // Ensure no negative values
                            label: progress.average === -10 ? `${progress.name}:\nNo data` : `${progress.name}:\n${Math.floor(progress.average)}%`
                        }))}
                        labelComponent={<VictoryLabel dy={20} dx={40} angle={0} textAnchor="end" style={{ fontSize: 10 }} />}
                    />

                </VictoryChart>
            </Stack>
        </div>
    )
}
export default CompareStudentProgress