import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useParams } from "react-router-dom"
import { useGetSingleClassQuery } from "../../../redux/api"
import AddStudentButton from "./components/AddStudentButton"
import AddLessonButton from "./components/AddLessonButton"
import MobileNav from "../../Navigation/MobileNav"
import MobileStudentForClass from "./components/MobileStudentsForClass"
import MobileLessonForClass from "./components/MobileLessonForClass"

const MobileSingleClass = () => {
    const { id } = useParams()

    const { data, error, isLoading } = useGetSingleClassQuery(id)
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    return (
        <div>
            <MobileNav />
            <Card
                elevation={10}
                sx={{ p: 1, mt: 10 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data.name}
                </Typography>
                {/* <--------------------------STUDENTS FOR CLASS--------------------------> */}
                <Card
                    elevation={10}
                    sx={{ p: 1, m: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{ mb: 3, textAlign: "center" }}>
                        Students:
                    </Typography>
                    <AddStudentButton
                        id={id}
                        data={data}
                    />
                    <MobileStudentForClass data={data} />
                </Card>
                {/* <--------------------------LESSONS FOR CLASS--------------------------> */}
                <Card
                    elevation={10}
                    sx={{ p: 1, m: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{ mb: 3, textAlign: "center" }}>
                        Lessons:
                    </Typography>
                    <AddLessonButton
                        id={id}
                        data={data}
                    />
                    <MobileLessonForClass data={data} />
                </Card>
            </Card>
        </div>
    )
}
export default MobileSingleClass