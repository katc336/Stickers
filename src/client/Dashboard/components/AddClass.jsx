import Textfield from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { useState } from "react";
import { usePostNewClassMutation } from "../../../redux/api"
import Alert from "@mui/material/Alert";

const AddClassButton = () => {
    const [addError, setAddError] = useState(false)
    const [addButton, setAddButton] = useState(true);
    const [classForm, setClassForm] = useState(false);
    const [name, setName] = useState("");
    const [addClass] = usePostNewClassMutation();

    const handleAdd = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "") {
                setAddError(true);
            } else {
                const result = await addClass({ name });
                console.log(result);
                if (result.data) {
                    console.log("Success!" + result.data);
                    setAddError(false);
                    setAddButton(true);
                    setClassForm(false);
                    setName("");
                } else {
                    console.error("Cannot add class");
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
                    <Stack direction="row">
                        <Textfield
                            size="small"
                            label="Class Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="filled"
                            sx={{ mr: 3, width: "90%" }}
                        />
                        <button
                            style={{ margin: "0px" }} //override margin styles for better alignent
                            className="add-button"
                            type="submit">
                            Add Class
                        </button>
                    </Stack>
                </form>
            }
        </div>
    )
}
export default AddClassButton