import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useMediaQuery, useTheme } from "@mui/material";
import { VictoryBar, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const ParentProgressChart = ({ data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));


    return (
        <div>
            <Card elevation={10} sx={{ borderRadius: "20px", p: isMobile ? 2 : 3, m: isMobile ? 1 : 3 }}>
                <Typography
                    sx={{ textAlign: "center", color: "#0A1D56" }}
                    variant={isMobile ? "h6" : "h5"}>
                    Progress in Learning Standards
                </Typography>
                <VictoryChart
                    theme={VictoryTheme.material}
                    horizontal
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
                                    else if (datum.y >= 70 && datum.y <= 80) return "#F9B572";
                                    else if (datum.y >= 81 && datum.y <= 89) return "#FFE194";
                                    else return "#CDE990";
                                },
                            },
                        }}
                        data={data.studentProgress.map((progress) => ({
                            x: progress.learningObjective.objectiveName,
                            y: progress.progressPrecent,
                            label: `${progress.learningObjective.objectiveName}: ${progress.progressPrecent}%`,
                        }))}
                        labelComponent={<VictoryLabel
                            dy={0}
                            dx={0}
                            angle={0}
                            textAnchor="end"
                            style={{ fontSize: isMobile ? 10 : 7 }}
                        />}
                    />
                </VictoryChart>
            </Card>
        </div>
    );
};


export default ParentProgressChart;
