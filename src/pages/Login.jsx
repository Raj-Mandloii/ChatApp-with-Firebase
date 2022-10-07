import React, { useState } from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";

import { Link, useNavigate} from 'react-router-dom';
import { auth } from '../firebase';
export const Login = () => {
    const navigate = useNavigate()
    const [error, setErr] = useState(false)
    const handleSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setErr(true);
            //   setLoading(false);
        }
    };


    return (
        <div>
            <div className='formContainer'>

                <div className='formWrapper'>
                    <span className="logo">Chat With Firebase</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign In</button>
                        {error && <span>Something went wrong</span>}

                    </form>
                    <p>If you don't have account ? <Link to={"/register"}>Register</Link></p>
                </div>
            </div>
        </div>
    )
}
