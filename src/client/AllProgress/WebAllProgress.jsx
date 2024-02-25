import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import NavDrawer from "../Navigation/NavDrawer"
import { useGetAllProgressQuery } from "../../redux/api";
import { VictoryBar, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const WebAllProgress = () => {
    const { data, error, isLoading } = useGetAllProgressQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
    }
    console.log(data);
    return (
        <div>
            <NavDrawer />
            <Card
                elevation={10}
                sx={{ ml: 20, mr: 3, p: 3 }}
            >
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}
                >
                    Progress Overview:
                </Typography>
                <Card
                    elevation={10}
                    sx={{ m: 1, p: 1 }}
                >
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "center", p: 1 }}>
                        Lesson Objective Average Success Rate
                    </Typography>
                    {/*VICTORY BAR*/}
                    <VictoryChart
                        theme={VictoryTheme.material}
                        horizontal  // Set the chart to run horizontally
                        domainPadding={1}
                    >
                        horizontal
                        <VictoryAxis
                            dependentAxis
                            domain={[0, 100]}
                            tickFormat={ticket => `${ticket}%`}
                        />
                        <VictoryBar
                            style={{
                                data: {
                                    fill: data => {
                                        if (data.y > 70) return "red";
                                        else if (data.y >= 70 && data.y <= 80) return "orange";
                                        else if (data.y >= 81 && data.y <= 89) return "yellow";
                                        else return "green";
                                    }
                                }
                            }}
                            data={data.averageObjectives.map(average => ({
                                x: average.objectiveName,
                                y: average.average,
                                label: `Objective:${average.objectiveName}: ${average.average}%`
                            }))}
                            labelComponent={<VictoryLabel dy={-20} angle={1800} textAnchor="end" style={{ fontSize: 10 }} />}

                        />
                    </VictoryChart>

                </Card>
            </Card>
        </div>
    )
}
export default WebAllProgress
