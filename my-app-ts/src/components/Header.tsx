import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch,Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import tatami from '../Images/tatamimite.jpg'

interface HeaderProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ setDarkMode, darkMode, title }) => {
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    
    <AppBar position="fixed" 
    sx={{
      backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 30%), 
                        url(${tatami})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    }}
  >
    <Toolbar>
      <Typography 
        variant="h4" 
        component="div" 
        sx={{
          flexGrow: 1,
          fontFamily: 'serif',
          color: "white",
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        {title}
      </Typography>
      <Box  >
        <IconButton color="inherit" onClick={handleThemeChange}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Header;

{/*
    <AppBar position="fixed" sx={{ backgroundImage: `url(${tatami})`, backgroundSize: 'cover', backgroundPosition: 'center',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1,fontFamily: 'serif',color: "white", textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', }}>
          Twitter風アプリ
        </Typography>
        <Box sx={{backgroundColor: "#000000"}}>
        <IconButton color="inherit" onClick={handleThemeChange}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
      </Toolbar>
    </AppBar>*/}

