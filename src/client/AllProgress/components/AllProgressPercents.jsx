import { VictoryBar, VictoryTheme, VictoryLabel, VictoryChart, VictoryAxis } from 'victory';

const AllProgressPercents = ({ data }) => {
    return (
        <div>
            <VictoryChart
                theme={VictoryTheme.material}
                horizontal  // Set the chart to run horizontally
                domainPadding={{ x: 100, y: 1 }}
                style={{ parent: { width: "500px" } }}
            >
                horizontal
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
                        }
                    },
                }}
                    data={data.averageObjectives.map((average) => ({
                        x: average.objectiveName,
                        y: average.average,
                        label: `${average.objectiveName}: ${Math.floor(average.average)}%`,
                    }))}
                    labelComponent={<VictoryLabel dy={0} dx={-5} angle={0} textAnchor="end" style={{ fontSize: 10 }} />}
                />

            </VictoryChart>
        </div>
    )
}
export default AllProgressPercents