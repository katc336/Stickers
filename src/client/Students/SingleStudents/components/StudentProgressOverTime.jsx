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
    const [showChart, setShowChart] = useState(false)

    const handleChange = (event) => {
        setSelectedObjective(event.target.value);
        setShowChart(true);
    };
    //Filter by selected learning objective for the Victory Chart
    const filterBySelect = data.student.studentProgress.filter((progress) => (
        progress.combinedObjectiveId === selectedObjective
    ));
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
                {showChart &&
                    <VictoryChart
                        theme={VictoryTheme.material}
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
                            size={7}
                            data={filterBySelect.map((progress) => ({
                                symbol: "square",
                                x: progress.createdAt,
                                y: Math.floor(progress.progressPrecent),
                                label: `${Math.floor(progress.progressPrecent)}%`
                            }))}
                            labelComponent={<VictoryLabel dy={3} dx={5} angle={0} textAnchor="end" style={{ fontSize: 5 }} />}
                        />
                    </VictoryChart>
                }
            </Stack>
        </div>
    )
}
export default StudentProgressOverTime