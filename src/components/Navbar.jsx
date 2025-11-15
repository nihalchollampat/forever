import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import './Navbar.css'

const Navbar = () => {

    const [visible, setVisble] = useState(false)

    const { setShowSearch, navigate, getCartCount, user, signOut } = useContext(ShopContext);

    return (
        <div className='navbar' >

            <Link to='/'><img className='navbar-logo' src={assets.logo} alt="" /></Link>

            <ul className='navbar-menu'>
                <NavLink to="/" className='navbar-link'>
                    <p>HOME</p>
                    <hr />
                </NavLink>
                <NavLink to='/collection' className='navbar-link'>
                    <p>COLLECTION</p>
                    <hr />
                </NavLink>
                <NavLink to='/about' className='navbar-link'>
                    <p>ABOUT</p>
                    <hr />
                </NavLink>
                <NavLink to='/contact' className='navbar-link'>
                    <p>CONTACT</p>
                    <hr />
                </NavLink>
            </ul>

            <div className='navbar-actions'>
                <img onClick={() => { setShowSearch(true); navigate('/collection') }} className='navbar-search' src={assets.search_icon} alt="" />
                <div className='navbar-profile'>
                    <img onClick={() => { user ? null : navigate('/login') }} className='navbar-profile-icon' src={assets.profile_icon} alt="" />

                    {/* Dropdown Menu */}
                    {user && <div className='navbar-dropdown'>
                        <p onClick={() => { }} className='navbar-dropdown-item'>My Profile</p>
                        <p onClick={() => navigate('/orders')} className='navbar-dropdown-item'>Orders</p>
                        <p onClick={() => signOut()} className='navbar-dropdown-item'>Logout</p>
                    </div>}
                </div>
                <Link to='/cart' className='navbar-cart'>
                    <img className='navbar-cart-icon' src={assets.cart_icon} alt="" />
                    <p className='navbar-cart-count'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisble(true)} className='navbar-menu-icon' src={assets.menu_icon} alt="" />
            </div>

            {/* Sidebar Menu For Small Screens */}
            <div className={`navbar-sidebar ${visible ? 'open' : ''}`} >
                <div className='navbar-sidebar-content'>
                    <div onClick={() => setVisble(false)} className='navbar-sidebar-back'>
                        <img src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisble(false)} to="/" className='navbar-sidebar-link'>HOME</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/collection' className='navbar-sidebar-link'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/about' className='navbar-sidebar-link'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/contact' className='navbar-sidebar-link'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
