import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

interface ReplyDialogProps {
  open: boolean;
  onClose: () => void;
  replyContent: string;
  setReplyContent: React.Dispatch<React.SetStateAction<string>>;
  onReplySubmit: () => void;
}

const ReplyDialog: React.FC<ReplyDialogProps> = ({ open, onClose, replyContent, setReplyContent, onReplySubmit }) => {


    
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        style={{backgroundColor: "#1976d2",color: "white",textAlign: "center",fontWeight: "bold",marginBottom: "20px"}}
      >
        リプライ</DialogTitle>
      <DialogContent>
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={onReplySubmit} color="primary">
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyDialog;
