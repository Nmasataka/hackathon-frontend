import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Add } from '@mui/icons-material';
//import PostTweet from './PostTweet';
import { Routes, Route,BrowserRouter, useNavigate,Router } from "react-router-dom"; // 追加
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";


import SignupForm from './SignupForm';
import InputForm from './InputForm';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import Homepage from './components/Homepage';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import PostTweet from './components/PostTweet';
import TweetDetail from './components/TweetDetail';
import TweetList from './components/TweetList';
import SetUsernameForm from './SetUserInfo';

import { AuthProvider } from "./contexts/AuthContext";
import theme from './theme';
import FollowTweetList from './components/FollowTweetList';
import FollowPage from './components/FollowPage';



function App() {
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  const [tweets, setTweets] = useState<{ username: string; content: string; date: string }[]>([]);
  const [useremail,setEmail] = useState<string | null>(null);
  const [data, setData] = useState("");
  
  // ダークモードの状態管理
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();//追加

  // テーマの作成
  /*
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, user => {
      setLoginUser(user);
      if(user){
        setEmail(user.email);
        localStorage.setItem("uid", user.uid);
        //fetchloginusername(localStorage.getItem("uid"));
        //LoginPOST(user.email);
      }else{
        setEmail("");
        setData("");
        localStorage.removeItem("uid");
        localStorage.removeItem("username");
      }
    });
    return () => unsubscribe(); // アンマウント時に監視解除
  }, []); // 空の依存配列で一度だけ実行






  useEffect(()=>{
    if(useremail){
      //LoginPOST(useremail);
    }
  },[useremail])

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


  const fetchloginusername = async(uid:string | null)=>{
      try{
          const response = await fetch(`${process.env.REACT_APP_URL}/loginusername?uid=${uid}`,{
            method: "GET",
            headers: {"Content-Type":"application/json",},});
          if(!response.ok){
              throw Error(`Failed to create user: ${response.status}`);
          }
          const Res = await response.json();
          console.log(Res[0].username)
          localStorage.setItem("username", Res[0].username);
          //setData(Res[0].email);
          
      }catch(err){
        console.log(err);
      }
  }


  return (
    <AuthProvider>
        <div className="App">
          {/* 
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
          */}
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/" element={<Homepage setDarkMode={setDarkMode} darkMode={darkMode}  />}>
                    <Route index element={<TweetList postuids={"all"}/>} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                    <Route path="tweet/:id" element={<TweetDetail />} />
                    <Route path="posttweet" element={<PostTweet/>} />
                    <Route path="follow" element={<FollowTweetList/>}/>
                    <Route path="followlist/:id" element={<FollowPage />}/>
                </Route>
                <Route path="/login" element={ <InputForm /> } /> 
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/setusername" element={<SetUsernameForm />} />
              </Routes>
          </ThemeProvider>
          
        </div>
        </AuthProvider>
  );
}

export default App;
