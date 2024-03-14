import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { useGetSingleClassQuery } from "../../../redux/api"
import StudentForClass from "./components/StudentsForClass"
import AddStudentButton from "./components/AddStudentButton"
import LessonForClass from "./components/LessonForClass"
import AddLessonButton from "./components/AddLessonButton"

const WebSingleClass = () => {
    const { id } = useParams()

    const { data, error, isLoading } = useGetSingleClassQuery(id)
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 3, ml: 20 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data.name}
                </Typography>
                <Grid container>
                    {/* <--------------------------STUDENTS FOR CLASS--------------------------> */}
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 1, m: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ mb: 3, textAlign: "center" }}>
                                Students:
                            </Typography>
                            <StudentForClass data={data} />
                            <AddStudentButton
                                id={id}
                                data={data}
                            />
                        </Card>
                    </Grid>
                    {/* <--------------------------LESSONS FOR CLASS--------------------------> */}
                    <Grid item xs={6}>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 1, m: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ mb: 3, textAlign: "center" }}>
                                Lessons:
                            </Typography>
                            <LessonForClass data={data} />
                            <AddLessonButton
                                id={id}
                                data={data}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </motion.div>
    )
}
export default WebSingleClass