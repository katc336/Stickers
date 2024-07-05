import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useMediaQuery, useTheme } from "@mui/material";

const ParentHelloCard = ({ name }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: isMobile ? 1 : 3, m: isMobile ? 1 : 3 }}>
                <Grid container>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <Typography
                                variant="h5"
                                sx={{ ml: 3, mt: 1, color: "#0A1D56" }}>
                                Hello {name}'s Parent/Guardian
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </Card>
    )
}
export default ParentHelloCard