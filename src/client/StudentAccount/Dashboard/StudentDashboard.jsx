import { useGetStudentAccountQuery } from "../../../redux/api"
const StudentDashboard = () => {
    const { data, error, isLoading } = useGetStudentAccountQuery();
    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data);
    return (
        <div>

        </div>
    )
}
export default StudentDashboard