import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom";
import { useGetClassesQuery } from "../../../redux/api"
import AddClassButton from "./AddClass";

const MyClasses = () => {
    const { data, error, isLoading } = useGetClassesQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)
    return (
        <div>
            <Card
                elevation={10}
                sx={{ borderRadius: "20px", p: 5, my: 3, height: 150 }}>
                {
                    data.length === 0
                        ? //if there are no classes...
                        <div>
                            <AddClassButton />
                        </div>
                        : //if there are classes
                        <div>
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
                                                <Link to={`/class/${myClass.id}`}>
                                                <button>
                                                    See Class
                                                </button>
                                                </Link>
                                            </Stack>
                                        </Card>
                                    </div>
                                ))}
                            </Stack>
                        </div>
                }
            </Card>
        </div>
    )
}
export default MyClasses