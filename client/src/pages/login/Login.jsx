import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className="loginContainer">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialMediaApp</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you with SocialMediaApp
                </span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder = 'Email' className="loginInput" />
                    <input placeholder = 'Password' className="loginInput" />
                    <button className="loginButton">Login</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">Create a new account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login