import React, { useState } from 'react'
import "./login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginwithgoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self")
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("handle signup", email, password,);
        const data = await axios.post('http://localhost:6005/auth/login', {
            email: email,
            password: password,
        });
        console.log(data);

        if (data.data.success) {
            navigate('/dashboard', { 'loginType': 'manual' });
        }
    }

    return (
        <>
            <div className="login-page">
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <div className="form">
                    <input type="email" name="" id="" placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="" id="" placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <p className='message'>Not Registerd? <a href="signup">Create an account</a></p>
                    <button className='login-with-google-btn' onClick={loginwithgoogle}>
                        Sign In With Google
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login