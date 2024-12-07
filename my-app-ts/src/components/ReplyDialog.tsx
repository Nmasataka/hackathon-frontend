import React, {useState} from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button ,Typography, Box,Card, Avatar} from "@mui/material";
import wood from "../Images/woodimage.png"
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface ReplyDialogProps {
  open: boolean;
  onClose: () => void;
  replyContent: string;
  originalUsername?: string;
  originalContent?: string;
  setReplyContent: React.Dispatch<React.SetStateAction<string>>;
  onReplySubmit: () => void;
  
  //originalContent: string ;
}

const ReplyDialog: React.FC<ReplyDialogProps> = ({ open, onClose, replyContent,originalUsername,originalContent, setReplyContent, onReplySubmit
 }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = () => {
    if (!replyContent.trim()) {
      setErrorMessage("リプライ内容を入力してください。"); // 空文字の警告
      return;
    }
    setErrorMessage(""); // エラーをクリア
    onReplySubmit(); // リプライ送信
  };
    
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth >
      <DialogTitle
        style={{backgroundColor: "#d4a373",color: "white",textAlign: "center",fontWeight: "bold",marginBottom: "20px"}}
      >
        リプライ</DialogTitle>

      <DialogContent>


      <Card 
      sx={{
        marginBottom: "16px",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: 3,
        maxWidth: "600px",marginLeft: "auto",marginRight: "auto",
        
        background: `url(${wood})`, 
        backgroundSize: "cover", // テクスチャがカード全体にカバーされるように設定
        backgroundPosition: "center", // 中央に配置
      }}
      
    >



      {/* アイコン部分 */}
      <Box display="flex" alignItems="center">
      <Avatar
        sx={{
          bgcolor: "#5c3d2e", // 和風っぽい背景色
          color: "#fff",
          width: 40,
          height: 40,
          marginRight: 1, // 名前との間隔
          fontFamily: "'Noto Serif JP', serif",
        }}
      >
        {originalUsername?originalUsername[0]:""}
      </Avatar>
        <Typography variant="h6" fontWeight="bold">
          
            {originalUsername}
     

        </Typography>
        </Box>
            <Typography variant="h6" mb={2} style={{ whiteSpace: "pre-line" ,textAlign: "left",fontFamily: "'Noto Serif JP', serif",fontWeight: 'bold', color: 'black'}}>
              {originalContent}
            </Typography>






      </Card>
      <Box display="flex" flexDirection="column" alignItems="left">
  <ExpandMoreIcon sx={{ color: "#1976d2", fontSize: "2rem" }} />
  <ExpandMoreIcon sx={{ color: "#1976d2", fontSize: "2rem" }} />
  <ExpandMoreIcon sx={{ color: "#1976d2", fontSize: "2rem" }} />
</Box>

        <TextField
          autoFocus
          margin="dense"
          label="リプライ内容"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976d2",
              },
              "&:hover fieldset": {
                borderColor: "#115293",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
                borderWidth: "2px",
              },
            },
          }}
          error={!!errorMessage}
        />
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ marginTop: 1, fontWeight: "bold" }}>
            {errorMessage}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{
    fontSize: "1.5rem", // 文字サイズ
    fontWeight: "bold", // 太さ
    color: "#000000", // 色（例: 赤）
    "&:hover": {
      color: "#6C7A89", // ホバー時の背景色
    },}}>
          キャンセル
        </Button>
        <Button onClick={handleSubmit} sx={{
    fontSize: "1.5rem", // 文字サイズ
    fontWeight: "bold", // 太さ
    color: "#000000", // 色（例: 緑）
    "&:hover": {
      color: "#6C7A89",
    },
  }}>
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyDialog;
