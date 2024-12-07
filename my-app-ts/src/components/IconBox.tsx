import React from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 任意のMUIアイコンを使用
import SakuraImage from "../Images/ougi.jpg"; 

const IconBox: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100px", // ボックスのサイズ
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // 必須: ::before を親要素内に正しく配置
        borderRadius: "50%", // 丸いボックス
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 少し浮いているような影
        overflow: "hidden", // 丸いボックスの外にはみ出す部分を隠す
        "&::before": {
          content: '""',
          position: "absolute", // ボックス内で絶対位置に配置
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${SakuraImage})`,
          backgroundSize: "cover", // 背景画像をボックス全体にフィット
          backgroundPosition: "center",
          opacity: 0.5, // デフォルトで薄い背景
          zIndex: -1, // 背景をアイコンの後ろに配置
          transition: "opacity 0.3s ease", // 背景画像の透明度を滑らかに変更
        },
        "&:hover::before": {
          opacity: 1, // ホバー時に背景を濃く
        },
        "&:hover": {
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // ホバー時に影を強調
          transform: "scale(1.05)", // ボックス全体を少し拡大
        },
      }}
    >
      <FavoriteIcon sx={{ fontSize: "40px", color: "#E63946" }} /> {/* 中央のアイコン */}
    </Box>
  );
};

export default IconBox;

