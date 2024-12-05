import React, { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


interface ChildComponentProps {
    uid: string | null;
  }


const PostTweet: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePostTweet = async(e: React.FormEvent) => {
    try{
        const result = await fetch(`${process.env.REACT_APP_URL}/posttweet`,{
            method: "POST", body: JSON.stringify({uid: localStorage.getItem("uid"), content: content}),
        })
        if(!result.ok){
            throw Error(`Failed to create user: ${result.status}`);
        }
        alert("送信成功です")
        setContent("");
    }catch (err){
        console.log(err);
    }

  };


  return (
   
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">


        <Card sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
            What's happening?
            </Typography>
            <TextField
                value={content}
                onChange={handleContentChange}
                placeholder="Write your tweet here..."
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePostTweet}
                sx={{ mt: 2 }}
            >
                Post Tweet
            </Button>
        </CardContent>
        </Card>
    </Box>
  );
};

export default PostTweet;
