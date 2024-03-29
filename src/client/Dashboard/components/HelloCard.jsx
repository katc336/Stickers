import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import UploadAvatar from './UpLoadAvatar';

const HelloCard = ({ name }) => {
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                <Stack direction="row">
                <UploadAvatar />
                    <Typography
                        variant="h3"
                        sx={{ ml: 3, mt: 1, color: "#0A1D56" }}>
                        Hello {name}.
                    </Typography>
                </Stack>
                <Stack direction="column">
                    <Typography>
                        Want to share your student's progress with their parents?
                    </Typography>
                    <Link to="/student_codes">
                        <button
                            style={{ width: 200 }}
                            className="auth-button">
                            Click here!
                        </button>
                    </Link>
                </Stack>
            </Card>
        </div>
    )
}
export default HelloCard