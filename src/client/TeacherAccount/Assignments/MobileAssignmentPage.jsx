import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import AddNewAssignment from "./components/AddNewAssignment"
import MapAssignments from "./components/MapAssignments"

const MobileAssignmentPage = () => {
    // const { data, error, isLoading } = 
    // if (isLoading) {
    //     return <div></div>
    // }
    // if (error) {
    //     console.error(error)
    // }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            <Box sx={{ mt: 15, ml: 1, mr: 1 }}>
                <Card sx={{ borderRadius: "20px", p: 1 }} elevation={10}>
                    <Typography sx={{ textAlign: "center" }} variant="h3">
                        All Assignments:
                    </Typography>
                    <Box sx={{ my: 3 }}>
                        <AddNewAssignment />
                    </Box>
                    <MapAssignments />
                </Card>
            </Box>
        </motion.div>
    )
}
export default MobileAssignmentPage