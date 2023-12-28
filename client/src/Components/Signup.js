import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Constants';

const Signup = () => {

    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginwithgoogle = () => {
        window.open(`${SERVER_URL}/auth/google/callback`, "_self")
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("handle signup", email, password, displayName);
        const data = await axios.post(`${SERVER_URL}/auth/signup`, {
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
            <div className=" w-1/3 mx-auto my-16 flex flex-col gap-6">
                <h1 className='text-3xl font-semibold text-center'>Signup</h1>
                <div className="flex flex-col gap-4">
                    <input className='border border-gray-400 rounded-md px-4 py-1' type="text" name="" id="" placeholder='Name' required onChange={(e) => setDisplayName(e.target.value)} />
                    <input className='border border-gray-400 rounded-md px-4 py-1' type="email" name="" id="" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                    <input className='border border-gray-400 rounded-md px-4 py-1' type="password" name="" id="" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-gray-900 w-fit  text-white px-4 py-1 rounded-md mx-auto' onClick={handleSignup}>Signup</button>
                    <p className='text-sm text-center'>Already have account ? <a className='text-blue-700' href="login">Login</a></p>
                    <button className='border border-gray-600 w-fit mx-auto text-sm px-4 py-1 rounded-md' onClick={loginwithgoogle}>
                        Sign In With Google
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup