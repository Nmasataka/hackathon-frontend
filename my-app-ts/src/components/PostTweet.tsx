import React, { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Select,MenuItem,SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostTweet: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [naiyo, setnaiyo] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("古語");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(""); // 入力があればエラーメッセージを消す
    }
  };

  const handleLanguageChange3 = (e: SelectChangeEvent<string>) => {
    setSelectedLanguage(e.target.value);
  };

  const handlePostTweet = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信時のページリロードを防ぐ
    if (content.trim() === "") {
      setError("投稿内容を入力してください。");
      return; // 空文字の場合は処理を中断
    }
    try {
      const result = await fetch(`${process.env.REACT_APP_URL}/posttweet`, {
        method: "POST",
        body: JSON.stringify({ uid: localStorage.getItem("uid"), content }),
      });
      if (!result.ok) {
        throw Error(`Failed to post tweet: ${result.status}`);
      }
      setContent("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  const handlegemini = async (e: React.FormEvent) => {
    console.log("入りました");
    const prompt = `${content}を${selectedLanguage}にしてください。説明はいらないので${selectedLanguage}に翻訳してその答えだけを返してください`
    try {
      const result = await fetch(`${process.env.REACT_APP_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content-Typeを明示
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      if (!result.ok) {
        throw Error(`Failed to post tweet: ${result.status}`);
      }
      const Res = await result.json();
      console.log(Res);
      setnaiyo(Res.response);
    } catch (err) {
      console.log(err);
    }
      
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: "url('/path/to/wagaram-pattern.jpg')",
        backgroundSize: "cover",
        //backgroundColor: "#f7ede2",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #d4a373",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#5c3d2e",
              fontFamily: "'Noto Serif JP', serif",
              textAlign: "center",
              borderBottom: "2px solid #d4a373",
              pb: 1,
              mb: 2,
            }}
          >
            何を呟きますか？
          </Typography>
          <TextField
            value={content}
            onChange={handleContentChange}
            placeholder="ここに呟きを記入してください..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                borderColor: "#d4a373",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d4a373",
              },
            }}
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          
          <Box
  display="flex"
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{
    gap: 2, // ボタンとセレクトボックスの間のスペース
    mt: 2, // 全体の上部余白
  }}
>
  {/* 言語選択セクション */}
  <Box sx={{ flex: 1 }}>
    <Typography
      variant="subtitle1"
      sx={{
        mb: 1, // テキストとセレクトボックスの間の余白
        color: "#5c3d2e",
        fontFamily: "'Noto Serif JP', serif",
      }}
    >
      翻訳する言語を選んでください:
    </Typography>
    <Select
      value={selectedLanguage}
      onChange={handleLanguageChange3}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#d4a373",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#b48a60",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#b48a60",
        },
      }}
    >
      {["古語","漢文","中国語","ドイツ語", "英語", "フランス語", "スペイン語"].map((lang) => (
        <MenuItem key={lang} value={lang}>
          {lang}
        </MenuItem>
      ))}
    </Select>
  </Box>

  {/* 翻訳ボタン */}
  <Button
    type="submit"
    variant="contained"
    onClick={handlegemini}
    sx={{
      flexShrink: 0, // ボタンのサイズが圧縮されないように
      height: "56px", // セレクトボックスと高さを揃える
      backgroundColor: "#d4a373",
      "&:hover": {
        backgroundColor: "#b48a60",
      },
      fontFamily: "'Noto Serif JP', serif",
    }}
  >
    翻訳
  </Button>
</Box>

{/* 翻訳結果の表示 */}
<Typography
  variant="h6"
  sx={{
    mt: 3, // 翻訳セクションからの間隔
    color: "#5c3d2e",
    fontFamily: "'Noto Serif JP', serif",
    textAlign: "center",
    borderBottom: "2px solid #d4a373",
    pb: 1,
    mb: 2,
  }}
>
  {naiyo}
</Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handlePostTweet}
            sx={{
              mt: 2,
              backgroundColor: "#d4a373",
              "&:hover": {
                backgroundColor: "#b48a60",
              },
              fontFamily: "'Noto Serif JP', serif",
            }}
          >
            投稿する
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostTweet;

