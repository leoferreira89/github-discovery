import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function SignIn({t}:{t: any}) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = React.useState(false);
        const navigate = useNavigate();

        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
          };

    const signIn = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredencials) => {
            console.log('User credentials', userCredencials);
            navigate('/discovery');
        }).catch((error: Error) => {
            console.log("Error while trying to login", error);
        })
    }

    return (
        <div className="signInWrapper">
            <h1>{t("signin") || "Sign In"}</h1>
            <form 
            onSubmit={signIn}
            className="loginForm">
                <label className="inputTitle">
                    {t("username") || "Username"}
                </label>
                <TextField 
                    id="outlined-basic"
                    type='email'
                    size="small"
                    label={t("email") || "Enter your email"}
                    variant="outlined"
                    value={email}
                    onChange={(event)=>{setEmail(event.target.value)}}
                />
                <br/>
                <label className="inputTitle">
                    {t("password") || "Password"}
                </label>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    size="small"
                    value={password}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label={t("enterPassword") || "Enter your password"}
                    onChange={(event)=>{setPassword(event.target.value)}}
                />
                <br/>
                <Button type="submit" variant="contained" color="secondary">{t("signin") || "Sign in"}</Button>
            </form>
            <br/>
            <div className="createAccountLinkWrapper">
                <a>{t("haveAnAccount") || "Don't have an account? "} </a>
                <a href="/signup">{t("clickHere") || "Click here to sign up"}</a>
            </div>
        </div>
    )
}
