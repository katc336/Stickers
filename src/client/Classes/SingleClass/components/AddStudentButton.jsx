import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField"
import { usePostNewStudentMutation } from "../../../../redux/api"
import { useState } from "react"

const AddStudentButton = ({ id }) => {
    const [clearStudentButton, setClearStudentButton] = useState(true);
    const [addError, setAddError] = useState(null);
    const [addStudent, setAddStudent] = useState(false);
    const [addStudentToClass] = usePostNewStudentMutation();

    const [name, setName] = useState("")
    const handleAddStudent = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "") {
                setAddError(true);
            } else {
                const result = await addStudentToClass({ id: Number(id), name })
                console.log(result)
                if (result.data) {
                    setAddError(false)
                    setAddStudent(false)
                    setClearStudentButton(true)
                    setName("");
                    console.log("Success!");
                } else {
                    setAddError(true);
                    console.log("Could not add student");
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            {clearStudentButton &&
                <button
                    className="add-button"
                    onClick={() => { setAddStudent(true), setClearStudentButton(false) }}>
                    Add New Student
                </button>
            }
            {addError &&
                    <Alert severity="error">There was an error adding the student.</Alert>}
            {addStudent &&
                <form onSubmit={handleAddStudent}>
                    <TextField
                        fullWidth
                        label="Student Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        variant="filled"
                        sx={{ my: 1 }} />
                    <button
                        className="add-button"
                        type="submit">
                        Add Student
                    </button>
                </form>}
        </div>
    )
}
export default AddStudentButton