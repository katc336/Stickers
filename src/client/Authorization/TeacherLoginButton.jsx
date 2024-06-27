import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import teacherImg from "../images/Teacher.png"
import { Link } from "react-router-dom"

const TeacherLoginButton = () => {
    return (
        <div>
            <Stack direction="row">
                <img
                    src={teacherImg}
                    width="200px"
                    style={{ position: "absolute", zIndex: -1, }}
                />
                <Stack
                    style={{ marginTop: "10%", marginLeft: "25%" }}
                    direction="column">
                    <Link to="/login">
                        <button
                            className="auth-button"
                            style={{ width: 230, height: 40, padding: 10 }}>
                            Teacher Login
                        </button>
                    </Link>
                </Stack>
            </Stack>
        </div>
    )
}
export default TeacherLoginButton