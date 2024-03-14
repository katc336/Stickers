import { useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import MyClasses from "../../Dashboard/components/MyClasses";
import MobileMyClasses from "../../Dashboard/components/MobileMyClasses";

const AllClasses = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            {isMobile
                ?
                <div>
                    <Box sx={{ mt: 10 }}>
                        <MobileMyClasses />
                    </Box>
                </div>
                :
                <div>
                    <Box sx={{ ml: 20, mr: 3 }}>
                        <MyClasses />  {/* In dashboard folder: reusing component */}
                    </Box>
                </div>}
        </motion.div>
    )
}
export default AllClasses