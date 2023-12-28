import React, { createContext, } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [token, setToken] = React.useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);



    return <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;