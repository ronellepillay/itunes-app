const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
// const PORT = process.env.PORT || 3001;


const app = express();

app.use(helmet());
app.use(cors())
// Use JSON middleware to parse incoming request
app.use(express.json());

// Favourites list to hold items
let favourites = [];

app.get('/search', async (req, res) => {
    try {
        // Extract query parameters from request
        const { term, mediaType } = req.query;
        //Dynamically import the node-fetch library
        const fetch = await import('node-fetch');
        // Fetch data from iTunes Search API using query parameters
        const response = await fetch.default(`https://itunes.apple.com/search?term=${term}&media=${mediaType}`);
        // Parse response as JSON
        const json = await response.json();
        // Send response back to client as JSON
        res.json(json);
    } catch (error) {
        //Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
    
});

// Add item to favourites list
app.post('/favourites/add', (req, res) => {
    const item = req.body;

    // Check if item already exists in favourites list
    if (favourites.some(fav => fav.trackId === item.trackId)) {
        return res.status(400).json({ message: 'Item already exists in favorites list'});
    }
    
    // Add item to the favourites list
    favourites.push(item);
    // Send response back to client
    res.json({message: 'Item added to favourites list'});
});

// Remove item from favourites list
app.delete('/favourites/:trackId', (req, res) => {
    const { trackId } = req.params;

    // Find index of the item in favourites list
    const index = favourites.findIndex(fav => fav.trackId === parseInt(trackId));
    // Check if the item exists in favourites list
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found in favourites list'});
    }
    // Remove item from the favourites list
    favourites.splice(index, 1);
    // Send response back to client
    res.json({ message: 'Item removed from favourites list'});
});

// Get favourites list
app.get('/favourites', (req, res) => {
    // Send favourites list back to client as JSON
    res.json(favourites);
});

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// }) 

module.exports = app;