import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ParentAuthPage from "./ParentAuth/ParentAuhtPage";
import TeacherAuthPage from "./TeacherAuth/TeacherAuth";
import StudentAuthPage from "./StudentAuth/StudentAuth";

const AuthPage = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const CustomTabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (<div> {value === index && <Box sx={{ p: 1 }}> {children}</Box>}</div>);
    }
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <div>
            <Box sx={{ mt: 20, mx: isMobile ? 0 : 50 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Teacher" {...a11yProps(0)} />
                        <Tab label="Student" {...a11yProps(1)} />
                        <Tab label="Parent" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TeacherAuthPage />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <StudentAuthPage />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ParentAuthPage />
                </CustomTabPanel>
            </Box>
        </div>
    )
}
export default AuthPage
