import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../../firebase";
import { useNavigate } from 'react-router-dom';//追加
import { TextField, Button, Typography, Box, Card, CardContent, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupForm : React.FC = () => {
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();//追加
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        setError(""); // エラーメッセージをリセット

        try {
            const userCredential = await createUserWithEmailAndPassword(fireAuth, mail, password);
            const uid = userCredential.user.uid;

            await registerUserInDatabase(uid);

            alert("新規アカウント作成成功！");
            navigate("/setusername");
        } catch (error: any) {
            setError(error.message); 
        }
        setMail("");
        setPassword("");
    };
    //result = await fetch("http://localhost:8000/register",{

    const registerUserInDatabase = async (uid: string) => {
        try{
            const result = await fetch(`${process.env.REACT_APP_URL}/register`,{
                method: "POST", body: JSON.stringify({uid: uid, email: mail,}),
            })
            if(!result.ok){
                throw Error(`Failed to create user: ${result.status}`);
            }
        }catch (err){
            console.log(err);
        }
    }


    return (
        <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgba(173, 216, 230, 0.2)",
        padding: 2,
      }}
    >
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
            新規登録
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            メールアドレスとパスワードを登録してください
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
              新規登録
            </Button>
          </form>
          <Button fullWidth variant="text" onClick={() => navigate("/login")}>
            ログイン画面に戻る
          </Button>
        </CardContent>
      </Card>
    </Box>
    )
}


export default SignupForm;