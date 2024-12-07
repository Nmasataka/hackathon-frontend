import React,{useEffect,useState} from "react";
import { Card, CardContent, Typography,Button, Box } from "@mui/material";
import ReplyTweetCard from "./ReplyTweetCard";

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

interface Uid {
    id: number;
    refreshReplies: boolean;
}

const ReplyList: React.FC<Uid> = ({id, refreshReplies}) => {
    const [tweets, setTweets] = useState<ReplyTweet[]>([]);

    const fetchTweets = async() => {
        try{
            const response = await fetch(`${process.env.REACT_APP_URL}/replylist?uid=${localStorage.getItem("uid")}&parent_tweet_id=${id}`,{
                method: "GET",
                headers: {"Content-Type":"application/json",},});
              if(!response.ok){
                  throw Error(`Failed to create user: ${response.status}`);
              }
              const Res = await response.json();
              setTweets(Res);
              console.log(Res);
        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        fetchTweets();
      }, [id, refreshReplies]);


    

    return (
        <Box
      sx={{
        padding: "16px",
        maxWidth: "900px", 
        margin: "auto", // 中央揃え
        //backgroundColor: "#f7f7f7", // 背景色を追加して柔らかい印象に
        borderRadius: "10px", // 角丸にして柔らかさを出す
        //boxShadow: 3, 少しだけ影をつけて浮き立たせる
      }}
    >
        {tweets.length === 0 ? (
            <Typography variant="body1" align="center" style={{ width: "100%" }}>
            No tweets available.
            </Typography>
        ) : (
            tweets.map((tweet) => (
                <ReplyTweetCard key={tweet.reply_id} tweet={tweet}/>
            ))
        )}

        </Box>
    );
};

export default ReplyList;