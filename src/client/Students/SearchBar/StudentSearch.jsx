import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

import { useState } from 'react';
import StudentSearchResults from "./StudentSearchResult";

const StudentSearch = ({ data }) => {
    const [searchedStudent, setSearchedStudent] = useState("");
    const [showResult, setShowResult] = useState(false);

    const filteredStudent = () => data.filter((student) =>
        student.name.toLowerCase().includes(searchedStudent.toLowerCase())
    );
    const filteredSearch = filteredStudent(searchedStudent)

    const handleSearch = (event) => {
        event.preventDefault();
        setShowResult(true)
    }
    return (
        <>
            <form onSubmit={handleSearch}>
                <Grid container>
                    <Grid
                        sx={{ ml: 3 }}
                        item xs={10}>
                        <input
                            className="search-input"
                            type="text"
                            variant="filled"
                            label="Search Student By Name"
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
                            type="submit">
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