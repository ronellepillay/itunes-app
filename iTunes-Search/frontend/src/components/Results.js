import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function Results(props) {
    // Get the results array from the location state
    const { state } = useLocation();
    const results = state?.results;
    const artistName = results[0]?.artistName;

    // Create a state to keep track of whether an item has been to favourites
    const [addedToFavourites, setAddedToFavourites] = useState({});

    // Function to add an item to the favourites list
    const handleAddToFavourites = async (item) => {
        try {
            // Check if the item is already in the favourites list
            if (props.favourites && props.favourites.some((fav) => fav.trackId === item.trackId)) {
                setAddedToFavourites({ ...addedToFavourites, [item.trackId]: 'alreadyExists' });
                return;
            }

            // Send a POST request to the server to add the item to the favourites list
            const response = await fetch('https://itunes-search.onrender.com/favourites/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data = await response.json();
            console.log(data.message);

            // Set the addedToFavourites state to true
            setAddedToFavourites({ ...addedToFavourites, [item.trackId]: true });
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div>
        <Typography variant="h3" component="h3" color="text.secondary" align='center'>
                Results for {artistName}
            </Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {state?.results?.map((result) => (
          <ListItem key={result.trackId} sx={{ mb: 2 }}>
            <ListItemAvatar>
              <Avatar alt={result.trackName} src={result.artworkUrl100} />
            </ListItemAvatar>
            <ListItemText
              primary={result.trackName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {result.artistName}
                  </Typography>
                </React.Fragment>
              }
            />
            <IconButton
              onClick={() => handleAddToFavourites(result)}
              color={
                addedToFavourites[result.trackId] === true
                  ? 'secondary'
                  : addedToFavourites[result.trackId] === 'alreadyExists'
                  ? 'error'
                  : 'default'
              }
              aria-label="add to favourites"
              disabled={result.addedToFavourites}
            >
              <FavoriteIcon />
            </IconButton>
            {addedToFavourites[result.trackId] === true && (
              <Typography color="secondary">Added to Favourites!</Typography>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}