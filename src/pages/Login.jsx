import React, { useState } from 'react'
import './Login.css'

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={onSubmitHandler} className='login-form'>
            <div className='login-header'>
                <p className='login-title'>{currentState}</p>
                <hr className='login-hr' />
            </div>
            {currentState === 'Login' ? null : <input className='login-input' type="text" placeholder='Name' required />}
            <input className='login-input' type="email" placeholder='Email' required />
            <input className='login-input' type="password" placeholder='Password' required />
            <div className='login-links'>
                <p className='login-link'>Forgot your password?</p>
                {
                    currentState === 'Login'
                        ? <p onClick={() => setCurrentState('Sign Up')} className='login-link'>Create account</p>
                        : <p onClick={() => setCurrentState('Login')} className='login-link'>Login here</p>
                }
            </div>
            <button type='submit' className='login-button'>{currentState === 'Login' ? 'Sign in' : 'Sign up'}</button>
        </form>
    )
}

export default Login
