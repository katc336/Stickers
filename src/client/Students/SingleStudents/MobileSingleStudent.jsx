import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetSingleStudentQuery } from "../../../redux/api"
import MobileNav from "../../Navigation/MobileNav"
import StudentAllProgressPercents from "./components/StudentAllProgressPercents";
import StudentProgressOverTime from "./components/StudentProgressOverTime";

const MobileSingleStudent = () => {
    const [value, setValue] = useState("");
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleStudentQuery(id);
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const CustomTabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <div>
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <div>
            <MobileNav />
            <Card
                elevation={10}
                sx={{ mt: 10 }}>
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}>
                    {data && data.student.name}
                </Typography>
                {
                    data.student.studentProgress.length === 0
                        ?
                        <div>
                            <Alert severity="info">
                                <Typography>
                                    There is no data entered yet. You can add student progress in a class's lesson.
                                </Typography>
                            </Alert>
                        </div>
                        :
                        <div>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Averaged Progress" {...a11yProps(0)} />
                                        <Tab label="Progress Over Time" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <StudentAllProgressPercents data={data} />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <StudentProgressOverTime data={data} />
                                </CustomTabPanel>
                            </Box>
                        </div>
                }
            </Card>
        </div>
    )
}
export default MobileSingleStudent