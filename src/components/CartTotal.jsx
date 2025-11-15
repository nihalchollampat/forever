





import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import './CartTotal.css'

const CartTotal = () => {

    const { currency,delivery_fee,getCartAmount } = useContext(ShopContext);

    return (
        <div className='cart-total'>
            <div className='cart-total-title'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='cart-total-details'>
                <div className='cart-total-row'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />
                <div className='cart-total-row'>
                    <p>Shipping Free</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className='cart-total-row'>
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
