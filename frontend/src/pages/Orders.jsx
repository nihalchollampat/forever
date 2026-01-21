// src/pages/Orders.js
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import './Orders.css';

const Orders = () => {
  const { products, currency, cartData } = useContext(ShopContext);

  return (
    <div className='orders-container'>
      <div className='orders-title'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='order-item'>
              <div className='order-details'>
                <img className='order-image' src={productData.image[0]} alt="" />
                <div className='order-info'>
                  <p className='order-name'>{productData.name}</p>
                  <div className='order-meta'>
                    <p className='order-price'>{currency}{productData.price}</p>
                    <p className='order-quantity'>Quantity: {item.quantity}</p>
                    <p className='order-size'>Size: {item.size}</p>
                  </div>
                  <p className='order-date'>Date: <span>25, May, 2024</span></p>
                </div>
              </div>
              <div className='order-status'>
                <div className='flex items-center gap-2'>
                  <p className='status-indicator'></p>
                  <p className='status-text'>Ready to ship</p>
                </div>
                <button className='track-button'>Track Order</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
