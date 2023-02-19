import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/authContext';

const ProtectedRoutes = ({children}: any) => {
    const localUser = localStorage.getItem('github-discovery-user')
    const {currentUser} = UserAuth()
    const user = currentUser ? currentUser : (localUser ? JSON.parse(localUser) : null);
    
    if (!user) {
        return <Navigate to='/' />
    }
    return children
}

export default ProtectedRoutes;
