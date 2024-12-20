import React,{useState} from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder,Reply } from "@mui/icons-material";
import { useNavigate,Link } from "react-router-dom";
import ReplyDialog from "./ReplyDialog";
import { formatToJST } from "../utils/dateUtils";
import wood from "../Images/woodimage.png"
import UserAvatar from "./atoms/UserAvatar";
import { CircularProgress } from "@mui/material";

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

interface TweetCardProps {
  tweet: Tweet;
}


const TweetCard: React.FC<TweetCardProps> = ({ tweet}) => {
    const [isLiked, setIsLiked] = useState(tweet.isLiked);
    const [likesCount, setLikesCount] = useState<number>(parseInt(tweet.likes_count,10));
    const [replyCount, setReplyCount] = useState<number>(parseInt(tweet.retweet_count,10));

    const [isReplying, setIsReplying] = useState(false);  // リプライ用の状態を追加
    const [replyContent, setReplyContent] = useState(""); // リプライの内容
    const [errorMessage, setErrorMessage] = useState("");
    const [isImageLoading, setIsImageLoading] = useState(true);
    const navigate = useNavigate();


    const handleRetweet = (e: React.FormEvent) => {
      e.stopPropagation();
      setIsReplying(true); // リツイートボタンが押されたらリプライ欄を表示
    };

    const handleCardClick = () => {
      //alert(`${tweet.tweet_id}`)
      if (isReplying) return;
      navigate(`/tweet/${tweet.tweet_id}`);
    };

    const pushlikebutton = async(e: React.FormEvent) => {
        e.stopPropagation();
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

    };



    const handleCloseReplyDialog = () => {
      setIsReplying(false);
      setReplyContent(""); // 閉じたときにリプライ内容をクリア
      setErrorMessage("")
    };

    const jumptoprofile = (e: React.FormEvent) => {
      e.stopPropagation();
      setIsReplying(true); // リツイートボタンが押されたらリプライ欄を表示
    };


    const handleReplySubmit =async() => {
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
        }catch (err){
            console.log(err);
        }
      };


      const handleReplyDialog = async () => {
        if (!replyContent.trim()) {
          setErrorMessage("リプライ内容を入力してください。");
          return;
        }
      }
  




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

        background: `url(${wood})`, 
        backgroundSize: "cover", // テクスチャがカード全体にカバーされるように設定
        backgroundPosition: "center", // 中央に配置
      }}
      onClick={handleCardClick}
    >

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
      <Box display="flex" alignItems="center">

      <UserAvatar profileUrl={tweet.profilePicture} username={tweet.username} size={40} />
        <Typography variant="h6" fontWeight="bold" sx={{marginLeft: 1,fontFamily: "'Noto Serif JP', serif"}}>
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
      {tweet.image_url && (
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          style={{ height: "200px", width: "100%" }} // スピナーと画像の位置を固定
        >
          {isImageLoading && (
            <CircularProgress
              size={40}
              sx={{
                position: "absolute",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            />
          )}
          <img
            src={tweet.image_url}
            alt="tweet image"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              display: isImageLoading ? "none" : "block", // 読み込み中は非表示
            }}
            onLoad={() => setIsImageLoading(false)} // 画像の読み込み完了時
            onError={() => setIsImageLoading(false)} // エラー時もスピナーを非表示
          />
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={pushlikebutton} 
                      sx={{position: "relative",
                          ":hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.1)", transition: "background-color 0.3s ease", },
                      }}>
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="textSecondary" ml={0.5}>
            {likesCount}
          </Typography>
        </Box>


        <Box display="flex" alignItems="center">
          <IconButton onClick={(e) => {
            e.stopPropagation();
            setIsReplying(true);
          }}>
            <Reply />
          </IconButton>
          <Typography variant="body2" color="textSecondary" ml={0.5}>
            {replyCount}
          </Typography>
        </Box>
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
      
    </Card>
  );
};

   


export default TweetCard;
