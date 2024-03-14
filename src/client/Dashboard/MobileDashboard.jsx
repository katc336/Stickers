import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import { useGetUserQuery } from '../../redux/api';
import HelloCard from './components/HelloCard';
import ProgressChart from './components/ProgressChart';
import MobileMyClasses from './components/MobileMyClasses';

const MobileDashboard = () => {
    const { data, error, isLoading } = useGetUserQuery();
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
            <Box sx={{ mt: 10 }}>
                <HelloCard name={data.name} />
                <ProgressChart />
                <MobileMyClasses />
            </Box>
        </motion.div>
    )
}
export default MobileDashboard