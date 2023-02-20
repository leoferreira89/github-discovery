
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Button, TextField } from '@mui/material';
import { updateProfile, updateEmail, getAuth } from "firebase/auth"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function UserDetails({t}:{t: any}) {
    const [email, setEmail] = useState<any>("");
    const [username, setUsername] = useState<any>("");
    const message = useRef("Generic error on form");
    const auth = getAuth();
    const user = auth.currentUser;
    const [open, setOpen] = React.useState(false);

    const openSnackBar = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    useEffect(()=>{
        
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
        }
    },[])

    const validateFormData = useCallback(() => {
        let flag = false;
        if (username === '') {
            flag = true;
            message.current = 'Username is mandatory, and must be diferent from the current username'
        }
        const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regexEmail.test(email)) {
            flag = true;
            message.current = 'Email address is not valid!'
        }
        if (flag) {
            openSnackBar();
            return false;
        }
        return true;
    },[username, email])
    
    const handleUpdateProfile = (e: any) => {
        e.preventDefault();
        if (validateFormData()) {
            
            if (username !== '' && username !== user?.displayName) {
                updateProfile(user!, {displayName: 'Leo'}).then((resp) => {
                    console.log("resp ==>", resp);
                })
            } else {
                message.current = 'Username is mandatory, and must be diferent than the current username'
                openSnackBar()
            }
            if (email !== user?.email) {
                updateEmail(user!, email);
            }
        }
    }

    return (
        <div className="userDetailsWrapper">
            <h1>{t("myAccount") || "My Account"}</h1>
            <br/>
            <form 
            onSubmit={handleUpdateProfile}
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
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message.current}
                action={action}
            />
        </div>
    )
}
