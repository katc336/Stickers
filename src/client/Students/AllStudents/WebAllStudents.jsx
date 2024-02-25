import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetAllStudentsByTeacherQuery, useDeleteStudentMutation } from "../../../redux/api"
import NavDrawer from "../../Navigation/NavDrawer"
import AddStudentForm from "./AddStudentForm"


const WebAllStudents = () => {
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(false);
    const { data, error, isLoading } = useGetAllStudentsByTeacherQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
    }
    console.log(data);
    return (
        <div>
            <NavDrawer />
            <Box sx={{ ml: 20, mr: 3 }}>
                <Card
                    sx={{ p: 1 }}
                    elevation={10}>
                    <Typography
                        sx={{ textAlign: "center" }}
                        variant="h3">
                        All Students:
                    </Typography>
                    <AddStudentForm />
                    {data && data.map((student) => (
                        <div key={student.id}>
                            <Card
                                sx={{ m: 1, p: 1 }}
                                elevation={10}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between">
                                    <Typography
                                        variant="h6"
                                        sx={{ mr: 2, mt: 0.5 }}>
                                        {student.name}
                                    </Typography>
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to={`/student/${student.id}`}>
                                        <button className="details-button">
                                            See Details
                                        </button>
                                    </Link>
                                    <button
                                        className="delete-button"
                                        style={{ width: "70px", margin: 0 }} //overrride CSS margin
                                        onClick={() => {
                                            setDeleteAlert(true);
                                            setSelectedStudent(student.id)
                                        }}>
                                        <DeleteForeverIcon sx={{ color: "white" }} />
                                    </button>
                                </Stack>
                                {deleteAlert && selectedStudent === student.id &&
                                    <Alert
                                        severity="error"
                                        sx={{ m: 1 }}>
                                        <Stack direction="column">
                                            <Typography variant="h6">
                                                Are you sure you want to delete this student?
                                            </Typography>
                                            <Typography variant="h6">
                                                Once you do it will be gone forever.
                                            </Typography>
                                            <Stack direction="row">
                                                <button
                                                    className="add-button"
                                                    style={{ width: "150px" }}>
                                                    Keep Student
                                                </button>
                                                <button
                                                    onClick={() => deleteStudent(student.id)}
                                                    className="delete-button"
                                                    style={{ width: "150px" }}>
                                                    Delete Forever
                                                </button>
                                            </Stack>
                                        </Stack>
                                    </Alert>
                                }
                            </Card>
                        </div>
                    ))}
                </Card>
            </Box>
        </div>
    )
}
export default WebAllStudents