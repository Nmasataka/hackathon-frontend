import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Feed from './Feed';
import Footer from './Footer';
import ProfileCard from './ProfileCard';
import Trends from './Trend';
import Tweet from './Tweet';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Profile from './Profile';
import EditProfile from './EditProfile';
import { Routes, Route,BrowserRouter, useNavigate,Router,Outlet } from "react-router-dom"; // 追加
import { Box } from '@mui/material';

interface HomeProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

const Homepage: React.FC<HomeProps> = ({ setDarkMode, darkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // サイドバーの開閉状態

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // サイドバーの開閉状態を切り替え
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* サイドバーの状態を渡す */}
      
      <Box sx={{ display: 'flex',flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: isSidebarOpen ? '240px' : '0', // サイドバーが開いているときにメインコンテンツを右にスライド
            transition: 'margin-left 0.3s ease', // スライドインアニメーション
            width: isSidebarOpen ? 'calc(100%-240px)' : '100%', // サイドバーが開いていないときは横幅100%
            //width: '100%', // 横幅100%に設定
          }}
        >
          <Header setDarkMode={setDarkMode} darkMode={darkMode} />
          <Outlet />
          {/*
          <Routes>
              <Route path="/" element={<Feed />}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
          */}
        </Box>
        
      </Box>
      <Footer />
    </Box>
  );
};

export default Homepage;
