import React, { useState } from 'react';

const TweetInput: React.FC = () => {
  const [tweet, setTweet] = useState('');

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const handleTweetSubmit = () => {
    if (tweet.trim() === '') return;
    console.log('ツイート:', tweet);
    setTweet('');
  };

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <textarea
        placeholder="今どうしてる？"
        value={tweet}
        onChange={handleTweetChange}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', resize: 'none' }}
        rows={3}
      />
      <button
        onClick={handleTweetSubmit}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#1DA1F2',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        ツイートする
      </button>
    </div>
  );
};

export default TweetInput;
