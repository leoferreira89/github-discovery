
import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { UserAuth } from '../../context/authContext';

export function UserDetails({t}:{t: any}) {
    const {currentUser} = UserAuth();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    return (
        <div className="userDetailsWrapper">
            <h1>{t("myAccount") || "My Account"}</h1>
            <br/>
            <form 
            onSubmit={()=>{}}
            className="loginForm">
                <label className="inputTitle">
                    {t("username") || "Username"}*
                </label>
                <TextField 
                    id="outlined-basic"
                    type='text'
                    size="small"
                    label={("username")|| "Username"}
                    variant="outlined"
                    value={username}
                    onChange={(event)=>{setUsername(event.target.value)}}
                />
                <br/>
                <label className="inputTitle">
                    {t("email") || "Email"}
                </label>
                <TextField 
                    id="outlined-basic"
                    type='email'
                    size="small"
                    label={`${t("email")}` || "Email*"}
                    variant="outlined"
                    value={email}
                    onChange={(event)=>{setEmail(event.target.value)}}
                />
                <br/>
                <Button style={{width: 100}} type="submit" variant="contained" color="secondary">{t("save") || "Sign in"}</Button>
            </form>
        </div>
    )
}
