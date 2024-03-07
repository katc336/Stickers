import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from 'react';
import StudentSearchResults from "./StudentSearchResult";

const StudentSearch = ({ data }) => {
    const [searchedStudent, setSearchedStudent] = useState("");
    const [showResult, setShowResult] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
                    <Grid item xs={isMobile ? 8 : 10}>
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
                    <Grid item xs={isMobile ? 4 : 1.5}>
                        <Box sx={{ ml: 2 }}>
                            <button
                                className="search-button"
                                type="submit">
                                <SearchIcon fontSize="large" />
                            </button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            {showResult &&
                <StudentSearchResults results={filteredSearch} />}
        </>
    );
};
export default StudentSearch;