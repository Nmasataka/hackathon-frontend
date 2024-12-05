import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, IconButton, Typography, Box,ListItem,Divider,Avatar,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { fireAuth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import PostTweet from './PostTweet';
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  //const [user] = useAuthState(fireAuth);
  
  
  const donepost = () => {
    console.log("post");
  }

  

  const logout = () => {
    signOut(fireAuth).then(() => {
      alert("ログアウトしました");
    }).catch(err => {
      alert(err);
    });
  };
  

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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          MyApp
        </Typography>
        <List>
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/tweetlist">
                  <ListItemText primary="Home" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton component={Link} to={`/profile/${localStorage.getItem("uid")}`}>
                  <ListItemText primary="Profile" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/edit-profile">
                  <ListItemText primary="Edit Profile" />
              </ListItemButton>
          </ListItem>
        </List>
        <Button fullWidth onClick={donepost}
            variant="contained"
            color="primary"
          >
            ポストする</Button>



        <Divider sx={{ marginY: 2 }} />



        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: '#f7f7f7',
          }}
        >
          {localStorage.getItem("uid")!=null ? (
            <>
              <Avatar sx={{ width: 64, height: 64, marginBottom: 1 }}>
                {/*{user.displayName?.[0] || email?.[0]?.toUpperCase()}*/}
              </Avatar>
              {/*<Typography variant="subtitle1">{"" || "匿名ユーザー"}</Typography>*/}
              
              <Typography variant="h5" color="textSecondary">
                {localStorage.getItem("username")}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {localStorage.getItem("uid")}
              </Typography>
              
              <Button fullWidth onClick={logout}
            variant="outlined"
            color="secondary"
          >
            ログアウト</Button>
            </>
          ) : (
            
              
            <Button fullWidth component={Link} to="/login"
            variant="contained"
            color="primary"
          >
            ログイン</Button>
            
          )}
          
        </Box>

      </Drawer>
    </Box>
  );
};

export default Sidebar;
