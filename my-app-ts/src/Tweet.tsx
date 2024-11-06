import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

type TweetProps = {
  username: string;
  content: string;
  date: string;
};

const Tweet: React.FC<TweetProps> = ({ username, content, date }) => {
  return (
    <Card style={{ marginBottom: 20 }}>
      <CardContent>
        <Avatar>{username[0]}</Avatar>
        <Typography variant="h6">{username}</Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption" color="textSecondary">{date}</Typography>
      </CardContent>
    </Card>
  );
};

export default Tweet;
