import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useParams } from "react-router-dom"
import { useStudentPostSubmissionMutation } from "../../../redux/api"
import { useGetSingleAssignmentsForStudentQuery } from "../../../redux/api"
import { useState } from "react"
import { motion } from "framer-motion"

const PostSubmission = () => {
  const { id } = useParams()
  const [submissionContetnt, setSubmissionContent] = useState("");
  const { data, error, isLoading } = useGetSingleAssignmentsForStudentQuery(id)
  if (isLoading) {
    return <div></div>
  }
  if (error) {
    console.error(error)
  }
  console.log(data)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}>
      <Card
        elevation={10}
        sx={{ borderRadius: "20px", p: 3, ml: 20 }}>
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
        <TextField
          label="Type assignment here"
          value={submissionContetnt}
          onChange={(event) => setSubmissionContent(event.target.value)}
          sx={{ width: "100%", mt: 3 }} />
      </Card>
    </motion.div>
  )
}
export default PostSubmission