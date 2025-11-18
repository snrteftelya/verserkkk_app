import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

// Создаем тему сине-белых цветов
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
          <Link className="navbar-brand" to="/">
            CountrySearch
          </Link>
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <Link 
              className="link-without-outline"
              to='/country'
              style={{ display: 'block', padding: '4px 8px' }}>
                Countries
              </Link>
              <Link 
              className="link-without-outline"
              to='/nation'
              style={{ display: 'block', padding: '4px 8px' }}>
                Nations
              </Link>
              <Link 
              className="link-without-outline"
              to='/city'
              style={{ display: 'block', padding: '4px 8px' }}>
                Cities
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );  
}
