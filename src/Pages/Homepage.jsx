import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import HeroState from '../components/HeroState'
import ProductList from '../components/Productlist'
import { ShopContext } from '../components/ShopContext'

const Homepage = () => {
  useEffect(() => {
    document.title = 'Foodie - Fresh Food Delivery | Home';
  }, []);

  return (
    <div>
      <Hero/>
      <HeroState/>
      <ProductList/>
      <ShopContext/>
    </div>
  )
}

export default Homepage
