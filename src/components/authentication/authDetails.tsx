import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase';

export function AuthDetails({t}:{t: any}) {
    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(()=> {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserDetails(user);
            } else {
                setUserDetails(null);
            }
        })

        return () => {
            listen();
        }
    },[])

    const userSignOut = () => {
        signOut(auth).then(()=>{
            console.log("User signed out!");
        }).catch((error)=> {
            console.log("Error loggin out user!", error);
        })
    }

    return (
        <div>
            {userDetails ? <>
                <p>Email: {userDetails.email}</p>
                <br/>
                <button onClick={userSignOut}>Sign Out</button>
            </>
            :
            <p>User is not logged in</p>
            }
        </div>
    )
}
