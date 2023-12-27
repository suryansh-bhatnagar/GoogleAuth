import React, { useState } from 'react'
import "./login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginwithgoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self")
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("handle signup", email, password, displayName);
        const data = await axios.post('http://localhost:6005/auth/signup', {
            email: email,
            password: password,
            displayName: displayName
        });

        if (data.data.user) {
            navigate('/login');
        }

    }

    return (
        <>
            <div className="login-page">
                <h1 style={{ textAlign: "center" }}>Signup</h1>
                <div className="form">
                    {/* <form className='login-form'> */}
                    <input type="text" name="" id="" placeholder='name' required onChange={(e) => setDisplayName(e.target.value)} />
                    <input type="email" name="" id="" placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="" id="" placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSignup}>Signup</button>
                    <p className='message'>Already have account ? <a href="login">Login</a></p>
                    {/* </form> */}
                    <button className='login-with-google-btn' onClick={loginwithgoogle}>
                        Sign In With Google
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup