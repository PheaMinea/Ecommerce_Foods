import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus, FiStar } from "react-icons/fi";

const ProductList = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem("foodie_current_user");
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  return (
    <section className="border-t border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
              Popular this week
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Dishes people keep ordering
            </h2>
          </div>
          <Link
            to="/datapro"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-brand-deep"
          >
            View full menu
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => {
            const { id, image, name, description, price, category } = product;

            return (
              <article
                key={id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <Link
                  to={`/product-details/${id}`}
                  className="relative block bg-cream p-4"
                >
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="mx-auto h-44 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft ring-1 ring-line">
                    {category}
                  </span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-ink ring-1 ring-line">
                    <FiStar className="text-brand" aria-hidden="true" /> 4.5
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">
                    <Link
                      to={`/product-details/${id}`}
                      className="transition-colors hover:text-brand-deep"
                    >
                      {name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <p className="font-display text-xl font-bold tabular-nums text-ink">
                      ${Number(price).toFixed(2)}
                    </p>

                    {isLoggedIn ? (
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand-strong px-4 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                      >
                        <FiPlus className="text-base" aria-hidden="true" />
                        Add
                      </button>
                    ) : (
                      <Link
                        to="/user"
                        className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-bold text-ink transition-colors hover:border-ink/20"
                      >
                        Log in
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
