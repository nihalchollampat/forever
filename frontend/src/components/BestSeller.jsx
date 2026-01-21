import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import './BestSeller.css'

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([])
    const { products } = useContext(ShopContext)

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
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
