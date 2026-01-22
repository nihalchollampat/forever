import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import './LatestCollection.css'

const LatestCollection = () => {

    const [latestProducts, setLatestProducts] = useState([])
    const { products, productsLoading } = useContext(ShopContext)

    useEffect(() => {

        if (products.length > 0) {
            setLatestProducts(products.slice(0, 10))
        }

    }, [products])

    return (
        <div className='latest-collection'>
            <div className='latest-collection-title'>
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className='latest-collection-description'>Forever Ecommerce Website for all your clothing needs.</p>
            </div>

            {/* Rendering Products */}
            <div className='latest-collection-grid'>
                {
                    productsLoading ? (
                        <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>Loading products...</p>
                    ) : latestProducts.length > 0 ? (
                        latestProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>No products available</p>
                    )
                }
            </div>

        </div>
    )
}

export default LatestCollection
