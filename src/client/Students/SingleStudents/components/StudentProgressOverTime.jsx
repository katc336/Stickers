import Stack from "@mui/material/Stack"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"
import { VictoryScatter, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const StudentProgressOverTime = ({ data }) => {
    const [selectedObjective, setSelectedObjective] = useState("");

    const handleChange = (event) => {
        setSelectedObjective(event.target.value);
    };
    //Filter by selected learning objective for the Victory Chart
    const filterBySelect = data.student.studentProgress.filter((progress) => (
        progress.combinedObjectiveId === selectedObjective
    ));

    console.log(filterBySelect)

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
                        data={filterBySelect.map((progress) => ({
                            x: progress.createdAt,
                            y: Math.floor(progress.progressPrecent),
                            label: Math.floor(progress.progressPrecent)
                        }))}
                        labelComponent={<VictoryLabel dy={20} dx={5} angle={0} textAnchor="end" style={{ fontSize: 10 }} />}
                    />

                </VictoryChart>
            </Stack>
        </div>
    )
}
export default StudentProgressOverTime