import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, CircularProgress,Box,Divider,IconButton, Avatar } from "@mui/material";
import { Favorite, FavoriteBorder,Reply } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyList from "./ReplyList";
import { formatToJST } from "../utils/dateUtils";
import ReplyDialog from "./ReplyDialog";
import UserAvatar from "./atoms/UserAvatar";
import wood from "../Images/woodimage.png"


// ツイートデータの型定義
interface Tweet {
  tweet_id: number;
  uid: string;
  username: string,
  profilePicture: string;
  created_at: string;
  content: string;
  likes_count: number;
  retweet_count: number;
  image_url:string;
  isLiked: boolean;
}







const TweetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ルートからツイートIDを取得
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [replyCount, setReplyCount] = useState<number>(0);

  const [isReplying, setIsReplying] = useState(false);  // リプライ用の状態を追加
  const [replyContent, setReplyContent] = useState(""); // リプライの内容
  const [refreshReplies, setRefreshReplies] = useState(false);


  const fetchTweetDetail = async() => {
    try{
        const response = await fetch(`${process.env.REACT_APP_URL}/tweet?tweet_id=${id}&uid=${localStorage.getItem("uid")}`,{
            method: "GET",
            headers: {"Content-Type":"application/json",},});
          if(!response.ok){
              throw Error(`Failed to create user: ${response.status}`);
          }
          const Res = await response.json();
          setTweet(Res[0]);
          setIsLiked(Res[0].isLiked);
          setLikesCount(parseInt(Res[0].likes_count,10));
          setReplyCount(parseInt(Res[0].retweet_count,10));
          //console.log("uoaewhfkjawbfjkabwhjf")
    }catch(err){
        console.log(err);
    }
  }

  
  useEffect(() => {
    fetchTweetDetail();
  }, [id, refreshReplies]);

  useEffect(() => {
    console.log("Tweet updated:", tweet);
  }, [tweet]);




  const pushlikebutton = async(e: React.FormEvent) => {
    e.stopPropagation();
    if (tweet!=null){
    try{
        const result = await fetch(`${process.env.REACT_APP_URL}/like`,{
            method: "POST", body: JSON.stringify({tweet_id: tweet.tweet_id, uid:localStorage.getItem("uid") }),
        })
        if(!result.ok){
            throw Error(`Failed to create user: ${result.status}`);
        }
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    }catch (err){
        console.log(err);
    }
  }

};

const handleCloseReplyDialog = () => {
  setIsReplying(false);
  setReplyContent(""); // 閉じたときにリプライ内容をクリア
};

const handleReplySubmit =async() => {
  if(tweet==null) return;
  try{
      const result = await fetch(`${process.env.REACT_APP_URL}/reply`,{
          method: "POST", 
          body: JSON.stringify(
            {uid: localStorage.getItem("uid"), content: replyContent, parent_tweet_id: tweet.tweet_id}),
      })
      if(!result.ok){
          throw Error(`Failed to create user: ${result.status}`);
      }
      console.log("送信成功です")
      setIsReplying(false);
      setReplyContent("");
      setReplyCount(replyCount + 1);
      setRefreshReplies((prev) => !prev);
  }catch (err){
      console.log(err);
  }
};

    


  return (
    <div style={{ padding: "16px" }}>

      {tweet === null ?(
        <Box>
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
        {/* ローディング中のクルクル */}
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Box>
      ):(
        <Box>
        <Box
        sx={{
          maxWidth: 600,
          margin: "32px auto",
          padding: 3,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          background: `url(${wood})`, 
        backgroundSize: "cover", // テクスチャがカード全体にカバーされるように設定
        backgroundPosition: "center", // 中央に配置
        }}
      >
        
        {/* ユーザー情報 */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box  display="flex" alignItems="center">

        <UserAvatar profileUrl={tweet.profilePicture} username={tweet.username} size={48} />
          {/*<Avatar  alt={tweet.uid} sx={{ width: 48, height: 48, marginRight: 2 }} />*/}
        


          <Typography variant="h5" fontWeight="bold" sx={{marginLeft: 1}}>
          <Link to={`/profile/${tweet.uid}`} style={{ textDecoration: "none", color: "#000000" }} onClick={(e)=>e.stopPropagation()}>

            {tweet.username}
            </Link>
          </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          {formatToJST(tweet.created_at)}
        </Typography>


        </Box>
  
        {/* ツイート内容 */}
        <Typography variant="h5" sx={{ marginBottom: 2, whiteSpace: "pre-wrap" ,textAlign: "left",fontFamily: "'Noto Serif JP', serif",fontWeight: 'bold', color: 'black', marginLeft: 3, marginTop: 3}}>
          {tweet.content}
        </Typography>
        {tweet.image_url && (
  <Box
    mt={2}
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <img 
      src={tweet.image_url} 
      alt="tweet image" 
      style={{
        width: "100%", 
        //maxHeight: "200px", 
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }} 
    />
  </Box>
)}
  
        {/* ツイート日時 */}
        
  
        <Divider sx={{ marginY: 2,borderWidth: 1.5, borderColor: "#8B5E3C" }} />
  
        {/* アクションボタン */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* いいねボタン */}
            <IconButton onClick={pushlikebutton} sx={{ marginRight: 1 }}>
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" sx={{color:"#000000", fontWeight: "bold"}}>{likesCount}</Typography>
  
            {/* 返信ボタン */}
            <IconButton  sx={{ marginLeft: 3, marginRight: 1 }} onClick={(e) => {
            e.stopPropagation();
            setIsReplying(true);
          }}>
              <ChatBubbleOutlineIcon sx={{color: "#000000"}} />
            </IconButton>
            <Typography variant="body2" sx={{color:"#000000", fontWeight: "bold"}}>{replyCount}</Typography>
          </Box>
  
        
          <ReplyDialog
        open={isReplying}
        onClose={handleCloseReplyDialog}
        replyContent={replyContent}
        originalUsername={tweet.username}
        originalContent={tweet.content}
        originalPicure={tweet.profilePicture}
        setReplyContent={setReplyContent}
        onReplySubmit={handleReplySubmit}

      />
        </Box>
       

      </Box>
      
      <ReplyList id={tweet.tweet_id} refreshReplies={refreshReplies}/>
  
      </Box>
      )}
    </div>
  );
};

export default TweetDetail;

