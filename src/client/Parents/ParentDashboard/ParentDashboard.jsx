import Card from "@mui/material/Card"
import { useSelector } from "react-redux";
import { useGetParentQuery } from "../../../redux/api";

const ParentDashboard = () => {
    const { data, error, isLoading } = useGetParentQuery();
    const token = useSelector((state) => state.auth.token);
    console.log(data)
    console.log(token)
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", ml: 20, mr: 3, p: 3 }}>

            </Card>
        </div>
    )
}
export default ParentDashboard