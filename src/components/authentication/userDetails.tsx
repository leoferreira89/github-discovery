
import React from 'react';
import {UserAuth} from '../../context/authContext'

export function UserDetails({t}:{t: any}) {
    const {currentUser, userSignOut} = UserAuth();

    
    const handleLogOut = () => {
        userSignOut()
    }

    return (
        <div>
            {currentUser ? <>
                <p>Email: {currentUser.email}</p>
                <br/>
                <button onClick={handleLogOut}>Sign Out</button>
            </>
            :
            <p>User is not logged in</p>
            }
        </div>
    )
}
