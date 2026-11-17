import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Hero from '../components/Hero'
import HeroState from '../components/HeroState'
import ProductList from '../components/Productlist'

const Homepage = () => {
  useEffect(() => {
    document.title = 'Foodie — Real food, delivered fast';
  }, []);

  return (
    <div>
      <Hero />
      <HeroState />
      <ProductList />

      {/* Closing call to action */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 sm:p-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
              Hungry now? Your order is three taps away.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">
              Browse the full menu, add what you like, and we'll take it from
              there. Free delivery on orders over $25.
            </p>
          </div>
          <Link
            to="/datapro"
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-colors hover:bg-brand-tint"
          >
            Order now
            <FiArrowRight className="text-lg transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Homepage
