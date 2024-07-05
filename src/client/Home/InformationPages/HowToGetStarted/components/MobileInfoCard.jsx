import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const MobileInfoCard = ({ writing, alert1, alert2, img1, alt1, img2, alt2 }) => {
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", m: 1, p: 1, backgroundColor: "transparent" }}
            >
                <Typography
                    variant="h6"
                    sx={{ my: 1, mx: 3 }}>
                    {writing}
                </Typography>
                <Alert
                    sx={{ mx: 1 }}
                    severity="info">
                    {alert1}
                </Alert>
                <Box sx={{ mx: 4}}>
                    <img
                        style={{ margin: 3, borderRadius: 10, border: "2px #62709e solid" }}
                        src={img1}
                        width={290}
                        alt={alt1} />
                </Box>
                <Alert
                    sx={{ mx: 1 }}
                    severity="info">
                    {alert2}
                </Alert>
                <Box sx={{ mx: 4}}>
                    <img
                        style={{ margin: 3, borderRadius: 10, border: "2px #62709e solid" }}
                        src={img2}
                        width={290}
                        alt={alt2} />
                </Box>
            </Card>
        </div>
    )
}
export default MobileInfoCard