import React from 'react'
import './NewsletterBox.css'

const NewsletterBox = () => {
  return (
    <div className='newsletter-box'>

      <p className='newsletter-title'>Subscribe now & get 20% off</p>
      <p className='newsletter-description'>Forever Ecommerce Website for all your clothing needs. </p>

      <form className='newsletter-form'>
        <input className='newsletter-input' type="text" placeholder='Enter your email id' required />
        <button className='newsletter-button' type='submit'>SUBSCRIBE</button>
      </form>

    </div>
  )
}

export default NewsletterBox
