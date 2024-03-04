import Box from '@mui/material/Box';
import { useGetUserQuery } from '../../redux/api';
import HelloCard from './components/HelloCard';
import ProgressChart from './components/ProgressChart';
import MobileNav from "../Navigation/MobileNav"
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
        <div>
            <MobileNav />
            <Box sx={{ mt: 10 }}>
                <HelloCard name={data.name} />
                <ProgressChart />
                <MobileMyClasses />
            </Box>
        </div>
    )
}
export default MobileDashboard