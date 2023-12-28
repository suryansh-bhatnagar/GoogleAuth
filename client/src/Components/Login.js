import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {

    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginwithgoogle = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google/callback`, "_self")
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                email: email,
                password: password,
            });
            console.log(data);

            if (data.data.success) {
                setToken(data.data.token);
                localStorage.setItem('token', data.data.token);
                navigate('/dashboard');
            }

        } catch (error) {
            console.log(error)
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className="  w-1/3 mx-auto my-16 flex flex-col gap-6">
                <h1 className='text-3xl font-semibold text-center'>Login</h1>
                <div className="flex flex-col gap-4">
                    <input className='border border-gray-400 rounded-md px-4 py-1' type="email" name="" id="" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                    <input className='border border-gray-400 rounded-md px-4 py-1' type="password" name="" id="" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-gray-900 w-fit  text-white px-4 py-1 rounded-md mx-auto' onClick={handleLogin}>Login</button>
                    <p className='text-sm text-center'>Not Registerd? <Link to={'/signup'} className='text-blue-700' >Create an account</Link></p>
                    <button className='border border-gray-600 w-fit mx-auto text-sm px-4 py-1 rounded-md' onClick={loginwithgoogle}>
                        Sign In With Google
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login