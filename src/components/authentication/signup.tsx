import React, {useState} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export function SignUp({t}: {t: any}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const signUp = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredencials) => {
        console.log('User credentials', userCredencials);
    }).catch((error: Error) => {
        console.log("Error while trying to login", error);
    })
}

return (
    <div>
        <h1>{t("signup") || "Sign Up"}</h1>
        <form 
        onSubmit={signUp}
        className="loginForm">
            <label className="">
                {t("username") || "Username"}
            </label>
            <input 
                type='email'
                placeholder={t("username") || "Enter your email"}
                value={email}
                onChange={(event)=>{setEmail(event.target.value)}}
                />
            <label>{t("password") || "Password"}</label>
            <input 
                type='password'
                placeholder={t("username") || "Enter your password"}
                value={password}
                onChange={(event)=>{setPassword(event.target.value)}}
                />
                <button type="submit">{t("signin") || "Sign in"}</button>
        </form>
    </div>
)
}
