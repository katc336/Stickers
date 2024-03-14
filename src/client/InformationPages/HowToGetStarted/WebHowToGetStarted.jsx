import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import HomeNav from "../../Navigation/HomeNav"
import AllLessonsPage from "./images/AllLessonsPage.png"
import StudentProgressBarGraph from "./images/StudentProgressBarGraph.png"
import StudentProgressScatterChart from "./images/StudentProgressScatterChart.png"
import BarChart from "./images/BarChart.png"
import ClassPage from "./images/ClassPage.png"
import EmptyDashboard from "./images/EmptyDashboard.png"
import LessonPage from "./images/LessonPage.png"
import ScatterChart from "./images/ScatterChart.png"
import InfoCard from "./components/InfoCard"
import CallToAction from "./components/CallToAction";
import { motion } from "framer-motion"

const WebHowToGetStarted = () => {
    return (
        <div>
            <HomeNav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}>
                <Card
                    elevation={10}
                    sx={{ mt: 15, mb: 1, mx: 1, p: 3, borderRadius: 10, backgroundColor: "transparent" }}
                >
                    <Typography
                        variant="h3"
                        sx={{ mx: 3, textAlign: "center" }}>
                        Welcome to Stickers!
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ mx: 3 }}>
                        Getting started is simple and intuitive, allowing you to quickly
                        track student data with confidence, and gain valuable insights into your student's progress.
                    </Typography>
                </Card>
                {/* <---------------------ROW 1---------------------> */}
                <InfoCard
                    writing={
                        `Upon logging in, you will be directed to your personalized dashboard.
                    Here, you can begin by adding a new class to your account.
                    Once your classes are set up, you can add students to each class and begin adding lessons.`
                    }
                    alert1={`Dashboard when you first make an account with no data.`}
                    img1={EmptyDashboard}
                    alt1={`View of dashboard when you first make an account with no data.`}
                    alert2={`View of My Class Page.`}
                    img2={ClassPage}
                    alt2={`View of My Class Page with Add Student and Add New Lesson buttons.`}
                />
                {/* <---------------------ROW 2---------------------> */}
                <InfoCard
                    writing={
                        `From the lesson page, you have the option to input specific lesson objectives
                    and track progress in those lesson objectives.`
                    }
                    alert1={`You can see all lessons per class in the "My Lessons" tab.`}
                    img1={AllLessonsPage}
                    alt1={`View of the All Lessons page with a list of English07 classes.`}
                    alert2={`Click on the "See Details" button to see an individual lesson.`}
                    img2={LessonPage}
                    alt2={`View of a singles lesson's page with lesson objectives, and a list of students 
                with their progress.`}
                />

                {/* <---------------------ROW 3---------------------> */}
                <InfoCard
                    writing={
                        `The progress overview feature allows you to view the overall progression of
                        all your students in relation to learning standards/objectives, giving you a
                        comprehensive understanding of your overall students' development and your teaching success.`
                    }
                    alert1={`Compare all students' average progress for a selected learning objective.`}
                    img1={ScatterChart}
                    alt1={`View of a scatter chart showing all students' average progress for a selected learning objective.`}
                    alert2={`See all your students averaged progress for all learning objectives.`}
                    img2={BarChart}
                    alt2={`View of a bar graph showing students averaged progress for all learning objectives.`}
                />
                {/* <---------------------ROW 4---------------------> */}
                <InfoCard
                    writing={
                        `For a more detailed look at individual student progress,
                        simply navigate to the "My Students" tab. Here, you can easily
                        access and monitor the growth of each student, ensuring that
                        every learner receives the attention and support they need.`
                    }
                    alert1={`See a student's progress in all learning objectives.`}
                    img1={StudentProgressBarGraph}
                    alt1={`View of a bar graph showing a student's progress in all learning objectives.`}
                    alert2={`See student's progress over time for a specific learning standard.`}
                    img2={StudentProgressScatterChart}
                    alt2={`View of a scatter chart showing a student's progress over time for a specific learning standard.`}
                />
                {/* <---------------------ROW 5---------------------> */}
                <CallToAction />
            </motion.div>
        </div >
    )
}
export default WebHowToGetStarted