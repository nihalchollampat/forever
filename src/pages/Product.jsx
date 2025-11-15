import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import './Product.css';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [size, setSize] = useState("")
  const [image, setImage] = useState("")

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData()
  }, [productId])

  return productData ? (
    <div className='product-container'>

      <div className='product-row'>

        {/* -------- Product Images ---------- */}

        <div className='product-images'>
          <div className='image-thumbnails'>
            {productData.image.map((item, index) => (<img key={index} onClick={() => setImage(item)} className='thumbnail' src={item} alt="" />))}
          </div>
          <div className='main-image-container'>
            <img className='main-image' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}

        <div className='product-info'>

          <h1 className='product-name'>{productData.name}</h1>
          <div className='product-rating'>
            <img className='star-icon' src={assets.star_icon} alt="" />
            <img className='star-icon' src={assets.star_icon} alt="" />
            <img className='star-icon' src={assets.star_icon} alt="" />
            <img className='star-icon' src={assets.star_icon} alt="" />
            <img className='star-icon' src={assets.star_dull_icon} alt="" />
            <p className='rating-count'>(122)</p>
          </div>
          <p className='product-price'>{currency}{productData.price}</p>
          <p className='product-description'>{productData.description}</p>
          <div className='size-selector'>
            <p className='size-label'>Select Size</p>
            <div className='size-options'>
              {productData.sizes.map((item, index) => (<button key={index} onClick={() => setSize(item)} className={`size-button ${item === size ? "selected" : ""}`}>{item}</button>))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='add-to-cart-btn'>ADD TO CART</button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='product-policies'>
            <div className='policy-item'>
              <p className='policy-text'>100% Original product.</p>
            </div>
            <div className='policy-item'>
              <p className='policy-text'>Cash on delivery is available on this product.</p>
            </div>
            <div className='policy-item'>
              <p className='policy-text'>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>


      </div>

      <div className='product-details'>
        <div className='details-tabs'>
          <b className='details-tab'>Description</b>
          <p className='details-tab'>Reviews (122)</p>
        </div>
        <div className='details-content'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='product-opacity'></div>
}

export default Product