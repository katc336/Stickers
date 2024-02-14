import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import { useGetClassesQuery } from "../../../redux/api"
import AddClassButton from "../../Dashboard/components/AddClass";
import NavDrawer from "../../Navigation/NavDrawer";
import { useState } from "react";
import WebSingleClass from "../SingleClass/WebSingleClass";

const WebAllClasses = () => {
    const { data, error, isLoading } = useGetClassesQuery();
    const [showClass, setShowClass] = useState(null);
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)
    return (
        <div>
            <NavDrawer />
            <Box>
                <Card
                    elevation={10}
                    sx={{ borderRadius: "20px", p: 5, my: 3, ml: 30, mr: 5 }}>
                    <AddClassButton />
                    <Stack direction="row">
                        {data && data.map((myClass) => (
                            <div key={myClass.id}>
                                <Card
                                    sx={{ p: 3, m: 1 }}
                                    elevation={5}>
                                    <Stack direction="column">
                                        <Typography
                                            variant="h6"
                                            sx={{ textAlign: "center", color: "#0A1D56", mb: 3 }}>
                                            {myClass.name}
                                        </Typography>
                                        <button onClick={() => setShowClass(myClass.id)}>
                                            See Class
                                        </button>
                                    </Stack>
                                </Card>
                                {showClass === myClass.id && <WebSingleClass id={myClass.id} />}
                            </div>
                        ))}
                    </Stack>
                </Card>
            </Box>
        </div>
    )
}
export default WebAllClasses