import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
// import UploadAvatar from './UpLoadAvatar';

const HelloCard = ({ name }) => {
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                <Grid container>
                    <Grid item xs={9}>
                        <Stack direction="row">
                        {/* Updating Code: Temporarily Removing functionality */}
                            {/* <UploadAvatar /> */} 
                            <Typography
                                variant="h3"
                                sx={{ ml: 3, mt: 1, color: "#0A1D56" }}>
                                Hello {name}.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                      
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default HelloCard