import React from 'react'
import { assets } from '../assets/assets'
import './Hero.css'

const Hero = () => {
    return (
        <div className='hero'>

            {/* Hero Left Side */}
            <div className='hero-left'>
                <div className='hero-content'>
                    <div className='hero-subtitle'>
                        <p className='hero-line'></p>
                        <p className='hero-subtitle-text'>OUR BESTSELLERS</p>
                    </div>

                    <h1 className='hero-title'>Latest Arrivals</h1>

                    <div className='hero-shop-now'>
                        <p className='hero-shop-text'>SHOP NOW</p>
                        <p className='hero-shop-line'></p>
                    </div>
                </div>
            </div>

            {/* Hero Right Side */}
            <img className='hero-image' src={assets.hero_img} alt="" />
        </div>
    )
}

export default Hero
