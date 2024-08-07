import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetClassesQuery, useDeleteClassMutation } from "../../../../redux/api"
import AddClassButton from "./AddClassButton";

const MyClasses = () => {
    const [deleteAlert, setDelteAlert] = useState(false);
    const [selectedClass, setSelectedClass] = useState(false);
    const { data, error, isLoading } = useGetClassesQuery();
    const [deleteClass] = useDeleteClassMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 5, m: 3 }}>
                <Stack direction="column">
                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center" }}>
                        All Classes:
                    </Typography>
                    <Box sx={{ mb: 10 }}>
                        <AddClassButton
                            data={data} />
                    </Box>
                    {data && data.map((myClass) => (
                        <div key={myClass.id}>
                            <Card
                                sx={{ borderRadius: "20px", p: 2, my: 1 }}
                                elevation={5}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-around">
                                    <Stack direction="column">
                                        <Typography
                                            variant="h4"
                                            sx={{ textAlign: "center", color: "#0A1D56" }}>
                                            {myClass.name}
                                        </Typography>
                                        <Link to={`/class/${myClass.id}`}>
                                            <button className="details-button">
                                                See Class Details
                                            </button>
                                        </Link>
                                    </Stack>
                                    <Stack
                                        direction="column"
                                        sx={{ mt: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ textAlign: "center", color: "#0A1D56" }}>
                                            {myClass.students.length} Students
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ textAlign: "center", color: "#0A1D56" }}>
                                            {myClass.lessons.length} Lessons
                                        </Typography>
                                    </Stack>
                                    <Box sx={{ mt: 2.5 }}>
                                        <button
                                            className="delete-button"
                                            onClick={() => {
                                                setSelectedClass(myClass.id);
                                                setDelteAlert(true)
                                            }}>
                                            <DeleteForeverIcon sx={{ color: "white" }} />
                                        </button>
                                    </Box>
                                </Stack>
                            </Card>
                            {deleteAlert && selectedClass === myClass.id &&
                                <Alert
                                    severity="error"
                                    sx={{ m: 1 }}>
                                    <Stack direction="column">
                                        <Typography sx={{mb: 1}} variant="h6">
                                            Are you sure you want to delete this class?
                                            Once you do it will be gone forever.
                                        </Typography>
                                        <Stack sx={{ ml: "45%" }} spacing={5} direction="row">
                                            <button
                                                onClick={() => { setDelteAlert(false) }}
                                                className="add-button"
                                                style={{ width: "150px" }}>
                                                Keep Class
                                            </button>
                                            <button
                                                onClick={() => deleteClass(myClass.id)}
                                                className="delete-button"
                                                style={{ width: "150px" }}>
                                                Delete Forever
                                            </button>
                                        </Stack>
                                    </Stack>
                                </Alert>}
                        </div>
                    ))}
                </Stack>
            </Card>
        </div>
    )
}
export default MyClasses