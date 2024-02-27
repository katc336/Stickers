import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"

const InfoCard = ({ writing, alert1, alert2, img1, alt1, img2, alt2 }) => {
    return (
        <div>
            <Card
                elevation={10}
                sx={{ m: 1, p: 3, borderRadius: 10, backgroundColor: "transparent" }}
            >
                <Grid container>
                    <Grid item xs={3}>
                        <Typography
                            variant="h6"
                            sx={{ my: 1, mx: 3 }}>
                            {writing}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <Stack direction="column">
                                <Alert
                                    sx={{ mr: 3 }}
                                    severity="info">
                                    {alert1}
                                </Alert>
                                <img
                                    style={{ margin: 3, borderRadius: 10, border: "2px #62709e solid" }}
                                    src={img1}
                                    width={500}
                                    alt={alt1} />
                            </Stack>
                            <Stack direction="column">
                                <Alert
                                    sx={{ mr: 3 }}
                                    severity="info">
                                    {alert2}
                                </Alert>
                                <img
                                    style={{ margin: 3, borderRadius: 10, border: "2px #62709e solid" }}
                                    src={img2}
                                    width={500}
                                    alt={alt2} />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default InfoCard