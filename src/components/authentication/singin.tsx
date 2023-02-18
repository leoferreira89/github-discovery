import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import { auth } from '../../firebase';

export function SignIn({t}:{t: any}) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    const signIn = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredencials) => {
            console.log('User credentials', userCredencials);
        }).catch((error: Error) => {
            console.log("Error while trying to login", error);
        })
    }

    return (
        <div>
            <h1>{t("signin") || "Sign In"}</h1>
            <form 
            onSubmit={signIn}
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
            {/* TODO: ADD LOCAL TRANSLATIONS */}
            <label>{t("haveAnAccount") || "Do you have an account?"}</label>
        </div>
    )
}
