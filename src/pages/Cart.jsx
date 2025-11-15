// src/pages/Cart.js
import React, { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { products, currency, cartData, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-title'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='cart-items'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='cart-item'>
              <div className='cart-item-content'>
                <img className='cart-item-image' src={productData.image[0]} alt="" />
                <div className='cart-item-details'>
                  <p className='cart-item-name'>{productData.name}</p>
                  <div className='cart-item-price-size'>
                    <p>{currency}{productData.price}</p>
                    <p className='cart-item-size'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className='cart-item-quantity'
                type='number'
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='cart-item-remove'
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <div className='cart-total-section'>
        <div className='cart-total-container'>
          <CartTotal />
          <div className='cart-checkout-button'>
            <button onClick={() => navigate('/place-order')} className='cart-checkout-btn'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
