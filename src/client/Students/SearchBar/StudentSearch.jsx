import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

import { useState } from 'react';
import { useGetAllStudentsByTeacherQuery } from "../../../redux/api";
import StudentSearchResults from "./StudentSearchResult";

const StudentSearch = ({ onSubmit }) => {
    const [searchedStudent, setSearchedStudent] = useState("");
    const [showResult, setShowResult] = useState(false);

    const { data, error, isLoading } = useGetAllStudentsByTeacherQuery();
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        console.error(error)
    }
    console.log("Data:" + data)
    const filteredStudent = () => data.filter((student) =>
        student.name.toLowerCase().includes(searchedStudent.toLowerCase())
    );
    const filteredSearch = filteredStudent(searchedStudent)
    console.log(filteredStudent(searchedStudent));

    return (
        <>
            {/*----------------------------------TEXT FIELD-------------------------------- */}

            <form>
                <Grid container>
                    <Grid 
                    sx={{ ml: 3 }}
                    item xs={10}>
                        <input
                            className="search-input"
                            type="text"
                            variant="filled"
                            label="Search Student By Name"
                            fullWidth
                            value={searchedStudent}
                            onChange={(event) => {
                                if (showResult === true) {
                                    setShowResult(false);
                                }
                                setSearchedStudent(event.target.value)
                            }} />
                    </Grid>
                    <Grid item xs={1.5}>
                        <button
                            className="search-button"
                            onClick={() => setShowResult(true)} >
                            <SearchIcon fontSize="large" />
                        </button>
                    </Grid>
                </Grid>
            </form>
            {showResult &&
                <StudentSearchResults results={filteredSearch} />}
        </>
    );
};
export default StudentSearch;