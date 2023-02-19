import React from 'react'
import img2 from '../../assets/images/github-white.png'
import { UserAuth } from '../../context/authContext';

export function Header({t}: any) {
    const {currentUser, userSignOut} = UserAuth();

    const handleLogOut = () => {
        console.log("WAs CLICKED!");
        userSignOut()
    }

    return (<>
        {currentUser ? 
        // Loggin in Header
        <div className='headerWrapper'>
          <div className='leftMenu'>
              <img src={img2} className="logo2"/>
              <a href='/discovery' className='discovery-title'>{t("discovery")}</a>
          </div>
          <div className='rightMenu'>
              <a href='/username' className='discovery-title'>{t("username")}</a>
              <a onClick={handleLogOut} className='discovery-title'>{t("logout")}</a>
          </div>
      </div>
    :
    // Loggout in Header
    <div></div>
    }
</>
    )
}
