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

const MobileMyClasses = () => {
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
                sx={{ borderRadius: "20px", p: 1, m: 3 }}>
                <Stack direction="column">
                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center" }}>
                        All Classes:
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                        <AddClassButton
                            data={data} />
                    </Box>
                    {data && data.map((myClass) => (
                        <div key={myClass.id}>
                            <Card
                                sx={{ borderRadius: "20px", p: 2, my: 1 }}
                                elevation={5}>
                                <Typography
                                    variant="h4"
                                    sx={{ textAlign: "center", color: "#0A1D56" }}>
                                    {myClass.name}
                                </Typography>
                                <Typography sx={{ textAlign: "center" }}>
                                    <Link to={`/class/${myClass.id}`}>
                                        <button
                                            style={{ padding: 8, float: "none", width: 200 }}
                                            className="details-button">
                                            See Class Details
                                        </button>
                                    </Link>
                                </Typography>
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
                                <Typography sx={{ textAlign: "center" }}>
                                    <button
                                        className="delete-button"
                                        style={{ padding: 5, float: "none", width: 40 }}
                                        onClick={() => {
                                            setSelectedClass(myClass.id);
                                            setDelteAlert(true)
                                        }}>
                                        <DeleteForeverIcon sx={{ color: "white" }} />
                                    </button>
                                </Typography>
                            </Card>
                            {deleteAlert && selectedClass === myClass.id &&
                                <Alert
                                    severity="error"
                                    sx={{ m: 1 }}>
                                    <Stack direction="column">
                                        <Typography variant="h6">
                                            Are you sure you want to delete this class?
                                        </Typography>
                                        <Typography variant="h6">
                                            Once you do it will be gone forever.
                                        </Typography>
                                        <button
                                            onClick={() => { setDelteAlert(false) }}
                                            className="add-button">
                                            Keep Class
                                        </button>
                                        <button
                                            onClick={() => deleteClass(myClass.id)}
                                            className="delete-button" >
                                            Delete Forever
                                        </button>
                                    </Stack>
                                </Alert>}
                        </div>
                    ))}
                </Stack>
            </Card>
        </div>
    )
}
export default MobileMyClasses