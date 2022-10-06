import React from 'react'
import img from "../assets/addImage.png"
export const Login = () => {
    return (
        <div>
            <div className='formContainer'>

                <div className='formWrapper'>
                    <span className="logo">Chat With Firebase</span>
                    <span className="title">Login</span>
                    <form action=''>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign In</button>
                    </form>
                    <p>If you don't have account ? Login</p>
                </div>
            </div>
        </div>
    )
}
