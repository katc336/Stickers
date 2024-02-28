import Textfield from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import { useState } from "react";
import { usePostNewClassMutation } from "../../../redux/api"
import Alert from "@mui/material/Alert";

const AddClassButton = ({ data }) => {
    const [addError, setAddError] = useState(false);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false);
    const [addButton, setAddButton] = useState(true);
    const [classForm, setClassForm] = useState(false);
    const [name, setName] = useState("");
    const [addClass] = usePostNewClassMutation();

    console.log(data)
    const handleAdd = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "") {
                setAddError(true);
            } else {
                const classAlreadyExists = data.some((className) => className.name === name);
                if (classAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Class already exists");
                    return;
                } else {
                    const result = await addClass({ name });
                    console.log(result);
                    if (result.data) {
                        console.log("Success!" + result.data);
                        setAddError(false);
                        setAddAlreadyExistsError(false);
                        setAddButton(true);
                        setClassForm(false);
                        setName("");
                    } else {
                        console.error("Cannot add class");
                    }
                }
            }
        } catch (error) {
            return error.message;
        }
    };
    return (
        <div>
            {addError &&
                <Alert
                    sx={{ mb: 5 }}
                    severity="error">
                    Please make sure you fill out the name.
                </Alert>
            }
            {addAlreadyExistsError &&
                <Alert severity="error">
                    There is already a class with this name. Please revise the name to make it unique.
                </Alert>}
            {
                addButton &&
                <button
                    className="add-button"
                    onClick={() => { setClassForm(true), setAddButton(false) }}
                >
                    Add New Class
                </button>
            }
            {classForm &&
                <form onSubmit={handleAdd}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Textfield
                                fullWidth
                                size="small"
                                label="Class Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <button
                                style={{ marginTop: "5px" }} //override margin styles for better alignent
                                className="add-button"
                                type="submit">
                                Add Class
                            </button>
                        </Grid>
                    </Grid>
                </form>
            }
        </div>
    )
}
export default AddClassButton