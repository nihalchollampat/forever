import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import './Collection.css'

const Collection = () => {

  const { products, productsLoading, search, showSearch } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(a => a !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(a => a !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }

  const applyFilter = () => {

    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = async () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  // Initialize filter when products load
  useEffect(() => {
    if (products.length > 0) {
      applyFilter()
    }
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  useEffect(() => {
    sortProduct();
  }, [sortType])


  return (
    <div className='collection-container'>

      {/* Filter Options */}
      <div className='filter-section'>
        <p onClick={() => setShowFilter(!showFilter)} className='filter-toggle'>FILTERS<img className={`filter-dropdown ${showFilter ? 'rotate' : ''}`} src={assets.dropdown_icon} alt="" /></p>

        {/* Category Filter */}
        <div className={`filter-category ${showFilter ? 'show' : ''}`}>
          <p className='filter-title'>CATEGORIES</p>
          <div className='filter-options'>
            <p className='filter-option'><input className='w-3' value={"Men"} onChange={toggleCategory} type="checkbox" /> Men </p>
            <p className='filter-option'><input className='w-3' value={"Women"} onChange={toggleCategory} type="checkbox" /> Women </p>
            <p className='filter-option'><input className='w-3' value={"Kids"} onChange={toggleCategory} type="checkbox" /> Kids </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className={`filter-subcategory ${showFilter ? 'show' : ''}`}>
          <p className='filter-title'>TYPE</p>
          <div className='filter-options'>
            <p className='filter-option'><input className='w-3' value={"Topwear"} onChange={toggleSubCategory} type="checkbox" /> Topwear </p>
            <p className='filter-option'><input className='w-3' value={"Bottomwear"} onChange={toggleSubCategory} type="checkbox" /> Bottomwear </p>
            <p className='filter-option'><input className='w-3' value={"Winterwear"} onChange={toggleSubCategory} type="checkbox" /> Winterwear </p>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className='right-section'>

        <div className='collection-header'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='sort-select' name="" id="">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='product-grid'>
          {
            productsLoading ? (
              <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>Loading products...</p>
            ) : filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            ) : (
              <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>No products found</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
