import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useParams } from "react-router-dom"
import { useStudentPostSubmissionMutation } from "../../../redux/api"
import { useGetSingleAssignmentsForStudentQuery } from "../../../redux/api";
import { useGetStudentAccountQuery } from "../../../redux/api"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

const PostSubmission = () => {
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [submissionContent, setSubmissionContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [submitAssignment] = useStudentPostSubmissionMutation();
  const { id } = useParams()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useGetStudentAccountQuery();
  const { data, error, isLoading } = useGetSingleAssignmentsForStudentQuery(id)
  if (studentIsLoading || isLoading) {
    return <div></div>
  }
  if (studentError) {
    console.error(studentError)
  }
  if (error) {
    console.error(error)
  }
  const studentId = studentData.id;
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (submissionContent.trim() === "" || submissionContent.length > 100000
        || submissionTitle.trim() === "" || submissionTitle.length > 50
      ) {
        setContentError(true);
      } else {
        // name, content, assignmentId, studentId
        const result = await submitAssignment({
          name: submissionTitle,
          content: submissionContent,
          assignmentId: id,
          studentId: studentId
        });
        console.log(result);
        if (result.data) {
          setContentError(false);
          console.log("Success!");
        } else {
          setContentError(true);
          console.log("Could not submit assignment");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}>
      <Card
        elevation={10}
        sx={{ borderRadius: "20px", p: 3, ml: isMobile ? 1 : 20, mt: isMobile ? 15 : 0 }}>
        <Alert severity="info">
          <Typography>
            {
              `This assignment is due on
                ${new Date(data.dueDate).toLocaleDateString()} at
                ${new Date(data.dueTime).toLocaleTimeString()} `
            }
          </Typography>
        </Alert>
        <Typography variant="h4" sx={{ textAlign: "center", my: 1 }}>
          {data && data.name}
        </Typography>
        <Typography>
          {data && data.task}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title of Assignment"
            value={submissionTitle}
            onChange={(event) => setSubmissionTitle(event.target.value)}
            sx={{ width: "50%", my: 3 }} />
          <TextField
            label="Type assignment here"
            value={submissionContent}
            onChange={(event) => setSubmissionContent(event.target.value)}
            sx={{ width: "100%", my: 3 }} />
          <button className="add-button" type="submit">
            Submit Assignment
          </button>
        </form>
        {contentError &&
          <Alert>
            Please add both the title and content for the assignment.
          </Alert>
        }
      </Card>
    </motion.div>
  )
}


export default PostSubmission
