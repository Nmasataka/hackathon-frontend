import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  // フォームの状態管理
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('Web developer and tech enthusiast');

  // フォームの送信処理（仮）
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Profile:', { name, bio });
    navigate('/profile'); // プロフィールページに戻る
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Bio"
        multiline
        rows={4}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
};

export default EditProfile;
