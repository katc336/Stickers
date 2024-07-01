import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";
import LessonSearchResults from "./LessonSearchResult";

const LessonSearch = ({ data }) => {
    const [searchedLesson, setSearchedLesson] = useState("");
    const [showResult, setShowResult] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const filteredLesson = () => {
        const allLessons = data.flatMap((classData) => classData.lessons);
        return allLessons.filter((lesson) =>
            lesson.lessonName.toLowerCase().includes(searchedLesson.toLowerCase())
        );
    }
    const filteredSearch = filteredLesson();
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
                            label="Search Lesson By Name"
                            fullWidth
                            value={searchedLesson}
                            onChange={(event) => {
                                if (showResult === true) {
                                    setShowResult(false);
                                }
                                setSearchedLesson(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={isMobile ? 4 : 1.5}>
                        <Box sx={{ ml: 2 }}>
                        <button
                            className="search-button"
                            type="submit"
                        >
                            <SearchIcon fontSize="large" />
                        </button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            {showResult && <LessonSearchResults results={filteredSearch} />}
        </>
    );
};
export default LessonSearch;
