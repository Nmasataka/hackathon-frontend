import React, { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Select,MenuItem,SelectChangeEvent,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Firebase設定ファイル
import CircularProgress from "@mui/material/CircularProgress"; // スピナー追加
import { Photo } from "@mui/icons-material";

const PostTweet: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [naiyo, setnaiyo] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("古語");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] =useState<boolean>(false);
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null); // 選択された画像ファイル
  const [preview, setPreview] = useState<string>("");   // プレビューURL

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // プレビュー用のURLを生成
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
  };

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

    setLoading(true);
    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, `tweets/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    try {
      const result = await fetch(`${process.env.REACT_APP_URL}/posttweet`, {
        method: "POST",
        body: JSON.stringify({ uid: localStorage.getItem("uid"), content: content, imageurl: imageUrl }),
      });
      if (!result.ok) {
        throw Error(`Failed to post tweet: ${result.status}`);
      }
      setContent("");
      setImage(null); // 選択された画像をリセット
      setPreview(""); // プレビュー画像をリセット
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("投稿に失敗しました。もう一度お試しください。");
    }finally {
      setLoading(false); // 投稿処理完了後にローディングを解除
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
          
          {/*<Box
  display="flex"
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{
    gap: 2, // ボタンとセレクトボックスの間のスペース
    mt: 2, // 全体の上部余白
  }}
>
  }
  <Box display="flex"
  flexDirection="row"
  alignItems="center" sx={{ flex: 1 }}>
    <Typography
      variant="subtitle1"
      sx={{
        mb: 1, // テキストとセレクトボックスの間の余白
        color: "#5c3d2e",
        fontFamily: "'Noto Serif JP', serif",
      }}
    >
      翻訳する言語を <br />選んでください:
    </Typography>
    <Select
      value={selectedLanguage}
      onChange={handleLanguageChange3}
      
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
</Box>*/}

<Box
  display="flex"
  flexDirection="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{
    gap: 2, // 要素間のスペース
    mt: 2, // 全体の上部余白
  }}
>
  {/* 言語選択セクション */}
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    sx={{ flex: 1, justifyContent: "center" }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        mb: 0, // テキストとセレクトボックスの間の余白
        color: "#5c3d2e",
        fontFamily: "'Noto Serif JP', serif",
        textAlign: "center", // テキストを中央揃え
      }}
    >
      翻訳する言語を <br /> 選んでください:
    </Typography>
  </Box>

  {/* セレクトボックス */}
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    sx={{ flex: 1, justifyContent: "center" }}
  >
    <Select
      value={selectedLanguage}
      onChange={handleLanguageChange3}
      variant="outlined"
      sx={{
        width: "150px", // 適切な幅を設定
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
      {["古語", "漢文", "中国語", "ドイツ語", "英語", "フランス語", "スペイン語"].map(
        (lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        )
      )}
    </Select>
  </Box>

  {/* 翻訳ボタン */}
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    sx={{ flex: 1, justifyContent: "center" }}
  >
    <Button
      type="submit"
      variant="contained"
      onClick={handlegemini}
      sx={{
        flexShrink: 0,
        height: "56px",
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



<Box>
<Box display="flex" alignItems="center" mb={2}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-button"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-button">
          <IconButton
            color="primary"
            aria-label="upload image"
            component="span"
            sx={{
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.2)" },
            }}
          >
            <Photo />
          </IconButton>
        </label>
      </Box>



      
      {preview && (
        <Box
          mt={2}
          sx={{
            position: "relative",
            display: "inline-block",
            maxWidth: "100%",
            maxHeight: "300px",
          }}
        >
          {/* プレビュー画像 */}
          <img
            src={preview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          {/* バッテンアイコン */}
          <IconButton
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
            onClick={handleRemoveImage}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
          <Box>
  <Button
    variant="contained"
    color="primary"
    onClick={handlePostTweet}
    disabled={loading} // ローディング中はボタンを無効化
    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null} // ボタン内にローディングアイコンを表示
  >
    {loading ? "投稿中..." : "投稿"}
  </Button>
</Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostTweet;

