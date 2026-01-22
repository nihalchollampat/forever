import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Footer from './components/Footer'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './watermark.css';
import ShopContextProvider, { ShopContext } from './context/ShopContext';
const encryptedWatermark = "TWFkZSBCeSBOSUhBTCBD"; // base64 encoded for the watermark i added

function decryptBase64(encoded) {
  try {
    return atob(encoded);
  } catch (e) {
    return "";
  }
}

const AppContent = () => {
  const watermarkText = decryptBase64(encryptedWatermark);
  const { productsLoading } = useContext(ShopContext);

  // Show loading spinner while products are being fetched
  if (productsLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#666', fontSize: '16px' }}>Loading Forever...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-screen-xl mx-auto'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
      <div className="fixed-watermark">{watermarkText}</div>
    </div>
  );
};

const App = () => {
  return (
    <ShopContextProvider>
      <AppContent />
    </ShopContextProvider>
  )
}

export default App
