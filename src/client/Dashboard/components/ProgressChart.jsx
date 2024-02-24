import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useGetAllProgressQuery } from "../../../redux/api"

const ProgressChart = () => {
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
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                <Typography variant="h5">
                    Objective Average Progress:
                </Typography>
                {data.averageObjectives.map((average) => (
                    <div key={average.id}>
                        <Card
                            sx={{
                                p: 1,
                                border: `3px solid`,
                                borderColor: average.average < 70 ? "red" : average.average >= 70 && average.average <= 80 ? "orange" : average.average >= 81 && average.average <= 89 ? "yellow" : "green",
                                backgroundColor: average.average < 70 ? "#FEA1A1" : average.average >= 70 && average.average <= 80 ? "#FFC97C" : average.average >= 81 && average.average <= 89 ? "#F9DE79" : "#CDE990",
                            }}>
                            <Stack direction="row">
                                <Typography sx={{ mr: 1 }}>{average.objectiveName}:</Typography>
                                <Typography>{Math.floor(average.average)}% success</Typography>
                            </Stack>
                        </Card>
                    </div>
                ))}
            </Card>

            {/* <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, my: 3 }}>
                <Alert severity="info">
                    <Typography variant="h5">
                        There is not student data yet. Add a class to get started!
                    </Typography>
                </Alert>
            </Card> */}
        </div>
    )
}
export default ProgressChart