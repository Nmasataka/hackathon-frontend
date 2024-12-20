import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, List, ListItem, ListItemText, Typography, CircularProgress, Button, Avatar } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import wood from "../Images/woodimage.png"
import UserAvatar from "./atoms/UserAvatar";

interface User {
  uid: string;
  username: string;
  profilePicture: string;
}

interface FollowPageProps {
  id: string; // 対象ユーザーのUID
}



const FollowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [userDetails, setUserDetails] = useState<string>("");
  const [userPicture, setUserpicure] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0); // 0: フォロー中, 1: フォロワー
  const [followingList, setFollowingList] = useState<User[]>([]);
  const [followersList, setFollowersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  

  // APIからデータを取得
  const fetchFollowData = async () => {
    setLoading(true);
    try {
      const followingResponse = await fetch(
        `${process.env.REACT_APP_URL}/following?uid=${id}`
      );
      const followersResponse = await fetch(
        `${process.env.REACT_APP_URL}/followers?uid=${id}`
      );
      const response = await fetch(`${process.env.REACT_APP_URL}/loginusername?uid=${id}&login=${localStorage.getItem("uid")}`,{
        method: "GET",
        headers: {"Content-Type":"application/json",},});
      if (!followingResponse.ok || !followersResponse.ok || !response.ok) {
        throw new Error("Failed to fetch data");
      }
      const followingData = await followingResponse.json();
      const followersData = await followersResponse.json();
      const Res = await response.json();
      console.log(followersData);
      console.log(followingData);
      setFollowingList(followingData);
      setFollowersList(followersData);
      setUserDetails(Res[0].username);
      setUserpicure(Res[0].profilePicture);
    } catch (error) {
      console.error("Error fetching follow data:", error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchFollowData();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderEmptyMessage = () => (
    <Box textAlign="center" mt={4}>
      <Typography variant="body1" color="textSecondary" sx={{fontSize: "1.5rem"}}>
        {activeTab === 0 ? "フォロー中のユーザーはいません。" : "フォロワーはいません。"}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", padding: 2 ,background: `url(${wood})`, 
    backgroundSize: "cover", // テクスチャがカード全体にカバーされるように設定
    backgroundPosition: "center", borderRadius: "20", minHeight:"60vh"}}>
      {/* ユーザー情報の表示 */}
      {userDetails && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 3,
            borderBottom: "1px solid #ddd",
            paddingBottom: 2,
          }}
        >
          <UserAvatar profileUrl={userPicture} username={userDetails} size={64} />
          <Link
                          to={`/profile/${id}`}
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "#1976d2",
                            
                          }}
                        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#264653",fontSize: "2.5rem" ,marginLeft: 1}}>
            {userDetails}
          </Typography>
          </Link>
        </Box>
      )}

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        variant="fullWidth"
        sx={{
          marginBottom: 2,
          "& .MuiTab-root": {
            fontWeight: "bold",
            fontSize: "1.1rem",
          },
          "& .Mui-selected": {
            color: "#00A497",
          },
          "& .MuiTabs-indicator": {
      backgroundColor: "#000000", // インジケータの色を変更
    },
        }}
      >
        <Tab label="フォロー中" />
        <Tab label="フォロワー" />
      </Tabs>
      {loading ? (
        <Box textAlign="center" marginTop={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {(activeTab === 0 ? followingList : followersList).length === 0
            ? renderEmptyMessage()
            : (
              <List>
                {(activeTab === 0 ? followingList : followersList).map((user) => (
                  <ListItem
                    key={user.uid}
                    sx={{
                    borderRadius: "20px",
                      borderBottom: "1px solid #ddd",
                      "&:hover": {
                        //backgroundColor: "#f9f9f9",
                        color:  "#000000",
                        fontSize: "2.5rem",

                      },
                    }}
                  >
                    <UserAvatar profileUrl={user.profilePicture} username={user.username} size={40} />
                    <ListItemText
                      primary={
                        <Link
                          to={`/profile/${user.uid}`}
                          
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "#000000",
                            fontSize: "1.8rem",
                            marginLeft: 15
                            
                            }}
                          

                        >
                          {user.username}
                        </Link>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
        </>
      )}
    </Box>
  );
};

export default FollowPage;
