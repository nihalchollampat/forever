import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import './SearchBar.css'

const SearchBar = () => {

  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  useEffect(() => {

    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true)
    } else {
      setVisible(false)
    }

  }, [location])

  return showSearch && visible ? (
    <div className='search-bar'>
      <div className='search-input-container'>
        <input className='search-input' onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search' />
        <img className='search-icon' src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className='cross-icon' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
