import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { useGetClassesQuery, usePostNewStudentMutation } from "../../../redux/api"

const AddStudentForm = () => {
    const [addError, setAddError] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [name, setName] = useState("")
    const [addStudent, setAddStudent] = useState(false);
    const [clearStudentButton, setClearStudentButton] = useState(true);
    const { data, error, isLoading } = useGetClassesQuery();
    const [addStudentToClass] = usePostNewStudentMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)
    const handleAddStudent = async (event) => {
        try {
            event.preventDefault();
            if (name.trim() === "") {
                setAddError(true);
            } else {
                const result = await addStudentToClass({ id: Number(selectedClassId), name })
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
            {addStudent &&
                <form onSubmit={handleAddStudent}>
                    <Typography variant="h6">
                        Select Student's Class:
                    </Typography>
                    {data.map((className) => (
                        <div key={className.id}>
                            <Stack direction="row">
                                <input
                                    type="checkbox"
                                    value={""}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelectedClassId(className.id);
                                        }
                                    }}
                                />
                                <Typography>
                                    {className.name}
                                </Typography>
                            </Stack>
                        </div>
                    ))}
                    <Stack direction="column">
                        <TextField
                            label="Student Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1, width: "35%" }} />
                        <button
                        style={{ width: "150px" }}
                            className="add-button"
                            type="submit">
                            Add Student
                        </button>
                    </Stack>
                </form>}
        </div>
    )
}
export default AddStudentForm