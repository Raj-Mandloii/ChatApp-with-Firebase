import React from 'react'

export const Register = () => {
    return (
        <div>
            <div className='formContainer'>

            <div className='formWrapper'>
                <span className="logo">Chat With Firebase</span>
                <span className="title">Register</span>
                <form action=''>
                    <input type="text" placeholder="Display name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label htmlFor='file'>
                        <img src=''/>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p>If you don't have account ? Login</p>
            </div>
            </div>
        </div>
    )
}
