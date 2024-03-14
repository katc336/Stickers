import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetAllStudentsByTeacherQuery, useDeleteStudentMutation } from "../../../redux/api"
import StudentSearch from "../SearchBar/StudentSearch"
import AddStudentForm from "./AddStudentForm"
import CookieSticker from "./images/CookieSticker.png"
import GrapeSticker from "./images/GrapeSticker.png"
import RootSticker from "./images/RootSticker.png"
import { motion } from "framer-motion"

const MobileAllStudents = () => {
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
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Box sx={{ mt: 10 }}>
                <Card
                    sx={{ borderRadius: "20px", p: 1 }}
                    elevation={10}>
                    <Typography
                        sx={{ textAlign: "center" }}
                        variant="h3">
                        All Students:
                    </Typography>
                    <StudentSearch data={data} />
                    <AddStudentForm
                        allStudedntData={data} />
                    {data && data.map((student) => (
                        <div key={student.id}>
                            <Card
                                sx={{ borderRadius: "20px", m: 1, p: 1 }}
                                elevation={10}>
                                <Grid container>
                                    <Grid item xs={1}>
                                        {student.averagedAllProgress === null ?
                                            <div></div>
                                            :
                                            <div>
                                                <img
                                                    width="40px"
                                                    src={
                                                        student.averagedAllProgress >= 90
                                                            ? CookieSticker
                                                            : student.averagedAllProgress >= 80
                                                                ? GrapeSticker
                                                                : RootSticker
                                                    }
                                                />
                                            </div>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="h5"
                                            sx={{ mt: 1, mx: 2 }}>
                                            {student.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/student/${student.id}`}>
                                            <button
                                                style={{ float: "none", marginTop: 5 }} //override float
                                                className="details-button">
                                                See Details
                                            </button>
                                        </Link>
                                    </Grid>
                                </Grid>
                                {student.averagedAllProgress === null ?
                                    <div>
                                        <Alert
                                            severity="info"
                                            sx={{ mt: 2, ml: 2 }}>
                                            No Data
                                        </Alert>
                                    </div>
                                    :
                                    <div>
                                        <Typography
                                            variant="h6"
                                            sx={{ mt: 1, ml: 2, textAlign: "center" }}>
                                            Average Progress: {Math.floor(student.averagedAllProgress)}%
                                        </Typography>
                                    </div>}
                                <Typography sx={{ textAlign: "center" }}>
                                    <button
                                        className="delete-button"
                                        style={{ width: "70px", marginTop: 30 }} //overrride CSS margin
                                        onClick={() => {
                                            setDeleteAlert(true);
                                            setSelectedStudent(student.id)
                                        }}>
                                        <DeleteForeverIcon sx={{ color: "white" }} />
                                    </button>
                                </Typography>
                                {deleteAlert && selectedStudent === student.id &&
                                    <Alert
                                        severity="error"
                                        sx={{ m: 1 }}>
                                        <Typography variant="h6">
                                            Are you sure you want to delete this student?
                                        </Typography>
                                        <Typography variant="h6">
                                            Once you do it will be gone forever.
                                        </Typography>
                                        <button
                                            onClick={() => setDeleteAlert(false)}
                                            className="add-button"
                                            style={{ width: "150px" }}>
                                            Keep Student
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(student.id)}
                                            className="delete-button"
                                            style={{ width: "150px" }}>
                                            Delete Forever
                                        </button>\
                                    </Alert>
                                }
                            </Card>
                        </div>
                    ))}
                </Card>
            </Box>
        </motion.div>
    )
}
export default MobileAllStudents