import React, { useEffect, useState } from "react";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';//追加
import { onBackgroundMessage } from "firebase/messaging/sw";


const InputForm : React.FC = () => {
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();//追加
    
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        setError(""); // エラーメッセージをリセット

        try {
            await signInWithEmailAndPassword(fireAuth, mail, password);
            setMail("");
            setPassword("");
            alert("ログイン成功！");
            setTimeout(() => navigate('/'), 100);
            //navigate('/')
        } catch (error: any) {
            setError(error.message); // エラーメッセージを設定
            alert("login失敗")
            return;
        }
        setMail("");
        setPassword("");
    };

    const onShowSignup = async () => {
        navigate('/signup')
    }

    const Logoutbutton = (): void => {
        signOut(fireAuth).then(() => {
          alert("ログアウトしました");
        }).catch(err => {
          alert(err);
        });
      };




    return (
        <div style={{textAlign: "center", backgroundColor: "cyan", borderRadius: "10px"}}>
            <h1>InputForm画面</h1>
            <form onSubmit={onSubmit} >
            <table style={{margin: "0 auto", marginBottom: "10px", borderSpacing: "20px"}}>
                <tbody>
                <tr>
                    <th>mail address:</th>
                    <th>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    /></th>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>password:</th>
                    <th>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /></th>
                </tr>
                </tbody>
                </table>
                <button type="submit">Login</button>
            </form>
            <div style={{backgroundColor: "lightgreen"}}>
                <h2>登録がまだの方はこちらから</h2>
                <button type="button" onClick={onShowSignup}>Sign Up</button>
            </div>
        </div>
    )
}


export default InputForm;