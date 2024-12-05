import React,{useEffect,useState} from "react";
import { Card, CardContent, Typography,Button } from "@mui/material";
import TweetCard from "./TweetCard";
import ReplyTweetCard from "./ReplyTweetCard";

// ツイートデータの型定義
interface ReplyTweet {
  reply_id: number;
  uid: string;
  content: string;
  created_at: string;
  likes_count: string;
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
        <div style={{ padding: "16px" }}>
        {tweets.length === 0 ? (
            <Typography variant="body1" align="center" style={{ width: "100%" }}>
            No tweets available.
            </Typography>
        ) : (
            tweets.map((tweet) => (
                <ReplyTweetCard
                    key={tweet.reply_id}
                    tweet={tweet}
                    //onRetweet={handleRetweet}
                />
            ))
        )}

        </div>
    );
};

export default ReplyList;