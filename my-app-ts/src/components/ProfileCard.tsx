import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';

const ProfileCard: React.FC = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ width: 64, height: 64, mb: 2 }} src="/path/to/avatar.png" />
      <Typography variant="h6">User Name</Typography>
      <Typography variant="body2" color="text.secondary">@username</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfileCard;
