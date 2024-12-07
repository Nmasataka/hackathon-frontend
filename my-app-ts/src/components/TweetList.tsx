import React,{useEffect,useState} from "react";
import { Card, CardContent, Typography,Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"; // スピナー追加
import { motion } from "framer-motion"; // アニメーションライブラリ
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


interface TweetListProps {
    postuids: string | null | undefined; // 取得したいユーザーIDのリスト。未指定なら全て取得。
}

const TweetList: React.FC<TweetListProps> = ({postuids}) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTweets = async () => {
        setIsLoading(true);
        try{
            //const postuidsParam = postuids?.join(",") || "";
            const response = await fetch(`${process.env.REACT_APP_URL}/tweetlist?uid=${localStorage.getItem("uid")}&postuid=${postuids}`,{
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
      }, [postuids]);


    

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
            tweets.map((tweet, index) => (

                <motion.div
            key={tweet.tweet_id}
            initial={{ opacity: 0.5, x: -50 }} // 横からスライドイン
            animate={{ opacity: 1, x: 0 }} // スライドして表示
            transition={{ delay: index * 0.01, type: "spring", stiffness: 100 }}
          >

                <TweetCard
                    key={tweet.tweet_id}
                    tweet={tweet}
                    //onRetweet={handleRetweet}
                />

</motion.div>


            ))
        )}

        </div>
    );
};

export default TweetList;

  