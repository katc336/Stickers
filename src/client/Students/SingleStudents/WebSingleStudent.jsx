import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useParams } from "react-router-dom"
import { useGetSingleStudentQuery } from "../../../redux/api"
import NavDrawer from "../../Navigation/NavDrawer"


const WebSingleStudent = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetSingleStudentQuery(id)

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
            <Card
                elevation={10}
                sx={{ p: 3, ml: 20, mr: 3 }}>
                <Typography>
                    {data.name}
                </Typography>
            </Card>
        </div>
    )
}
export default WebSingleStudent