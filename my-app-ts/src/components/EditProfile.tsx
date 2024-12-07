import React, { useState, useEffect } from "react";
import { Routes, Route,BrowserRouter, useNavigate,Router } from "react-router-dom"; // 追加
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,Stack
} from "@mui/material";
import wood from "../Images/woodimage.png"

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [defaultUsername, setDefaultUsername] = useState<string>(""); // デフォルトのusername
  const [defaultBio, setDefaultBio] = useState<string>("");
  const [error, setError] = useState<{ username: string }>({ username: "" });

  const navigate = useNavigate();//追加

  const handleSave = async() => {
    if (!username) {
      setError({ username: "Username is required." });
      return;
    }
    setError({ username: "" }); // エラーが解消されたらリセット

    try{
        const result = await fetch(`${process.env.REACT_APP_URL}/register-userinfo`,{
            method: "POST", body: JSON.stringify({uid: localStorage.getItem("uid"),username: username, bio: bio}),
        })
        if(!result.ok){
            throw Error(`Failed to create user: ${result.status}`);
        }
        localStorage.setItem("username", username);
        alert("プロフィールが更新されました。")
        setBio("")
        setUsername("");
        navigate(`/profile/${localStorage.getItem("uid")}`);
    }catch (err){
          console.log(err);
    }
  };



  const fetchUserInfo = async()=>{
    try{
        const response = await fetch(`${process.env.REACT_APP_URL}/loginusername?uid=${localStorage.getItem("uid")}`,{
          method: "GET",
          headers: {"Content-Type":"application/json",},});
        if(!response.ok){
            throw Error(`Failed to create user: ${response.status}`);
        }
        const Res = await response.json();
        setUsername(Res[0].username);
        setDefaultUsername(Res[0].username);
        setBio(Res[0].bio);
        setDefaultBio(Res[0].bio);
        
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const resetUsername = () => setUsername(defaultUsername);
  const resetBio = () => setBio(defaultBio);



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "32px",
        //backgroundColor: "#f0f4f8",
        
      }}
    >
      <Card
        sx={{
          width: "600px",
          padding: "32px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
          borderRadius: "16px",
          background: `url(${wood})`, 
        backgroundSize: "cover", // テクスチャがカード全体にカバーされるように設定
        backgroundPosition: "center", // 中央に配置

          //backgroundColor: "#ffffff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: "24px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Edit Profile
          </Typography>
  
          {/* Username Field */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(error.username)} // エラーがあれば赤枠にする
              helperText={error.username} // エラー内容を表示
              sx={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              onClick={resetUsername}
              sx={{
                padding: "4px 8px",
                fontSize: "0.875rem",
                minWidth: "auto",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                "&:hover": { backgroundColor: "#007BFF" },
              }}
            >
              現状に戻す
            </Button>
          </Box>
  
          {/* Bio Field */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              sx={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              onClick={resetBio}
              sx={{
                padding: "4px 8px",
                fontSize: "0.875rem",
                minWidth: "auto",
                color: "#ffffff",
                whiteSpace: "nowrap",
                "&:hover": { backgroundColor: "#007BFF" },
              }}
            >
              現状に戻す
            </Button>
          </Box>
  
          {/* Save Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            sx={{
              backgroundColor: "primary",
              "&:hover": { backgroundColor: "#0056b3" },
              fontWeight: "bold",
              padding: "12px",
              fontSize: "1rem",
            }}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
  

};

export default EditProfile;
