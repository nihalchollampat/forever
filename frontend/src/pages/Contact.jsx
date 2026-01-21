import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import './Contact.css'

const Contact = () => {
  return (
    <div>

      <div className='contact-title'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='contact-content'>
        <img className='contact-image' src={assets.contact_img} alt="" />
        <div className='contact-info'>
          <p className='contact-store-title'>Our Store</p>
          <p className='contact-address'>Your Space Boys Hostel <br /> Lohegaon,Pune,Maharashtra</p>
          <p className='contact-phone'>Tel:+91 6282500918<br /> Email: nihal17122004@gmail.com</p>
          <p className='contact-careers-title'>Careers at Forever</p>
          <p className='contact-careers-text'>Learn more about our teams and job openings.</p>
          <button className='contact-button'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default Contact
