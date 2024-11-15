import React from 'react';

const Footer: React.FC = () => {
  return (
    <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
      <p>© 2024 YourAppName. All rights reserved.</p>
      <p>
        <a href="/terms" style={{ marginRight: '10px' }}>利用規約</a>
        <a href="/privacy">プライバシーポリシー</a>
      </p>
    </div>
  );
};

export default Footer;
