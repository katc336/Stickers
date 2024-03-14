import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useMediaQuery, useTheme } from "@mui/material";
import { VictoryBar, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const StudentAllProgressPercents = ({ data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            {/* <--------------------------------------VICTORY CHART--------------------------------------> */}
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    horizontal  // Set the chart to run horizontally
                    domainPadding={{ x: 100, y: 1 }}
                    style={{ parent: { width: isMobile ? 300 : 800 } }}
                >
                    <VictoryAxis
                        dependentAxis
                        domain={[0, 100]}
                        tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    />
                    <VictoryBar
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
                        data={data.averageObjectives.map(average => ({
                            x: average.objectiveName,
                            y: average.average,
                            label: `${average.objectiveName}: ${average.average}%`
                        }))}
                        labelComponent={<VictoryLabel dy={0} dx={40} angle={0} textAnchor="end" style={{ fontSize: 10 }} />}
                    />
                </VictoryChart>
            </Card>
            {/* <--------------------------------------CARD--------------------------------------> */}
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                {data.averageObjectives.map((average) => (
                    <div key={average.id}>
                        <Card
                            sx={{
                                borderRadius: "20px",
                                p: 1,
                                border: `3px solid`,
                                borderColor: average.average < 70 ? "red" : average.average >= 70 && average.average <=79 ? "orange" : average.average >= 80 && average.average <= 89 ? "yellow" : "green",
                                backgroundColor: average.average < 70 ? "#FEA1A1" : average.average >= 70 && average.average <=79 ? "#FFC97C" : average.average >= 80 && average.average <= 89 ? "#F9DE79" : "#CDE990",
                            }}>
                            <Stack direction="row">
                                <Typography sx={{ mr: 1 }}>{average.objectiveName}:</Typography>
                                <Typography>{Math.floor(average.average)}% success</Typography>
                            </Stack>
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default StudentAllProgressPercents