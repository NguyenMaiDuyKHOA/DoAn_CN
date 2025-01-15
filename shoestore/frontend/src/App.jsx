import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './pages/Review'
import VerifyMomo from './pages/VerifyMomo'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[264px]'>
        <ToastContainer />
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
          <Route path='/review' element={<Review />} />
          <Route path='/verify' element={<VerifyMomo />} />
        </Routes>

      </div>
      <Footer />
    </div>
  )
}

export default App