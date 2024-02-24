import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const HelloCard = ({ name }) => {
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, m: 3}}>
                <Stack direction="row">
                    <Typography
                        variant="h4"
                        sx={{ color: "#0A1D56" }}>
                        Hello {name}. Here's to a great school day!
                    </Typography>
                </Stack>
            </Card>
        </div>
    )
}
export default HelloCard