import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { useGetAllLessonsQuery } from "../../../redux/api";
import { useState } from 'react';
import LessonSearchResults from "./LessonSearchResult";

const LessonSearch = ({}) => {
    const [searchedLesson, setSearchedLesson] = useState("");
    const [showResult, setShowResult] = useState(false);
    const { data, error, isLoading } = useGetAllLessonsQuery();
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        console.error(error)
    }
    console.log("Data:" + data)
    const filteredLesson = () => data.lessons.forEach(filter((lesson) =>
        lesson.lessonName.toLowerCase().includes(searchedLesson.toLowerCase())
    ));
    const filteredSearch = filteredLesson(searchedLesson)
    console.log(filteredLesson(searchedLesson));

    return (
        <>
            <form>
                <Grid container>
                    <Grid
                        sx={{ ml: 3 }}
                        item xs={10}>
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
                                setSearchedLesson(event.target.value)
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
                <LessonSearchResults results={filteredSearch} />}
        </>
    );
};
export default LessonSearch;