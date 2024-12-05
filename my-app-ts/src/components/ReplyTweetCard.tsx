import React,{useState} from "react";
import { Card, CardContent, Typography, Button, IconButton,Dialog, DialogActions, DialogContent, DialogTitle,TextField } from "@mui/material";
import { Favorite, FavoriteBorder,Reply } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PostTweet from "./PostTweet";
import ReplyDialog from "./ReplyDialog";

// ツイートデータの型定義
interface ReplyTweet {
  reply_id: number;
  uid: string;
  content: string;
  created_at: string;
  likes_count: string;
}

// TweetCard コンポーネントのプロップス型
interface TweetCardProps {
  tweet: ReplyTweet;
  //onLike: (tweet_id: number) => void;
  //onRetweet: (tweet_id: number) => void;
}


const ReplyTweetCard: React.FC<TweetCardProps> = ({ tweet}) => {
    const [isLiked, setIsLiked] = useState(true);
    const [likesCount, setLikesCount] = useState<number>(parseInt(tweet.likes_count,10));

    const [isReplying, setIsReplying] = useState(false);  // リプライ用の状態を追加
    const [replyContent, setReplyContent] = useState(""); // リプライの内容
    const navigate = useNavigate();


    const handleRetweet = (e: React.FormEvent) => {
      e.stopPropagation();
      setIsReplying(true); // リツイートボタンが押されたらリプライ欄を表示
    };

    const handleCardClick = () => {
      //alert(`${tweet.tweet_id}`)
      if (isReplying) return;
      navigate(`/tweet/${tweet.reply_id}`);
    };

    const pushlikebutton = async(e: React.FormEvent) => {
        e.stopPropagation();
        try{
            const result = await fetch(`${process.env.REACT_APP_URL}/like`,{
                method: "POST", body: JSON.stringify({tweet_id: tweet.reply_id, uid:localStorage.getItem("uid") }),
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
  




  return (
    <Card style={{ marginBottom: "16px",cursor:"pointer"}} onClick={handleCardClick}>
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
          {/* いいねボタンといいね数 */}
          <IconButton onClick={pushlikebutton} color="secondary">
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {likesCount}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReplyTweetCard;
