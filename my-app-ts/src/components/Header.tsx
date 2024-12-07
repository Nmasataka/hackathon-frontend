import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import tatami from '../Images/tatamimite.jpg'

interface HeaderProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ setDarkMode, darkMode }) => {
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="static" sx={{ backgroundImage: `url(${tatami})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1,fontFamily: 'serif',color: "black" }}>
          Twitter風アプリ
        </Typography>
        <IconButton color="inherit" onClick={handleThemeChange}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

