import React from "react";
import { Box } from "@mui/material";
import AsanohaImage from "../Images/asa01b.png"; 

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        padding: "16px",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#F5F2E8", 
          backgroundImage: `url(${AsanohaImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundAttachment: "fixed",
          opacity: 0.2, // 透過度を設定 (0.0～1.0)
          zIndex: -1, // 背景を後ろに配置
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Background;
