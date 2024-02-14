import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useGetSingleClassQuery } from "../../../redux/api"
import { usePostNewStudentMutation } from "../../../redux/api"
import { useState } from "react"

const WebSingleClass = ({ id }) => {
    const [add, setAdd] = useState(false);
    const [clearButton, setClearButton] = useState(true);
    const [addError, setAddError] = useState(null);
    const [name, setName] = useState("")
    const { data, error, isLoading } = useGetSingleClassQuery(id)
    const [addStudent] = usePostNewStudentMutation();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }

    const handleAdd = async (event) => {
        try {
            event.preventDefault();
            const result = await addStudent({ id, name })
            console.log(result)
            if (result.data) {
                setAddError(false);
                setAdd(false)
                console.log("Success!");
            } else {
                setAddError(true);
                console.log("Could not add student");
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.log(data)
    return (
        <div>
            <Card
                elevation={10}
                sx={{ p: 3 }}>
                <Typography>
                    {data.name}
                </Typography>
                {data.students.map((student) => (
                    <div key={student.id}>
                        <Typography>
                            {student.name}
                        </Typography>
                    </div>
                ))}
                {addError &&
                    <Alert severity="error">There was a mistake adding the student.</Alert>}
                {clearButton &&
                    <button onClick={() => { setAdd(true), setClearButton(false) }}>
                        Add Student
                    </button>
                }
                {add &&
                    <form onSubmit={handleAdd}>
                        <TextField
                            fullWidth
                            label="StudentName"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="filled"
                            sx={{ my: 1 }} />
                        <button type="submit">
                            Add to class
                        </button>
                    </form>}
            </Card>
        </div>
    )
}
export default WebSingleClass