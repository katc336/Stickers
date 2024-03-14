import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import { useGetUserQuery } from '../../redux/api';
import HelloCard from './components/HelloCard';
import ProgressChart from './components/ProgressChart';
import MyClasses from './components/MyClasses';

const WebDashboard = () => {
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
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Box sx={{ ml: 20, mr: 3 }}>
                {/* <SearchBar /> */}
                <HelloCard name={data.name} />
                <ProgressChart />
                <MyClasses />
            </Box>
        </motion.div>
    );
}
export default WebDashboard