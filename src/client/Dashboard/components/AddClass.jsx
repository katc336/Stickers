import Button from "@mui/material/Button"
import { useState } from "react";
import { usePostNewClassMutation } from "../../../redux/api"

const AddClassButton = () => {
    const [addButton, setAddButton] = useState(true);
    const [classForm, setClassForm] = useState(false);
    const [name, setName] = useState("");
    const [addClass] = usePostNewClassMutation();

    const handleAdd = async (event) => {
        try {
            event.preventDefault();
            const result = await addClass({ name });
            console.log("Success!");
            console.log(result);
        } catch (error) {
            return error.message;
        }
    };
    return (
        <div>
            {
                addButton &&
                <button
                    onClick={() => {setClassForm(true), setAddButton(false)}}>
                    Add New Class
                </button>
            }
            {classForm &&
                <div>
                    <form onSubmit={handleAdd}>
                        <input
                            type="text"
                            id="addClass"
                            name="search"
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                        <button
                            className="submit-button"
                            type="submit">
                            Add Class
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}
export default AddClassButton