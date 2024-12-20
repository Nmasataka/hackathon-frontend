import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

// テーマの作成
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

// Google Fonts を CSS に追加
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
