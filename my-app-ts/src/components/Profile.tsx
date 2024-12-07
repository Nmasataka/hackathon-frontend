import React, {useState} from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper } from '@mui/material';
import UserProfileHeader from "./UserProfileHeader";
import TweetList from './TweetList';
import { useParams } from "react-router-dom";


const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <UserProfileHeader id = {id}/>
      <TweetList postuids={id}/>
    </Box>
  );
};

export default Profile;


