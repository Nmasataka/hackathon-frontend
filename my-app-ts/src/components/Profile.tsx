import React from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ダミーデータ
const userData = {
  avatarUrl: 'https://source.unsplash.com/random/100x100',
  name: 'John Doe',
  username: '@johndoe',
  bio: 'Web developer and tech enthusiast passionate about creating impactful apps.',
  followers: 120,
  following: 150,
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
};

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // 編集ページに遷移
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      {/* 背景画像 */}
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 200,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://source.unsplash.com/random/800x300")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
          }}
        />
        <Avatar
          src={userData.avatarUrl}
          sx={{
            width: 120,
            height: 120,
            border: 4,
            borderColor: 'background.paper',
            position: 'absolute',
            top: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: 3,
          }}
        />
      </Box>

      {/* ユーザー情報 */}
      <Paper sx={{ p: 3, mt: 10, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {userData.name}
        </Typography>
        <Typography color="textSecondary" sx={{ textAlign: 'center' }}>
          {userData.username}
        </Typography>
        <Typography sx={{ mt: 2, textAlign: 'center' }}>{userData.bio}</Typography>

        {/* フォロワーとフォロー */}
        <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{userData.followers}</Typography>
            <Typography color="textSecondary">Followers</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{userData.following}</Typography>
            <Typography color="textSecondary">Following</Typography>
          </Grid>
        </Grid>

        {/* 追加情報（場所、ウェブサイト） */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            <strong>Location:</strong> {userData.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            <strong>Website:</strong>{' '}
            <a href={userData.website} target="_blank" rel="noopener noreferrer">
              {userData.website}
            </a>
          </Typography>
        </Box>

        {/* 編集ボタン */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
            sx={{ width: '200px', fontWeight: 'bold' }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;


