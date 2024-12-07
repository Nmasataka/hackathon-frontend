import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { CssBaseline, ThemeProvider, createTheme,Box,useMediaQuery } from '@mui/material';
import { Routes, Route,BrowserRouter, useNavigate,Router,Outlet } from "react-router-dom"; // 追加
import Background from '../Background';
import ImageUploader from '../ImageUploader';


interface HomeProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  //uid :string | null;
}

const Homepage: React.FC<HomeProps> = ({ setDarkMode, darkMode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // サイドバーの開閉状態
  //const isMobile = useMediaQuery("(max-width:600px)");

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
            marginLeft: !isSidebarOpen ? '0' : '240px',
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
      <Footer />
    </Box>
  );
};

export default Homepage;
