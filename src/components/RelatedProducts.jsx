import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import './RelatedProducts.css'

const RelatedProducts = ({ category, subCategory }) => {

    const [related, setRelated] = useState([])

    const { products } = useContext(ShopContext)

    useEffect(() => {

        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter(item => category === item.category);
            productsCopy = productsCopy.filter(item => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products])

    return (
        <div className='related-products'>
            <div className='related-title'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>

            <div className='related-grid'>
                {
                    related.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
