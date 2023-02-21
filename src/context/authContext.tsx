import React, {useEffect, useState, createContext, useContext} from 'react';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

let  defaultValue: any;

export const AuthContext = createContext<any>(defaultValue);

export const AuthProvider = ({children}: any) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(()=> {
        const authSubscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                localStorage.setItem('github-discovery-user', JSON.stringify(user))
            } else {
                setCurrentUser(null);
                localStorage.removeItem('github-discovery-user')
            }
        })

        return () => {
            authSubscription();
        }
    },[])

    const userSignOut = () => {
        signOut(auth).then(()=>{
            console.log("User signed out!");
            navigate('/');
        }).catch((error)=> {
            console.log("Error loggin out user!", error);
        })
    }

    return (
        <AuthContext.Provider value={{currentUser, userSignOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
