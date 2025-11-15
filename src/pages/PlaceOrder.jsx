import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'

import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const  navigate  = useNavigate();

    return (
        <div className='place-order-container'>

            <div className='delivery-form'>

                <div className='delivery-title'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='input-row'>
                    <input className='input-field' type="text" placeholder='First name' />
                    <input className='input-field' type="text" placeholder='Last name' />
                </div>
                <input className='input-field' type="email" placeholder='Email address' />
                <input className='input-field' type="text" placeholder='Street' />
                <div className='input-row'>
                    <input className='input-field' type="text" placeholder='City' />
                    <input className='input-field' type="text" placeholder='State' />
                </div>
                <div className='input-row'>
                    <input className='input-field' type="number" placeholder='Zipcode' />
                    <input className='input-field' type="text" placeholder='Country' />
                </div>
                <input className='input-field' type="text" placeholder='Phone' />
            </div>

            <div className='payment-section'>

                <div className='delivery-title-margin'>
                    <CartTotal />
                </div>

                <div className='payment-title'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='payment-methods'>
                        <div onClick={() => setMethod('stripe')} className='payment-method'>
                            <p className={`payment-indicator ${method === 'stripe' ? 'selected' : ''}`}></p>
                            <img className='payment-logo' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='payment-method'>
                            <p className={`payment-indicator ${method === 'razorpay' ? 'selected' : ''}`}></p>
                            <img className='payment-logo' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='payment-method'>
                            <p className={`payment-indicator ${method === 'cod' ? 'selected' : ''}`}></p>
                            <p className='payment-text'>CASH ON DELIVERY</p>
                        </div>
                        <div onClick={() => setMethod('paytm')} className='payment-method'>
                            <p className={`payment-indicator ${method === 'paytm' ? 'selected' : ''}`}></p>
                            <img className='payment-logo' src={assets.paytm_logo} alt="Paytm" />
                        </div>
                    </div>
                    <div className='place-order-button'>
                        <button onClick={() => navigate('/orders')} className='place-order-btn'>PLACE ORDER</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default PlaceOrder
