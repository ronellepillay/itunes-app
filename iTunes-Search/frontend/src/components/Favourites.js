import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledListItem = styled(ListItem)({
  maxWidth: 345,
  margin: '10px',
});

const StyledAvatar = styled(Avatar)({
  height: 140,
  width: 140,
});

const ListWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const ListItemWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& .MuiListItemText-root': {
    marginLeft: '16px',
  },
});

export default function Favourites() {
    // State to store the list of favourites
    const [favourites, setFavourites] = useState([]);

    // Function to fetch the favourites list from the server
    const fetchFavourites = async () => {
        try {
            const response = await fetch('https://itunes-search.onrender.com/favourites');
            const data = await response.json();
            console.log(data); // add this line
            setFavourites(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Load the favourites list from the server when the component mounts
    useEffect(() => {
        fetchFavourites();
    }, []);

    // Function to remove an item from the favourites list
    const handleRemoveFromFavourites = async (item) => {
        try {
            // Send a DELETE request to the server to remove the item from the favourites list
            const response = await fetch(`https://itunes-search.onrender.com/favourites/${item.trackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
            const data = await response.json();
            console.log(data.message);

            // Update the favourites list in the state
            const updatedFavourites = favourites.filter(
                (fav) => fav.trackId !== item.trackId
            );
            setFavourites(updatedFavourites);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" component="h4" color="text.secondary" align='center'>
            Favourites
        </Typography>
        <ListWrapper>
            {favourites.length > 0 ? (
                <List>
                      {favourites.map((fav) => (
                            <StyledListItem>
                            <ListItemWrapper>
                                <ListItemAvatar>
                                    <StyledAvatar src={fav.artworkUrl100} alt={fav.trackName} />
                                </ListItemAvatar>
                                        <ListItemText primary={fav.trackName} secondary={fav.artistName} />
                                </ListItemWrapper>
                                <IconButton onClick={() => handleRemoveFromFavourites(fav)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </StyledListItem>
                        ))}
                </List>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No Favourites yet.
                </Typography>
            )}
        </ListWrapper>
        </div>
    );
}

