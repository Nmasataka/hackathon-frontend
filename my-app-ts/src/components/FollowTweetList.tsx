import React,{useEffect,useState} from "react";
import { Card, CardContent, Typography,Button } from "@mui/material";
import TweetCard from "./TweetCard";


// ツイートデータの型定義
interface Tweet {
  tweet_id: number;
  uid: string;
  username: string;
  content: string;
  created_at: string;
  likes_count: string;
  retweet_count: string;
  isLiked: boolean;
}



const FollowTweetList: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    const fetchTweets = async () => {
        try{
            //const postuidsParam = postuids?.join(",") || "";
            const response = await fetch(`${process.env.REACT_APP_URL}/followtweetlist?uid=${localStorage.getItem("uid")}`,{
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
      }, []);


    

    return (
        <div style={{ padding: "16px" }}>
        {tweets.length === 0 ? (
            <Typography variant="body1" align="center" style={{ width: "100%" }}>
            No tweets available.
            </Typography>
        ) : (
            tweets.map((tweet) => (
                <TweetCard
                    key={tweet.tweet_id}
                    tweet={tweet}
                    //onRetweet={handleRetweet}
                />
            ))
        )}

        </div>
    );
};

export default FollowTweetList;

  