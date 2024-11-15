import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';//追加

const SignupForm : React.FC = () => {
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();//追加
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        setError(""); // エラーメッセージをリセット

        try {
            const userCredential = await createUserWithEmailAndPassword(fireAuth, mail, password);
            const uid = userCredential.user.uid;

            await registerUserInDatabase(uid);

            alert("新規アカウント作成成功！");
            navigate("/");
        } catch (error: any) {
            setError(error.message); // エラーメッセージを設定
        }
        setMail("");
        setPassword("");
    };

    const registerUserInDatabase = async (uid: string) => {
        try{
            const result = await fetch("http://localhost:8000/register",{
                method: "POST", body: JSON.stringify({uid: uid, email: mail,}),
            })
            if(!result.ok){
                throw Error(`Failed to create user: ${result.status}`);
            }
        }catch (err){
            console.log(err);
        }
    }


    return (
        <div style={{textAlign: "center", backgroundColor: "lightcyan", borderRadius: "10px"}}>
            <h1>signupform画面</h1>
            <form onSubmit={onSubmit}>
            <h1>新規登録</h1>
            <p>メールアドレスとパスワードを登録してください</p>
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
                <button type="submit">新規登録</button>
            </form>
        </div>
    )
}


export default SignupForm;