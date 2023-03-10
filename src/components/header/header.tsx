import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import img2 from '../../assets/images/github-white.png'
import { UserAuth } from '../../context/authContext';

export function Header({t}: any) {
    const auth = getAuth();
    const {currentUser, userSignOut} = UserAuth();
    const [user, setUser] = useState<any>()
    
    useEffect(()=> {
        setUser(currentUser);
    },[currentUser])
    const handleLogOut = () => {
        userSignOut()
    }

    useEffect(()=> {
        onAuthStateChanged(auth, (data)=> {
            console.log("User has been changed", data);
            // If user data changed, set new user
        })
    }, [])

    return (<>
        {user ? 
        // Logged in Header
        <div className='headerWrapper'>
          <div className='leftMenu'>
              <img src={img2} className="logo2"/>
              <a href='/discovery' className='discovery-title'>{t("discovery")}</a>
          </div>
          <div className='rightMenu'>
              <a href='/username' className='discovery-title'>{user?.displayName || user?.email || t("username")}</a>
              <a onClick={handleLogOut} className='discovery-title'>{t("logout")}</a>
          </div>
      </div>
    :
    // Logged out in Header
    <div></div>
    }
</>
    )
}
