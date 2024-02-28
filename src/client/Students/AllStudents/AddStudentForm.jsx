import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useGetClassesQuery, usePostNewStudentMutation } from "../../../redux/api"

const AddStudentForm = ({ allStudedntData }) => {
    const [addError, setAddError] = useState(null);
    const [addAlreadyExistsError, setAddAlreadyExistsError] = useState(false)
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [name, setName] = useState("")
    const [addStudent, setAddStudent] = useState(false);
    const [clearButton, setClearButton] = useState(true);
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
                const studentAlreadyExists = allStudedntData.some((student) => student.name === name);
                if (studentAlreadyExists) {
                    setAddAlreadyExistsError(true);
                    console.log("Student already exists");
                    return;
                } else {
                    const result = await addStudentToClass({ id: Number(selectedClassId), name })
                    console.log(result)
                    if (result.data) {
                        setAddError(false)
                        setAddAlreadyExistsError(false);
                        setAddStudent(false)
                        setClearButton(true)
                        setName("");
                        console.log("Success!");
                    } else {
                        setAddError(true);
                        console.log("Could not add student");
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {clearButton && data.length === 0
                ?
                <div>
                    <Alert severity="info">
                        <Stack direction="row">
                            <Typography variant="h5">
                                You need to add a class first before you add a student.
                            </Typography>
                            <Link to="/my_classes">
                                <button
                                    style={{ marginTop: 0, marginLeft: "10px", marginBottom: 0, marginRight: "10px" }}
                                    className="add-button">
                                    Go Add Class
                                </button>
                            </Link>
                        </Stack>
                    </Alert>
                </div>
                : <div>
                    {clearButton &&
                        <button
                            className="add-button"
                            onClick={() => { setAddStudent(true), setClearButton(false) }}>
                            Add New Student
                        </button>}
                </div>
            }
            {addError &&
                <Alert severity="error">
                    There was an error adding the student.
                </Alert>}
            {addAlreadyExistsError &&
                <Alert severity="error">
                    <Typography>
                        There is already a student with this name.
                    </Typography>
                    <Typography>
                        Please revise the name.
                    </Typography>
                    <Typography>
                        Example: Add the first initial of their last name.
                    </Typography>
                </Alert>}
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
                                        } else {
                                            setSelectedClassId("");
                                        }
                                    }}
                                    checked={selectedClassId === className.id}
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