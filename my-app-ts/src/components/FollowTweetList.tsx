import React,{useEffect,useState} from "react";
import { Card, CardContent, Typography,Button } from "@mui/material";
import TweetCard from "./TweetCard";
import CircularProgress from "@mui/material/CircularProgress"; // スピナー追加
import { motion } from "framer-motion"; // アニメーションライブラリ


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



const FollowTweetList: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTweets = async () => {
        setIsLoading(true);
        try{
            //const postuidsParam = postuids?.join(",") || "";
            console.log("ここに入ったよ");
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
        }finally {
            setIsLoading(false); // ローディング終了
          }
    }
    useEffect(() => {
        fetchTweets();
      }, []);


    

    return (
        <div style={{ padding: "16px" }}>
            {isLoading ?( // ローディング中の表示
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          >
            <CircularProgress size={80}
              style={{ color: "#d4a373" }} // カスタムカラー（和風）
            />
          </motion.div>
        </div>
      ):
        tweets.length === 0 ? (
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

  