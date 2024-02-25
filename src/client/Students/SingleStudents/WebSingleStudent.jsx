import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import { useParams } from "react-router-dom"
import { useGetSingleStudentQuery } from "../../../redux/api"
import { VictoryBar, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';
import NavDrawer from "../../Navigation/NavDrawer"

const WebSingleStudent = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleStudentQuery(id)

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }

    console.log(data)
    return (
        <div>
            <NavDrawer />
            <Card
                elevation={10}
                sx={{ p: 3, ml: 20, mr: 3 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data && data.student.name}
                </Typography>
                {
                    data.student.studentProgress.length === 0
                        ?
                        <div>
                            <Alert severity="info">
                                <Typography>
                                    There is no data entered yet. You can add student progress in a class's lesson.
                                </Typography>
                            </Alert>
                        </div>
                        :
                        <div>

                            <VictoryChart
                                theme={VictoryTheme.material}
                                horizontal  // Set the chart to run horizontally
                                domainPadding={{ x: 1, y: 1 }}
                            >
                                <VictoryAxis
                                    dependentAxis
                                    domain={[0, 100]}
                                    tickFormat={ticket => `${ticket}%`}
                                />
                                <VictoryBar
                                  data={data.averageObjectives.map(average => ({
                                    x: average.objectiveName,
                                    y: average.average,
                                    label: `Objective:${average.objectiveName}: ${average.average}%`
                                }))}
                    
                                    labelComponent={<VictoryLabel dy={-20} angle={1800} textAnchor="end" style={{ fontSize: 10 }} />}
                                />
                            </VictoryChart>
                        </div>
                }
            </Card>
        </div>
    )
}
export default WebSingleStudent