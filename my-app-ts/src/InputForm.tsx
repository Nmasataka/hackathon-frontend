import React, { useEffect, useState } from "react";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';//追加
import { onBackgroundMessage } from "firebase/messaging/sw";
import { TextField, Button, Typography, Box, Card, CardContent, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const InputForm : React.FC = () => {
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();//追加
    
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        setError(""); // エラーメッセージをリセット

        try {
            await signInWithEmailAndPassword(fireAuth, mail, password);
            await fetchloginusername(localStorage.getItem("uid"));
            setMail("");
            setPassword("");
            alert("ログイン成功！");
            setTimeout(() => navigate('/'), 100);
            //navigate('/')
        } catch (error: any) {
            setError(error.message); // エラーメッセージを設定
            alert("login失敗")
            return;
        }
        setMail("");
        setPassword("");
    };

    const onShowSignup = async () => {
        navigate('/signup')
    }

    const Logoutbutton = (): void => {
        signOut(fireAuth).then(() => {
          alert("ログアウトしました");
        }).catch(err => {
          alert(err);
        });
      };




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

        <Box sx={{display: "flex",alignItems: "center",justifyContent: "center",height: "100vh",backgroundColor: "rgba(0, 123, 255, 0.1)",padding: 2,}}>
            <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            ログイン
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={onSubmit}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="メールアドレス"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
            <TextField
                fullWidth
                label="パスワード"
                type={showPassword ? "text" : "password"} // 表示切り替え
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2 }}
            >
              ログイン
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
            まだ登録していない方は下記からどうぞ
          </Typography>

          <Button fullWidth onClick={onShowSignup}
            variant="outlined"
            color="secondary"
          >
            新規登録</Button>
        </CardContent>
      </Card>
        </Box>
    )
}


export default InputForm;