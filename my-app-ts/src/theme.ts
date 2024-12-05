/*

// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 青色
    },
    secondary: {
      main: '#9c27b0', // 紫色
    },
  },
});

export default theme;
*/

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D9A56E", // 金茶色
      contrastText: "#FFFFFF", // 白
    },
    secondary: {
      main: "#8E5B30", // 濃い茶色
    },
    background: {
      default: "#F5F2E8", // 和風生成り色
      paper: "#FFFFFF", // 紙っぽい白
    },
    text: {
      primary: "#8E5B30", // 和風茶色
      secondary: "#5C3B1E", // 濃い茶色
    },
  },
  typography: {
    fontFamily: "'Sawarabi Mincho', serif", // 和風フォント
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;

