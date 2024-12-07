import React, { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Gemini: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [naiyo, setnaiyo] = useState<string>("");
  const navigate = useNavigate();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePostTweet = async (e: React.FormEvent) => {
    console.log("入りました");
    
    try {
      const result = await fetch(`${process.env.REACT_APP_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content-Typeを明示
        },
        body: JSON.stringify({ prompt: content }),
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
            {naiyo}
          </Typography>
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

export default Gemini;

