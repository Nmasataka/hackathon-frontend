import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import PostTweet from './PostTweet';
import Tweet from './Tweet';

function App() {
  const [tweets, setTweets] = useState<{ username: string; content: string; date: string }[]>([]);

  const handlePost = (content: string) => {
    const newTweet = {
      username: 'ユーザー名', // 仮のユーザー名。後で認証機能などで動的に変更可能
      content,
      date: new Date().toLocaleString(),
    };
    setTweets([newTweet, ...tweets]);
  };
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <div style={{ padding: 20 }}>
          <h1>Twitterクローン</h1>
          <PostTweet onPost={handlePost} />
          {tweets.map((tweet, index) => (
            <Tweet key={index} username={tweet.username} content={tweet.content} date={tweet.date} />
          ))}
    </div>
    </div>
  );
}

export default App;
