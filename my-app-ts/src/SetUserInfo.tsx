import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TextField, Button, Typography, Box, Card, CardContent, FormControlLabel, Checkbox } from "@mui/material";

const SetUserInfoForm: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [skipBio, setSkipBio] = useState<boolean>(false); // 自己紹介を後で設定
    const [usernameError, setUsernameError] = useState<string>(""); // ユーザーネームのエラー
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setUsernameError("ユーザーネームは必須です"); // エラーを設定
            return;
        }
        setUsernameError(""); // エラーをクリア
        try{
            const result = await fetch(`${process.env.REACT_APP_URL}/register-userinfo`,{
                method: "POST", body: JSON.stringify({uid: localStorage.getItem("uid"),username: username, bio: bio}),
            })
            if(!result.ok){
                throw Error(`Failed to create user: ${result.status}`);
            }
            localStorage.setItem("username", username);
            alert("アカウント作成が完了しました!")
            setBio("")
            setUsername("");
            navigate("/");
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
                    maxWidth: 500,
                    width: "100%",
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "white",
                }}
            >
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        アカウントが作成されました！
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                        利用を開始するために、ユーザーネームを設定し、任意で自己紹介文を入力してください。
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="ユーザーネーム (必須)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={Boolean(usernameError)} // エラー状態を表示
                                helperText={usernameError} // エラーメッセージを表示
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="自己紹介文 (任意)"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={3}
                                disabled={skipBio} // 後で設定を選択すると無効化
                            />
                        </Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={skipBio}
                                    onChange={(e) => setSkipBio(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="後で自己紹介文を設定する"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ marginTop: 2 }}
                        >
                            登録
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SetUserInfoForm;

