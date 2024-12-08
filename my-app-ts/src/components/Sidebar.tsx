import React, {useState,useEffect} from 'react';
import { Drawer, List, ListItemButton,ListItemIcon, ListItemText, IconButton, Typography, Box,ListItem,Divider,Avatar,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { fireAuth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useMediaQuery } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person'; // Profile用
import EditIcon from '@mui/icons-material/Edit'; // Edit Profile用
import GroupIcon from '@mui/icons-material/Group'; // Follow用
import UserAvatar from './atoms/UserAvatar';
import SearchIcon from "@mui/icons-material/Search";
import logo from "../Images/a.jpg";
import { useTheme } from '@mui/material/styles';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
  onMenuChange: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar,onMenuChange }) => {
  //const [user] = useAuthState(fireAuth);
  const [profile, setProfile] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const theme = useTheme();

  const fetchUserInfo = async()=>{
    try{
        const response = await fetch(`${process.env.REACT_APP_URL}/loginusername?uid=${localStorage.getItem("uid")}`,{
          method: "GET",
          headers: {"Content-Type":"application/json",},});
        if(!response.ok){
            throw Error(`Failed to create user: ${response.status}`);
        }
        const Res = await response.json();
        setProfile(Res[0].profilePicture);
        setUsername(Res[0].username);
        
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);



  

  const logout = () => {
    signOut(fireAuth).then(() => {
      localStorage.removeItem("uid");
      alert("ログアウトしました");
    }).catch(err => {
      alert(err);
    });
  };
  

  return (
    <Box sx={{ display: 'flex' ,backgroundColor: theme.palette.background.default, }}>
    {/* ハンバーガーメニューアイコン */}
    <IconButton
      onClick={toggleSidebar}
      sx={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 9999,
        backgroundColor: '#d4a373',
        color: 'white',
        '&:hover': {
          backgroundColor: '#b48a60',
        },
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
          backgroundColor: '#fff8e6',
          borderRight: '2px solid #d4a373',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: 2,
          textAlign: 'center',
          color: '#5c3d2e',
          fontFamily: "'Noto Serif JP', serif",
          borderBottom: '2px solid #d4a373',
        }}
      >
        <Box
      sx={{
        width: '100%',
        height: '64px', // 適宜高さを調整
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#f5f5f5', // 背景色（お好みで変更）
        //borderBottom: '1px solid #e0e0e0', // 境界線
      }}
    >
      <Avatar
        src={logo} // ロゴ画像のパス
        alt="Logo"
        sx={{
          width: 60, // アイコンの幅
          height: 60, // アイコンの高さ
        }}
      />
    </Box>
      </Typography>

      <List sx={{ padding: 0 }}>
  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      onClick={() => onMenuChange("Home")}
      to="/"
      sx={{
        '&:hover': {
          backgroundColor: '#f7f3eb',
        },
        alignItems: 'center', // 垂直方向でアイテムを中央揃え
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: '40px', // アイコンの横幅を統一
          justifyContent: 'center', // アイコンを中央揃え
        }}
      >
        <HomeIcon sx={{ color: '#5c3d2e' }} />
      </ListItemIcon>
      <ListItemText
        primary="Home"
        primaryTypographyProps={{
          color: '#5c3d2e',
          fontFamily: "'Noto Serif JP', serif",
        }}
      />
    </ListItemButton>
  </ListItem>

  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      onClick={() => onMenuChange("follow")}
      to="/follow"
      sx={{
        '&:hover': {
          backgroundColor: '#f7f3eb',
        },
        alignItems: 'center',
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: '40px',
          justifyContent: 'center',
        }}
      >
        <GroupIcon sx={{ color: '#5c3d2e' }} />
      </ListItemIcon>
      <ListItemText
        primary="follow"
        primaryTypographyProps={{
          color: '#5c3d2e',
          fontFamily: "'Noto Serif JP', serif",
        }}
      />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      onClick={() => onMenuChange("search")}
      to="/search"
      sx={{
        '&:hover': {
          backgroundColor: '#f7f3eb',
        },
        alignItems: 'center',
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: '40px',
          justifyContent: 'center',
        }}
      >
        <SearchIcon sx={{ color: '#5c3d2e' }} />
      </ListItemIcon>
      <ListItemText
        primary="search"
        primaryTypographyProps={{
          color: '#5c3d2e',
          fontFamily: "'Noto Serif JP', serif",
        }}
      />
    </ListItemButton>
  </ListItem>

  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      onClick={() => onMenuChange("profile")}
      to={`/profile/${localStorage.getItem('uid')}`}
      sx={{
        '&:hover': {
          backgroundColor: '#f7f3eb',
        },
        alignItems: 'center',
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: '40px',
          justifyContent: 'center',
        }}
      >
        <PersonIcon sx={{ color: '#5c3d2e' }} />
      </ListItemIcon>
      <ListItemText
        primary="Profile"
        primaryTypographyProps={{
          color: '#5c3d2e',
          fontFamily: "'Noto Serif JP', serif",
        }}
      />
    </ListItemButton>
  </ListItem>

  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      onClick={() => onMenuChange("edit profile")}
      to="/edit-profile"
      sx={{
        '&:hover': {
          backgroundColor: '#f7f3eb',
        },
        alignItems: 'center',
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: '40px',
          justifyContent: 'center',
        }}
      >
        <EditIcon sx={{ color: '#5c3d2e' }} />
      </ListItemIcon>
      <ListItemText
        primary="edit profile"
        primaryTypographyProps={{
          color: '#5c3d2e',
          fontFamily: "'Noto Serif JP', serif",
        }}
      />
    </ListItemButton>
  </ListItem>
</List>


      <Button
        variant="contained"
        component={Link}
        to="/posttweet"
        sx={{
          margin: 2,
          backgroundColor: '#d4a373',
          color: 'white',
          fontFamily: "'Noto Serif JP', serif",
          '&:hover': {
            backgroundColor: '#b48a60',
          },
        }}
      >
        ポストする
      </Button>

      <Divider sx={{ marginY: 2 }} />

      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f7f3eb',
          borderTop: '2px solid #d4a373',
        }}
      >
        {localStorage.getItem('uid') != null ? (
          <>
          <UserAvatar profileUrl={profile} username={username} size={64} />

            <Typography
              variant="h5"
              color="textSecondary"
              sx={{ fontFamily: "'Noto Serif JP', serif", color: '#5c3d2e',marginTop: 2 }}
              onClick={fetchUserInfo}
            >
              {username}
            </Typography>



            <Button
              fullWidth
              onClick={logout}
              variant="outlined"
              color="secondary"
              sx={{
                marginTop: 2,
                fontFamily: "'Noto Serif JP', serif",
                borderColor: '#d4a373',
                color: '#5c3d2e',
                '&:hover': {
                  backgroundColor: '#f7f3eb',
                  borderColor: '#b48a60',
                },
              }}
            >
              ログアウト
            </Button>
          </>
        ) : (
          <Button
            fullWidth
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#d4a373',
              fontFamily: "'Noto Serif JP', serif",
              '&:hover': {
                backgroundColor: '#b48a60',
              },
            }}
          >
            ログイン
          </Button>
        )}
      </Box>
    </Drawer>
  </Box>
  );
};

export default Sidebar;
