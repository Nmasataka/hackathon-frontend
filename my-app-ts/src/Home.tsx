import React from 'react'; 
import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';//追加

export const Home: React.FC = () => {
    const navigate = useNavigate();//追加
    const onlogin = () => {
        navigate('/login')
    }

    return (
        <div  style={{textAlign: "center", backgroundColor: "lightyellow", borderRadius: "10px"}}>
            <h1>ホーム画面</h1>
            <img src={logo} className="App-logo" alt="logo"/>
        </div>
    );
};

export default Home;