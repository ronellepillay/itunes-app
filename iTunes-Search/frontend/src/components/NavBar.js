import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledAppBar = styled(AppBar)({
  background: '#fff',
  color: '#333',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
});

const StyledLink = styled(Link)({
  color: '#333',
  textDecoration: 'none',
  '&:hover': {
    color: '#555555',
  },
  '&:active': {
    color: '#3881C0', /* change the color to red when the link is clicked */
  },
});

export default function NavBar() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">
          <StyledLink to="/">
            <HomeIcon />
          </StyledLink>
        </Typography>
        <Typography variant="h6">
          <StyledLink to="/favourites">
            <FavoriteIcon />
          </StyledLink>
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
}
