import Box from '@mui/material/Box';
import SearchBar from './components/SearchBar';
import { useGetUserQuery } from '../../redux/api';
import HelloCard from './components/HelloCard';
import NavDrawer from '../Navigation/NavDrawer';
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
        <div>
            <NavDrawer />
            <Box sx={{ ml: 20, mr: 3 }}>
                <SearchBar />
                <HelloCard name={data.name} />
                <ProgressChart />
                <MyClasses />
            </Box>
        </div>
    );
}
export default WebDashboard