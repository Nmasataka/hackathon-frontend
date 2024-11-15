import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Add } from '@mui/icons-material';
import PostTweet from './PostTweet';
import Tweet from './Tweet';
import { Routes, Route,BrowserRouter, useNavigate,Router } from "react-router-dom"; // 追加
import Login from './Login';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { Home } from "./Home" // Homeだけimport
import SignupForm from './SignupForm';
import InputForm from './InputForm';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Feed from './components/Feed';

function App() {
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  const [tweets, setTweets] = useState<{ username: string; content: string; date: string }[]>([]);
  const [useremail,setEmail] = useState<string | null>(null);
  
  // ダークモードの状態管理
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();//追加

  // テーマの作成
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handlePost = (content: string) => {
    const newTweet = {
      username: 'ユーザー名', // 仮のユーザー名。後で認証機能などで動的に変更可能
      content,
      date: new Date().toLocaleString(),
    };
    setTweets([newTweet, ...tweets]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, user => {
      setLoginUser(user);
      if(user){
        setEmail(user.email);
      }else{
        setEmail(null);
      }
    });
    return () => unsubscribe(); // アンマウント時に監視解除
  }, []); // 空の依存配列で一度だけ実行

  const Logoutbutton = () => {
    signOut(fireAuth).then(() => {
      alert("ログアウトしました");
    }).catch(err => {
      alert(err);
    });
  };
  const Loginbutton = () => {
    navigate('/login')
  }

  return (
        <div className="App">
          {/* 
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </header>
          */}
          {loginUser ? (
            <>
              <h1 style={{ color: "blue" }}>ログイン中</h1>
              <button onClick={Logoutbutton}>ログアウト</button>
            </>
          ) : (
            <>
              <h1 style={{ color: "red" }}>ログアウト中</h1>
              <button onClick={Loginbutton}>ログイン</button>
            </>
          )}
          <h1>{useremail}</h1>
          {/*
          <div style={{ padding: 20 }}>
              <h1>Twitterクローン</h1>
              <PostTweet onPost={handlePost} />
              {tweets.map((tweet, index) => (
                <Tweet key={index} username={tweet.username} content={tweet.content} date={tweet.date} />
              ))}
          </div>
          */}
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/" element={<Homepage setDarkMode={setDarkMode} darkMode={darkMode} />}>
                    <Route index element={<Feed />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                </Route>
                <Route path="/login" element={ <InputForm /> } /> 
                <Route path="/signup" element={<SignupForm />} />
              </Routes>
          </ThemeProvider>
          
        </div>
  );
}

export default App;
