import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import './Login.css'

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { signUp, signIn, loading } = useContext(ShopContext);

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (currentState === 'Sign Up') {
            await signUp(formData.email, formData.password, formData.name);
        } else {
            await signIn(formData.email, formData.password);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='login-form'>
            <div className='login-header'>
                <p className='login-title'>{currentState}</p>
                <hr className='login-hr' />
            </div>
            {currentState === 'Login' ? null : <input onChange={onChangeHandler} name='name' value={formData.name} className='login-input' type="text" placeholder='Name' required />}
            <input onChange={onChangeHandler} name='email' value={formData.email} className='login-input' type="email" placeholder='Email' required />
            <input onChange={onChangeHandler} name='password' value={formData.password} className='login-input' type="password" placeholder='Password' required />
            <div className='login-links'>
                <p className='login-link'>Forgot your password?</p>
                {
                    currentState === 'Login'
                        ? <p onClick={() => setCurrentState('Sign Up')} className='login-link'>Create account</p>
                        : <p onClick={() => setCurrentState('Login')} className='login-link'>Login here</p>
                }
            </div>
            <button type='submit' className='login-button' disabled={loading}>
                {loading ? 'Loading...' : (currentState === 'Login' ? 'Sign in' : 'Sign up')}
            </button>
        </form>
    )
}

export default Login
