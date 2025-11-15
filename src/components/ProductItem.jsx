import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import './ProductItem.css'

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)} className='product-item'>

      <div className='image-container'>
        <img src={image[0]} alt="" />
      </div>

      <p>{name}</p>
      <p>{currency}{price}</p>

    </Link>
  )
}

export default ProductItem
