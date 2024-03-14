import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useUpdateAttendenceMutation } from '../../../../redux/api';

const AttendenceToggle = ({ studentData, studentId, lessonId }) => {
    const [attendance, setAttendence] = useState(studentData.attendances[0]?.present || false);
    const [updateAttendence] = useUpdateAttendenceMutation();
   
    return (
        <div>
            <Stack
                direction="row"
                sx={{ mt: .5 }}
                spacing={1}
                alignItems="center">
                <Typography>absent</Typography>
                <Switch
                    checked={attendance}
                    onChange={async () => {
                        const changeAttendance = !attendance;
                        const updatedAttendance = await updateAttendence({
                            attendance: changeAttendance,
                            studentId: Number(studentId),
                            lessonId: Number(lessonId),
                        });
                        setAttendence(changeAttendance);
                        console.log(updatedAttendance);
                    }}
                />
                <Typography>present</Typography>
            </Stack>
        </div>
    );
}

export default AttendenceToggle