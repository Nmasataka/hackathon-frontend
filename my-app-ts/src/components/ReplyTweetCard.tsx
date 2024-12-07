import React,{useState} from "react";
import { Card, CardContent, Typography, Box, IconButton, DialogActions, DialogContent, DialogTitle,TextField } from "@mui/material";
import { Favorite, FavoriteBorder,Reply } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import PostTweet from "./PostTweet";
import ReplyDialog from "./ReplyDialog";
import { formatToJST } from "../utils/dateUtils";
import wood2 from "../Images/wood2.jpeg"
import UserAvatar from "./atoms/UserAvatar";
// ツイートデータの型定義
interface ReplyTweet {
  reply_id: number;
  uid: string;
  username: string;
  profilePicture: string;
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
        marginBottom: "5px",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: 3,
        cursor: "pointer",
        ":hover": { boxShadow: 6 },
        maxWidth: "500px",height: "auto",marginLeft: "auto",marginRight: "auto",overflow: "hidden", position: "relative",

        backgroundColor: "transparent",
      }}
    >


<Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url(${wood2})`, // 木目画像を背景に設定
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -1, // 背景をコンテンツの後ろに配置
    }}
  />
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.3)", // 白の半透明オーバーレイ
      zIndex: -1, // オーバーレイが背景の上に来るように配置
    }}
  />

<Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
      <Box display="flex" alignItems="center">

      <UserAvatar profileUrl={tweet.profilePicture} username={tweet.username} size={40} />
        <Typography variant="h6" fontWeight="bold" sx={{marginLeft: 1}}>
          <Link to={`/profile/${tweet.uid}`} style={{ textDecoration: "none", color: "#000000" }} onClick={jumptoprofile}>
            {tweet.username}
          </Link>

        </Typography>
        </Box>
        <Typography variant="caption" color="#000000" sx={{fontSize: "0.8rem"}} >
          {formatToJST(tweet.created_at)}
        </Typography>
      </Box>

      <Typography variant="h6" mb={2} style={{ whiteSpace: "pre-line" ,textAlign: "left",fontFamily: "'Noto Serif JP', serif",fontWeight: 'bold', color: 'black', marginLeft: 25}}>
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
