import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Divider, Avatar } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline, Share, Repeat } from '@mui/icons-material';

const Feed: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  // 仮データ
  const postData = {
    avatarUrl: 'https://source.unsplash.com/random/100x100',
    name: 'Jane Doe',
    username: '@janedoe',
    content: 'This is a sample tweet. #React #MaterialUI',
    likes: 120,
    retweets: 45,
    comments: 30,
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleRetweet = () => {
    setRetweeted(!retweeted);
  };

  return (
    <Box sx={{ p: 2, borderBottom: '1px solid #e6ecf0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={postData.avatarUrl} sx={{ width: 40, height: 40, mr: 2 }} />
        <Box>
          <Typography variant="body1">{postData.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {postData.username}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {postData.content}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* いいねボタン */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLike}>
            {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">{liked ? postData.likes + 1 : postData.likes}</Typography>
        </Box>

        {/* リツイートボタン */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleRetweet}>
            <Repeat sx={{ color: retweeted ? 'green' : 'gray' }} />
          </IconButton>
          <Typography variant="body2">{retweeted ? postData.retweets + 1 : postData.retweets}</Typography>
        </Box>

        {/* コメントボタン */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <ChatBubbleOutline />
          </IconButton>
          <Typography variant="body2">{postData.comments}</Typography>
        </Box>

        {/* シェアボタン */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <Share />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;


