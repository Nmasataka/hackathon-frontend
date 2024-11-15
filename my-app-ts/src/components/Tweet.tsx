import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

interface TweetProps {
  username: string;
  content: string;
  timestamp: string;
}

const Tweet: React.FC<TweetProps> = ({ username, content, timestamp }) => {
  return (
    <Box sx={{ display: 'flex', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Avatar sx={{ mr: 2 }} src="/path/to/avatar.png" />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">
          <strong>{username}</strong> - <small>{timestamp}</small>
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton>
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Tweet;
