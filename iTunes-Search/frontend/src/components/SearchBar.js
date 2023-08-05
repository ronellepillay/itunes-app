import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/itunes-logo-bg.png'
import { IconButton } from '@mui/material';


export default function SearchBar() {
    const [term, setTerm] = useState('');
    const [mediaType, setMediaType] = useState('all');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading state to true
        // Send a GET request to the backend search route
        const response = await fetch(`https://itunes-search.onrender.com/search?term=${term}&mediaType=${mediaType}`);
        const data = await response.json();

        setLoading(false); // Set loading state to false

        // Navigate to the Results component with the search results
        navigate('/results',
            { state: { results: data.results }});
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <img src={logo} alt="iTunes Logo" className='itunes-logo' />

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    variant="outlined"
                    style={{ marginRight: '10px' }}
                    required
                />

                <FormControl style={{ minWidth: '120px', marginRight: '10px' }}>
                    <InputLabel id="mediaType-label">Media Type</InputLabel>
                    <Select
                    labelId="mediaType-label"
                    id="mediaType"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="movie">Movie</MenuItem>
                    <MenuItem value="podcast">Podcast</MenuItem>
                    <MenuItem value="music">Music</MenuItem>
                    <MenuItem value="musicVideo">Music Video</MenuItem>
                    <MenuItem value="audiobook">Audiobook</MenuItem>
                    <MenuItem value="shortFilm">Short Film</MenuItem>
                    <MenuItem value="tvShow">TV Show</MenuItem>
                    <MenuItem value="software">Software</MenuItem>
                    <MenuItem value="ebook">Ebook</MenuItem>
                    </Select>
                </FormControl>

                <IconButton type="submit" color="primary" aria-label="search" style={{ marginTop: '10px', marginRight: '30px' }}>
                    <SearchIcon />
                </IconButton>

                {loading && <CircularProgress 
                    style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />} {/* Conditional rendering of CircularProgress */}
            </form>
        </div>
    )
}