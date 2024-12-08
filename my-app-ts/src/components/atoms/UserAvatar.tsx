import React from "react";
import { Avatar
} from "@mui/material";

interface AvatarProps {
  profileUrl: string|undefined|null;
  username: string | undefined | null;
  size: number; // アバターのサイズ
}

const colors = ["#5c3d2e", "#726960", "#b79c79", "#6b4226", "#946c44"];



const UserAvatar: React.FC<AvatarProps> = ({ profileUrl, username, size }) => {
  // profileUrlが空の場合、usernameの1文字目を使う

  const calculateColor = () => {
    if (!username) return colors[0]; // 名前が未設定の場合はデフォルト色

    // 文字コードの合計を計算
    const charSum = Array.from(username).reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0
    );

    // 色のインデックスを計算（文字コード合計の余り）
    const index = charSum % colors.length;
    return colors[index];
  };



  const displayName = username ? username : "匿名";
  const avatarContent = profileUrl ? (
    <Avatar src={profileUrl} alt={displayName} sx={{ width: size, height: size  }} />
  ) : (
    <Avatar sx={{ width: size, height: size, fontSize: size / 2,bgcolor: calculateColor(), // 和風っぽい背景色
        color: "#fff", }}>
      {username?.charAt(0).toUpperCase()}
    </Avatar>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      {avatarContent}
    </div>
  );
};

export default UserAvatar;
