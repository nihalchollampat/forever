import React from 'react'
import { assets } from '../assets/assets'
import {  useNavigate } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>

        <div className='footer-logo'>
          <img src={assets.logo} alt="" />
          <p className='footer-description'>Our shopping cart website offers a seamless and user-friendly experience for online shoppers. With an intuitive interface,add items to their cart, and manage their purchases with ease. The website provides real-time updates on stock availability, offers multiple payment options, and includes features like product filtering, wishlist, and secure checkout.</p>
        </div>

        <div className='footer-contact'>
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+91 6282500918</li>
            <li>nihalchollampat@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className='footer-bottom'>
        <hr />
        <p></p>
      </div>

    </div>
  )
}

export default Footer
