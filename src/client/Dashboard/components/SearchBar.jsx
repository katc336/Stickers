import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react"

const SearchBar = () => {
    const [search, setSearch] = useState("")
    console.log(search)
    return (
        <div>
            <Box sx={{ my: 3}}>
            <form>
                <Stack direction="row">
                    <input 
                    type="text" 
                    id="search" 
                    name="search" 
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}/>
                    <Button>
                        <SearchIcon />
                    </Button>
                </Stack>
            </form>
            </Box>
        </div>
    )
}
export default SearchBar