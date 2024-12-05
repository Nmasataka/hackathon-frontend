import React, {useState, useEffect} from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import { formatToJSTmonth } from "../utils/dateUtilsmonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";


interface UserProfileHeaderProps {
  id: string | undefined;
}

interface UserInfo {
  uid: string;
  email: string;
  username: string;
  bio: string;
  created_at: string;
}





const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({id}) => {
  const [userinfo, setUserinfo] = useState<UserInfo | null>(null);
  const fetchUserInfo = async()=>{
    try{
        const response = await fetch(`${process.env.REACT_APP_URL}/loginusername?uid=${id}`,{
          method: "GET",
          headers: {"Content-Type":"application/json",},});
        if(!response.ok){
            throw Error(`Failed to create user: ${response.status}`);
        }
        const Res = await response.json();
        //console.log(Res[0].username)
        setUserinfo(Res[0]);
        
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserInfo();
    }
  }, [id]); // id が変わるたびに実行



  return (
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
      {/* 背景に和風の模様や刀のシルエットを入れる */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 1,
          height: "100%",
          width: "100%",
          backgroundImage: "url('/assets/samurai-pattern.png')", // 和風模様のパターン
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
    </Box>
  );
};

export default UserProfileHeader;

