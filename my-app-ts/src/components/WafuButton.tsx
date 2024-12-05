import React from "react";
import { Button, styled } from "@mui/material";

// 和風スタイリングされたボタン
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D9A56E", // 和風の金茶色
  color: "#FFFFFF",
  fontFamily: "'Sawarabi Mincho', serif", // Google Fonts
  fontSize: "1rem",
  border: "2px solid #8E5B30", // 濃い茶色の枠
  borderRadius: "8px",
  padding: "8px 16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#C69057",
  },
  "&:active": {
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
  },
}));

// ボタンコンポーネント
export const WafuButton: React.FC<{ label: string }> = ({ label }) => {
  return <StyledButton>{label}</StyledButton>;
};
