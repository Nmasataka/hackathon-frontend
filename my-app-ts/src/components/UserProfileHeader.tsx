import React, {useState, useEffect} from "react";
import { Box, Typography, Avatar, Divider, Button
  ,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
 } from "@mui/material";
import { formatToJSTmonth } from "../utils/dateUtilsmonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate, Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress"; // スピナー追加
import { motion } from "framer-motion"; // アニメーションライブラリ


interface UserProfileHeaderProps {
  id: string | undefined;
}

interface UserInfo {
  uid: string;
  email: string;
  username: string;
  bio: string;
  created_at: string;
  follow_count: number;
  followed_count: number;
  isfollow: boolean;
}





const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({id}) => {
  const [userinfo, setUserinfo] = useState<UserInfo | null>(null);
  const [isfollow, setIsFollow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const loggedInUid = localStorage.getItem("uid");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUserInfo = async()=>{
    setIsLoading(true);
    console.log("発火");
    console.log(localStorage.getItem("uid"))
    try{
        const response = await fetch(`${process.env.REACT_APP_URL}/loginusername?uid=${id}&login=${localStorage.getItem("uid")}`,{
          method: "GET",
          headers: {"Content-Type":"application/json",},});
        if(!response.ok){
            throw Error(`Failed to create user: ${response.status}`);
        }
        const Res = await response.json();
        console.log(Res[0])
        setUserinfo(Res[0]);
        setIsFollow(Res[0].isfollow);
        console.log(Res[0].isfollow);
    }catch(err){
      console.log(err);
    }finally {
      setIsLoading(false); // ローディング終了
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserInfo();
    }
  }, [id, isfollow]); // id が変わるたびに実行

  const pushfollow = async() => {
    if (isfollow) {
      handleDialogOpen(); // フォロー解除の場合はダイアログを表示
      return;
    }
    try{
        const result = await fetch(`${process.env.REACT_APP_URL}/follow`,{
            method: "POST", body: JSON.stringify({followed_uid: id, follower_uid:localStorage.getItem("uid") }),
        })
        if(!result.ok){
            throw Error(`Failed to create user: ${result.status}`);
        }
        setIsFollow(!isfollow);
    }catch (err){
          console.log(err);
      }
      console.log("push");
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const jumptofollowlist = () => {
    console.log("押された");
    navigate(`/followlist/${id}`)
  }

  const confirmUnfollow = async () => {
    try{
      const result = await fetch(`${process.env.REACT_APP_URL}/follow`,{
          method: "POST", body: JSON.stringify({followed_uid: id, follower_uid:localStorage.getItem("uid") }),
      })
      if(!result.ok){
          throw Error(`Failed to create user: ${result.status}`);
      }
      setIsFollow(!isfollow);
  }catch (err){
        console.log(err);
    }
    console.log("push");
    handleDialogClose(); // ダイアログを閉じる
    console.log("unfollowed");
  };

  const shouldShowFollowButton = loggedInUid !== id;



  return (
    <div>
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
      ):(
    <Box
      sx={{
        width: "100%",
        padding: 3,
        background: "linear-gradient(135deg, #2c2c2c, #3a3a3a)", // 武士っぽい渋い背景
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 1,
          height: "100%",
          width: "100%",
          //backgroundImage: "url('/assets/samurai-pattern.png')", // 和風模様のパターン
          backgroundSize: "cover",
        }}
      />

      <Avatar
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
          border: "3px solid #ffd700", // 金色で高級感を演出
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          fontFamily: "serif", // 和風フォントを指定
          letterSpacing: 2,
          marginBottom: 1,
        }}
      >
        {userinfo?.username}
      </Typography>
      <Divider
        sx={{
          width: "60%",
          backgroundColor: "#ffd700",
          height: 2,
          margin: "8px auto",
        }}
      />
      <Typography
        variant="body1"
        color="#ccc"
        sx={{
          fontStyle: "italic",
          marginBottom: 2,
        }}
      >
        {userinfo?.bio}
      </Typography>
      <CalendarTodayIcon color="action" fontSize="small" />
      <Typography
        variant="body2"
        color="#ddd"
      >
         {formatToJSTmonth(userinfo?.created_at)}
         {" から利用しています。"}

      </Typography>
      {shouldShowFollowButton && (
            <Button
      variant={isfollow ? "contained" : "outlined"}
      //color={isfollow ? "primary" : "secondary"}
      onClick={pushfollow}
    >
      {isfollow ? "フォロー中" : "フォロー"}
    </Button>)}


    <Box
        sx={{
          pointerEvents: "auto",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          gap: 4,
          marginTop: 3,
        }}
        
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GroupsIcon sx={{ color: "#ffd700", marginRight: 1 }} />

          <Button onClick={jumptofollowlist}  sx={{color:"#ddd",
        textDecoration: "none",
        "&:hover": {
          color: "#bbb", // ホバー時に色を変更
        },
      }}><Typography variant="body1">{userinfo?.follow_count} フォロー</Typography></Button>
        </Box>



        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ color: "#ffd700", marginRight: 1 }} />
          <Button onClick={jumptofollowlist}  sx={{color:"#ddd",
        textDecoration: "none",
        "&:hover": {
          color: "#bbb", // ホバー時に色を変更
        },
      }}>
          <Typography variant="body1" color="#ddd">
            {userinfo?.followed_count} フォロワー
            
          </Typography></Button>
          
        </Box>
        
      </Box>



      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>フォロー解除</DialogTitle>
        <DialogContent>
          <DialogContentText>フォロー解除して良いですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            いいえ
          </Button>
          <Button onClick={confirmUnfollow} color="primary" autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  )}
   </div>
  );
};

export default UserProfileHeader;

