import React,{useState} from "react";
import { Card, CardContent, Typography, Box, IconButton, DialogActions, DialogContent, DialogTitle,TextField } from "@mui/material";
import { Favorite, FavoriteBorder,Reply } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import PostTweet from "./PostTweet";
import ReplyDialog from "./ReplyDialog";
import { formatToJST } from "../utils/dateUtils";

// ツイートデータの型定義
interface ReplyTweet {
  reply_id: number;
  uid: string;
  username: string;
  content: string;
  created_at: string;
  likes_count: string;
  isLiked: boolean;
}

// TweetCard コンポーネントのプロップス型
interface TweetCardProps {
  tweet: ReplyTweet;
}


const ReplyTweetCard: React.FC<TweetCardProps> = ({ tweet}) => {
    const [isLiked, setIsLiked] = useState(tweet.isLiked);
    const [likesCount, setLikesCount] = useState<number>(parseInt(tweet.likes_count,10));

    const [isReplying, setIsReplying] = useState(false);  // リプライ用の状態を追加
    const [replyContent, setReplyContent] = useState(""); // リプライの内容
    const navigate = useNavigate();



    /*
    const handleCardClick = () => {
      //alert(`${tweet.tweet_id}`)
      if (isReplying) return;
      navigate(`/tweet/${tweet.reply_id}`);
    };
    */

    const pushlikebutton = async(e: React.FormEvent) => {
        e.stopPropagation();
        try{
            const result = await fetch(`${process.env.REACT_APP_URL}/replylike`,{
                method: "POST", body: JSON.stringify({uid:localStorage.getItem("uid"),tweet_id: tweet.reply_id, }),
            })
            if(!result.ok){
                throw Error(`Failed to create user: ${result.status}`);
            }
            setIsLiked(!isLiked);
            setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        }catch (err){
            console.log(err);
        }

    };



    const handleCloseReplyDialog = () => {
      setIsReplying(false);
      setReplyContent(""); // 閉じたときにリプライ内容をクリア
    };


    const handleReplySubmit =async() => {
        try{
            const result = await fetch(`${process.env.REACT_APP_URL}/reply`,{
                method: "POST", 
                body: JSON.stringify(
                  {uid: localStorage.getItem("uid"), content: replyContent, parent_tweet_id: tweet.reply_id}),
            })
            if(!result.ok){
                throw Error(`Failed to create user: ${result.status}`);
            }
            console.log("送信成功です")
            setIsReplying(false);
            setReplyContent("");
            //setReplyCount(replyCount + 1);
        }catch (err){
            console.log(err);
        }
      };
  
      const jumptoprofile = (e: React.FormEvent) => {
        e.stopPropagation();
        //setIsReplying(true); // リツイートボタンが押されたらリプライ欄を表示
      };



  return (
    
      <Card 
      sx={{
        marginBottom: "16px",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: 3,
        cursor: "pointer",
        ":hover": { boxShadow: 6 },
        maxWidth: "600px",marginLeft: "auto",marginRight: "auto",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" fontWeight="bold">
          <Link to={`/profile/${tweet.uid}`} style={{ textDecoration: "none", color: "#1976d2" }} onClick={jumptoprofile}>
            {tweet.username}
          </Link>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {formatToJST(tweet.created_at)}
        </Typography>
      </Box>

      <Typography variant="body1" mb={2} style={{ whiteSpace: "pre-line" }}>
        {tweet.content}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={pushlikebutton}>
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="textSecondary" ml={0.5}>
            {likesCount}
          </Typography>
        </Box>
      </Box>
    </Card>

    
  );
};

export default ReplyTweetCard;


{/*
    <Card style={{ marginBottom: "16px",cursor:"pointer"}}>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {tweet.content}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Posted on: {new Date(tweet.created_at).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="secondary">
          Likes: {likesCount}
        </Typography>
        <Typography variant="body2" color="secondary">
          tweet_id: {tweet.reply_id}
        </Typography>


          <div style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
          <IconButton onClick={pushlikebutton} color="secondary">
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {likesCount}
          </Typography>
        </div>
      </CardContent>
      */}
