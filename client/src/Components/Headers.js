import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../Context/AuthContext';

const Headers = () => {

    const { token } = useContext(AuthContext);
    const [userdata, setUserdata] = useState({});
    const location = useLocation();


    // logoout
    const logout = () => {
        localStorage.removeItem('token');
        window.open(`${process.env.REACT_APP_SERVER_URL}/logout`, "_self")
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = token === null ? await axios.get(`
                ${process.env.REACT_APP_SERVER_URL}/login/sucess`, { withCredentials: true }) : await axios.get(`${process.env.REACT_APP_SERVER_URL}/login/sucess`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('GEt user  response', response)
                setUserdata(response.data.user)
            } catch (error) {
                console.log("error", error)
            }
        }

        if (location.pathname === '/dashboard') {
            getUser()
        }
    }, [location.pathname, token])

    console.log('User data ', userdata)
    return (
        <>
            <header className='bg-slate-900 text-white h-14 flex px-4 justify-between items-center'>
                <div className='bg-slate-600 my-2 py-1 pl-2 pr-20 rounded-sm' >
                    Search 8000+ tutorials
                </div>
                <div>
                    <p>FreeCodeCamp 🔥</p>
                </div>
                <div className='flex' >
                    <ul className='flex gap-4 items-center'>
                        <li>

                        </li>
                        {
                            Object?.keys(userdata)?.length > 0 ? (
                                <>
                                    <li>{userdata?.displayName}</li>
                                    <li>

                                    </li>
                                    <li className='cursor-pointer' onClick={logout}>Logout</li>
                                </>
                            ) : <li className='flex gap-4'>
                                <NavLink to="/">
                                    Home
                                </NavLink>
                                <NavLink to="/login">
                                    Login
                                </NavLink>
                            </li>
                        }

                    </ul>
                </div>
            </header>
        </>
    )
}

export default Headers