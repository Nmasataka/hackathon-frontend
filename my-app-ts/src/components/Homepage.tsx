import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Feed from './Feed';
import Footer from './Footer';
import { CssBaseline, ThemeProvider, createTheme,Box } from '@mui/material';
import { Routes, Route,BrowserRouter, useNavigate,Router,Outlet } from "react-router-dom"; // 追加
import { WafuButton } from './WafuButton';
import Background from './Background';


interface HomeProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  //uid :string | null;
}

const Homepage: React.FC<HomeProps> = ({ setDarkMode, darkMode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // サイドバーの開閉状態

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // サイドバーの開閉状態を切り替え
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} /> 
      
      <Box sx={{ display: 'flex',flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: isSidebarOpen ? '240px' : '0', 
            transition: 'margin-left 0.3s ease', 
            width: isSidebarOpen ? 'calc(100%-240px)' : '100%',
          }}
        >
         <Header setDarkMode={setDarkMode} darkMode={darkMode} /> 
          <Background>
          <Outlet />
          </Background>
        </Box>
      </Box>
      {/*
      <div style={{ padding: "20px", backgroundColor: "#F5F2E8" }}>
      <h1 style={{ fontFamily: "'Sawarabi Mincho', serif", color: "#8E5B30" }}>
        和風デザイン
      </h1>
      <WafuButton label="投稿する" />
    </div>
    */}
      <Footer />
    </Box>
  );
};

export default Homepage;
