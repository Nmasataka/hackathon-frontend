import React,{useEffect,useState} from "react";
import { Card, CardContent, Typography,Button,Box,TextField,Tab,Tabs,List,ListItem,ListItemText } from "@mui/material";
import TweetCard from "./TweetCard";
import CircularProgress from "@mui/material/CircularProgress"; // スピナー追加
import { motion } from "framer-motion"; // アニメーションライブラリ
import SearchIcon from "@mui/icons-material/Search";
import UserAvatar from "./atoms/UserAvatar";
import { useParams, Link } from "react-router-dom";


// ツイートデータの型定義
interface Tweet {
  tweet_id: number;
  uid: string;
  username: string;
  profilePicture: string;
  content: string;
  created_at: string;
  likes_count: string;
  retweet_count: string;
  image_url: string;
  isLiked: boolean;
}


interface User {
  uid: string;
  username: string;
  profilePicture: string;
}


const SearchTweetList: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [followersList, setFollowersList] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleSearch = async () => {
        setIsLoading(true);
        let Url = `${process.env.REACT_APP_URL}/searchtweetlist?uid=${localStorage.getItem("uid")}&keyword=${keyword}`;
        if (activeTab==1) Url = `${process.env.REACT_APP_URL}/searchuserlist?keyword=${keyword}`;
        console.log(Url);
        try{
            //const postuidsParam = postuids?.join(",") || "";
            console.log("ここに入ったよ");
            const response = await fetch(Url,{
                method: "GET",
                headers: {"Content-Type":"application/json",},});
              if(!response.ok){
                  throw Error(`Failed to create user: ${response.status}`);
              }
              const Res = await response.json();
              if(activeTab==0) setTweets(Res);
              else setFollowersList(Res);
              console.log(Res);
        }catch(err){
            console.log(err);
        }finally {
            setIsLoading(false); // ローディング終了
          }
    }

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value); // 入力された値を更新
      };
      // タブ変更時のハンドラー
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if(activeTab===0) setTweets([]);
    else setFollowersList([]);
  };
    

    


    

    return (
        <div style={{ padding: "16px" }}>
          <Typography variant="h5" align="center" style={{ width: "100%", fontWeight: "bold", color: "#000000", marginBottom: 30 }}>
          興味のあるキーワードで検索してみましょう
            </Typography>
          <Box sx={{marginBottom: 3,  display: "flex", justifyContent: "center"}}>
          
          <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{
          marginBottom: 2,maxWidth: "600px",width: "100%",
          "& .MuiTab-root": {
            fontWeight: "bold",
            fontSize: "1.1rem",
          },
          "& .Mui-selected": {
            color: "#00A497",
          },
          "& .MuiTabs-indicator": {
      backgroundColor: "#000000", // インジケータの色を変更
    },
        }}
      >
        <Tab label="ツイート検索" />
        <Tab label="ユーザー検索" />
      </Tabs>


          
          </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 2, // 検索ボックスの下に余白
          //backgroundColor: "#ffffff"
        }}
      >
        {/* 検索ボックス */}
        <TextField
          value={keyword}
          onChange={handleInputChange}
          variant="outlined"
          label="キーワードで検索"
          sx={{
            flex: "0 1 300px", // 最大幅を300pxに制限
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#264653", // フィールドセットの枠線色
              },
              "&:hover fieldset": {
                borderColor: "#264653", // フォーカス時の枠線色
              },
              "&.Mui-focused fieldset": {
                borderColor: "#264653", // フォーカス時の枠線色
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.1rem", // ラベルの文字サイズ
              color: "#264653", // ラベルの文字色
            },
            "& .MuiOutlinedInput-input": {
              fontSize: "1rem", // 入力された文字のサイズ
              color: "#333", // 入力された文字の色
            },
          }}
        />

        {/* 検索ボタン */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          disabled={!keyword.trim()}
          sx={{
            backgroundColor: "#264653",
            "&:hover": {
              backgroundColor: "#b48a60",
            },
            fontWeight: "bold",
            fontFamily: "'Noto Serif JP', serif",
          }}
        >
          検索
        </Button>
      </Box>
            {isLoading ?( // ローディング中の表示
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          >
            <CircularProgress size={80} style={{ color: "#d4a373" }} />
          </motion.div>
        </div>
      ):activeTab === 0?(
        tweets.length === 0) ? (
            <Typography variant="h5" align="center" style={{ width: "100%" }}>
              No tweets available.
            </Typography>
        ) : (
            tweets.map((tweet) => (
                <TweetCard key={tweet.tweet_id} tweet={tweet}/>
            ))
        ):(followersList.length === 0 ? (
          <Typography variant="h5" align="center" style={{ width: "100%" }}>
            No User available.
          </Typography>
        ) : (
          <List sx={{
            display: "flex", // フレックスレイアウトを有効化
            flexDirection: "column", // 縦方向に要素を並べる
            alignItems: "center", // 水平方向に中央揃え
            gap: 2, // 各 `ListItem` 間の間隔を設定
          }}>
  {followersList && followersList.length > 0 ? (
    followersList.map((user) => (
      <ListItem
        key={user.uid}
        sx={{
          borderRadius: "20px",
          borderBottom: "1px solid #ddd",
          width: "80%", // 中央に配置するための幅設定
          maxWidth: "500px", // 最大幅を制限
          transition: "all 0.3s",
          "&:hover": {
            color: "#000000",
            fontSize: "2rem", // ホバー時のサイズを適切に調整
          },
        }}
      >
        <UserAvatar profileUrl={user.profilePicture} username={user.username} size={40} />
        <ListItemText
          primary={
            <Link
              to={`/profile/${user.uid}`}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#000000",
                fontSize: "1.5rem", // フォントサイズの調整
                marginLeft: 15,
              }}
            >
              {user.username}
            </Link>
          }
        />
      </ListItem>
    ))
  ) : (
    <Typography variant="h6" align="center" sx={{ width: "100%", color: "#888" }}>
      No followers found.
    </Typography>
  )}
</List>

        )
      )}

        </div>
    );
};

export default SearchTweetList;

  