import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';

// トレンドのデータ（仮）
const trends = [
  { topic: "React 18", tweets: "25.4K Tweets" },
  { topic: "TypeScript", tweets: "19.8K Tweets" },
  { topic: "Material UI", tweets: "15.6K Tweets" },
  { topic: "JavaScript", tweets: "50K Tweets" },
  { topic: "OpenAI", tweets: "30.1K Tweets" },
];

const Trends: React.FC = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#f5f8fa',
        width: '100%',
        maxWidth: 350,
        minHeight: 300,
      }}
    >
      {/* ヘッダー */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Trends for you
      </Typography>

      {/* トレンドリスト */}
      <List>
        {trends.map((trend, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemText 
                primary={trend.topic}
                secondary={trend.tweets}
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: 'textSecondary' }}
              />
            </ListItem>
            {/* 区切り線 */}
            {index < trends.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default Trends;
