import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, IconButton, Typography, Box,ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const menuItems = ['Home', 'Explore', 'Notifications', 'Messages'];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* ハンバーガーメニューアイコン（サイドバーの開閉に応じて表示） */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 9999, // 常に最前面に表示
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* サイドバー */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          MyApp
        </Typography>
        <List>
          {menuItems.map((text) => (
            <ListItemButton key={text}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                  <ListItemText primary="Home" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                  <ListItemText primary="Profile" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/edit-profile">
                  <ListItemText primary="Edit Profile" />
              </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
