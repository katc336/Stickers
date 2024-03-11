import Textfield from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import { useState } from "react";
import { usePostNewClassMutation } from "../../../redux/api"
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const MobileAddClassButton = ({ data }) => {
    const [addError, setAddError] = useState(false);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false);
    const [addButton, setAddButton] = useState(true);
    const [classForm, setClassForm] = useState(false);
    const [name, setName] = useState("");
    const [addClass] = usePostNewClassMutation();
    const handleAdd = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "" || name.length > 50) {
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
                    Please make sure you enter a name that is 1 to 50 characters.
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
                    <Textfield
                    sx={{ mt: 3 }}
                        fullWidth
                        size="small"
                        label="Class Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        variant="filled"
                    />
                    <Typography sx={{ mt: 3, textAlign: "center" }}>
                        <button
                            style={{ marginTop: 5, width: 200, padding: 8 }} //override margin styles for better alignent
                            className="add-button"
                            type="submit">
                            Add Class
                        </button>
                    </Typography>
                </form>
            }
        </div>
    )
}
export default MobileAddClassButton