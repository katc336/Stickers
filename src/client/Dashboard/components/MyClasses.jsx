import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetClassesQuery, useDeleteClassMutation } from "../../../redux/api"
import AddClassButton from "./AddClass";

const MyClasses = () => {
    const [deleteAlert, setDelteAlert] = useState(false);
    const { data, error, isLoading } = useGetClassesQuery();
    const [deleteClass] = useDeleteClassMutation();
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
                sx={{ borderRadius: "20px", p: 5, my: 3 }}>
                <Stack direction="column">
                    <AddClassButton />
                    <Stack
                        direction="row"
                        useFlexGap flexWrap="wrap">
                        {data && data.map((myClass) => (
                            <div key={myClass.id}>
                                <Card
                                    sx={{ p: 3, m: 1 }}
                                    elevation={5}>
                                    <Stack direction="column">
                                        <Typography
                                            variant="h4"
                                            sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                                            {myClass.name}
                                        </Typography>
                                        <Link to={`/class/${myClass.id}`}>
                                            <button className="details-button">
                                                See Class Details
                                            </button>
                                        </Link>
                                        <Button
                                            onClick={() => setDelteAlert(true)}
                                            sx={{ mt: 5 }}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </Button>
                                    </Stack>
                                </Card>
                                {deleteAlert &&
                                    <Alert
                                        severity="error"
                                        sx={{ m: 1, maxWidth: 180 }}>
                                        Are you sure you want to delete this class? Once you do it will be gone forever
                                        <button className="add-button">
                                            Keep Class
                                        </button>
                                        <button 
                                         onClick={() => deleteClass(myClass.id)}
                                        className="delete-button">
                                            Delete Forever
                                        </button>
                                    </Alert>}
                            </div>
                        ))}
                    </Stack>
                </Stack>
            </Card>
        </div>
    )
}
export default MyClasses