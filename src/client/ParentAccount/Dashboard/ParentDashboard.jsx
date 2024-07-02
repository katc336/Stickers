import { useGetParentQuery } from "../../../redux/api"
import SelectProgressDate from "./components/SelectProgressDate";
import ParentHelloCard from "./components/ParentHelloCard";
import ParentProgressChart from "./components/ParentProgressChart";

const ParentDashboard = () => {
    const { data, error, isLoading } = useGetParentQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data);
    return (
        <div>
            <ParentHelloCard name={data.student.name} />
            <SelectProgressDate student={data.student.studentProgress} />
            <ParentProgressChart data={data.student} />
        </div>
    )
}
export default ParentDashboard