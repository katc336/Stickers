import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import AddNewAssignment from "./components/AddNewAssignment"
import MapAssignments from "./components/MapAssignments"

const WebAssignmentPage = () => {
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
            <Box sx={{ ml: 20, mr: 3 }}>
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
export default WebAssignmentPage