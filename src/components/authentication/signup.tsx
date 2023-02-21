import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function SignUp({t}: {t: any}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        };

const signUp = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredencials) => {
        console.log('User credentials', userCredencials);
        navigate('/discovery');
    }).catch((error: Error) => {
        console.log("Error while trying to login", error);
        // TODO: Handle Error
    })
}

return (
    <div className="signInWrapper">
        <h1>{t("signup") || "Sign Up"}</h1>
        <form 
        onSubmit={signUp}
        className="loginForm">
            <label className="">
                {t("email") || "Email"}
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
            <label>{t("password") || "Password"}</label>
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
                <Button type="submit" variant="contained" color="secondary">{t("signup") || "Sign up"}</Button>
        </form>
    </div>
)
}
