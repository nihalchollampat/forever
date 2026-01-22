import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import './BestSeller.css'

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([])
    const { products, productsLoading } = useContext(ShopContext)

    useEffect(() => {

        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))

    }, [products])

    return (
        <div className='best-seller'>
            <div className='best-seller-title'>
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className='best-seller-description'>Forever Ecommerce Website for all your clothing needs.</p>
            </div>

            <div className='best-seller-grid'>
                {
                    productsLoading ? (
                        <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>Loading bestsellers...</p>
                    ) : bestSeller.length > 0 ? (
                        bestSeller.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>No bestsellers available</p>
                    )
                }
            </div>
        </div>
    )
}

export default BestSeller
