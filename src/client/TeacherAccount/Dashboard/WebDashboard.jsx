import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import { useGetTeacherQuery } from '../../../redux/api';
import HelloCard from './components/HelloCard';
// import SearchBar from './components/SearchBar';
import ProgressChart from './components/ProgressChart';
import MyClasses from './components/MyClasses';

const WebDashboard = () => {
    const { data, error, isLoading } = useGetTeacherQuery();
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