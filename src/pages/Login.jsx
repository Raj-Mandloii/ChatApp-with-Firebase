import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from 'react-router-dom';
import { auth } from '../firebase';
export const Login = () => {
    const navigate = useNavigation()
    const [error, setErr] = useState(false)
    const handleSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await createUserWithEmailAndPassword(auth, email, password)
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
                    <p>If you don't have account ? Register</p>
                </div>
            </div>
        </div>
    )
}
