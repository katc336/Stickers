import Box from '@mui/material/Box';
import { useGetUserQuery } from '../../redux/api';
import HelloCard from './components/HelloCard';
import NavDrawer from '../Navigation/NavDrawer';
import ProgressChart from './components/ProgressChart';
import MyClasses from './components/MyClasses';
import MobileNav from "../Navigation/MobileNav"
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
                <MyClasses />
            </Box>
        </div>
    )
}
export default MobileDashboard