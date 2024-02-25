import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { usePostProgressMutation, useGetSingleLessonQuery } from "../../../../redux/api"
import AddProgress from "./AddProgress"


const ClassStudentsProgress = ({ id }) => {
    const { data, error, isLoading } = useGetSingleLessonQuery(id);

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)

    return (
        <div>
            <Card
                elevation={10}
                sx={{ m: 1, p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", my: 1 }}>
                    Students:
                </Typography>
                {data.class.students.map((student) => (
                    <div key={student.id}>
                        <Card
                            elevation={10}
                            sx={{ p: 1, m: 1 }}>
                            <Stack justifyContent="space-between">
                                <Typography variant="h6">
                                    {student.name}
                                </Typography>
                                {student.studentProgress.map((progress) => (
                                    <div key={progress.id}>
                                        <Card
                                            sx={{
                                                p: 1,
                                                border: 1,
                                                borderColor: progress.progressPrecent < 70 ? "red" : progress.progressPrecent >= 70 && progress.progressPrecent <= 80 ? "orange" : progress.progressPrecent >= 81 && progress.progressPrecent <= 89 ? "yellow" : "green",
                                                backgroundColor: progress.progressPrecent < 70 ? "#FEA1A1" : progress.progressPrecent >= 70 && progress.progressPrecent <= 80 ? "#FFC97C" : progress.progressPrecent >= 81 && progress.progressPrecent <= 89 ? "#F9DE79" : "#CDE990"
                                            }}>
                                            <Stack direction="row">
                                                <Typography
                                                    sx={{ mx: 1 }}>
                                                    {progress.learningObjective.objectiveName}:
                                                </Typography>
                                                <Typography
                                                    sx={{ mx: 1 }}>
                                                    {progress.progressPrecent}%
                                                </Typography>
                                            </Stack>
                                        </Card>
                                    </div>
                                ))}
                                <AddProgress
                                    data={data}
                                    student={student} />
                            </Stack>
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default ClassStudentsProgress