import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const PostTweet: React.FC<{ onPost: (content: string) => void }> = ({ onPost }) => {
  const [tweet, setTweet] = useState('');

  const handlePost = () => {
    if (tweet.trim()) {
      onPost(tweet);
      setTweet(''); // 投稿後、フィールドをクリア
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <TextField
        label="今何してる？"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handlePost} style={{ marginTop: 10 }}>
        投稿
      </Button>
    </div>
  );
};

export default PostTweet;
