import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Link } from "react-router-dom"
import { useState } from "react"
import { useGetAllProgressQuery } from "../../../redux/api"
import AllProgressPercents from "../../AllProgress/components/AllProgressPercents"
import CompareStudentProgress from "../../AllProgress/components/CompareStudentProgress"

const ProgressChart = () => {
    const [value, setValue] = useState("");
    const { data, error, isLoading } = useGetAllProgressQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error);
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

            {
                data.progress.length === 0
                    ?
                    <div>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                            <Alert severity="info">
                                <Stack direction="row">
                                    <Typography
                                        variant="h5">
                                           There is no student data yet. Go to a class to get started!
                                    </Typography>
                                    <Link to="/my_classes">
                                        <button
                                            style={{ marginTop: 0, marginLeft: "10px", marginBottom: 0, marginRight: "10px" }}
                                            className="add-button">
                                            See Classes
                                        </button>
                                    </Link>
                                </Stack>
                            </Alert>
                        </Card>
                    </div>
                    :
                    <div>
                        <Card
                            elevation={10}
                            sx={{ borderRadius: "20px", p: 3, m: 3 }}>
                            <Card
                                elevation={10}
                                sx={{ borderRadius: "20px", m: 1, p: 1 }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Average Progress Across All Classes" {...a11yProps(0)} />
                                            <Tab label="Compare Students' Progress" {...a11yProps(1)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        <AllProgressPercents data={data} />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        <CompareStudentProgress data={data} />
                                    </CustomTabPanel>
                                </Box>
                            </Card>
                        </Card>
                    </div>
            }


        </div>
    )
}
export default ProgressChart