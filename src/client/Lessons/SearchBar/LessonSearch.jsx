import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import LessonSearchResults from "./LessonSearchResult";

const LessonSearch = ({ data }) => {
    const [searchedLesson, setSearchedLesson] = useState("");
    const [showResult, setShowResult] = useState(false);

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
                    <Grid sx={{ ml: 3 }} item xs={10}>
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
                    <Grid item xs={1.5}>
                        <button
                            className="search-button"
                            type="submit"
                        >
                            <SearchIcon fontSize="large" />
                        </button>
                    </Grid>
                </Grid>
            </form>
            {showResult && <LessonSearchResults results={filteredSearch} />}
        </>
    );
};
export default LessonSearch;
