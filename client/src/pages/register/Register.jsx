import React from 'react'
import './register.css'

const Register = () => {
  return (
    <div className="registerContainer">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">SocialMediaApp</h3>
                <span className="registerDesc">
                    Connect with friends and the world around you with SocialMediaApp
                </span>
            </div>
            <div className="registerRight">
                <div className="registerBox">
                    <input placeholder = 'Username' className="registerInput" />
                    <input placeholder = 'Email' className="registerInput" />
                    <input placeholder = 'Password' className="registerInput" />
                    <input placeholder = 'Retype Password' className="registerInput" />
                    <button className="registerButton">
                        Create an account
                    </button>
                    <button className="registerLoginButton">
                        Login to your account
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register