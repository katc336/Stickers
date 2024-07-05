import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const StudentAttendances = ({ data }) => {
    console.log(data)
    return (
        <div>
            {data.student.attendances.map((attendance) => (
                <div>
                    {!attendance.present
                        ?
                        <div>
                            <Alert
                                elevation={10}
                                sx={{ borderRadius: "20px", p: 1, m: 1 }}
                                severity="error">
                                <Stack direction="row">
                                    <Typography
                                        sx={{ mr: 2 }}
                                        variant="h6">
                                        {new Date(attendance.createdAt).toLocaleDateString('en-US')}:
                                    </Typography>
                                    <Typography variant="h6">
                                        Absent
                                    </Typography>
                                </Stack>
                            </Alert>
                        </div>
                        :
                        <div>
                            <Alert
                                elevation={10}
                                sx={{ borderRadius: "20px", p: 1, m: 1 }}
                                severity="success">
                                <Stack direction="row">
                                    <Typography
                                        sx={{ mr: 2 }}
                                        variant="h6">
                                        {new Date(attendance.createdAt).toLocaleDateString('en-US')}:
                                    </Typography>
                                    <Typography variant="h6">
                                        Present
                                    </Typography>
                                </Stack>
                            </Alert>
                        </div>}
                </div>
            ))}
        </div>
    )
}
export default StudentAttendances