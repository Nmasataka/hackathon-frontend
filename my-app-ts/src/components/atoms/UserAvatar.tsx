import React from "react";
import { Avatar
} from "@mui/material";

interface AvatarProps {
  profileUrl: string|undefined|null;
  username: string | undefined | null;
  size: number; // アバターのサイズ
}

const UserAvatar: React.FC<AvatarProps> = ({ profileUrl, username, size }) => {
  // profileUrlが空の場合、usernameの1文字目を使う
  const displayName = username ? username : "匿名";
  const avatarContent = profileUrl ? (
    <Avatar src={profileUrl} alt={displayName} sx={{ width: size, height: size  }} />
  ) : (
    <Avatar sx={{ width: size, height: size, fontSize: size / 2,bgcolor: "#5c3d2e", // 和風っぽい背景色
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
