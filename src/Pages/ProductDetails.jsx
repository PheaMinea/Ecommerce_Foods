import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../components/ShopContext";
import { useParams, Link } from "react-router-dom";
import { ProductData } from "../data";
import { FaStar } from "react-icons/fa";
import {
  FiArrowLeft,
  FiCheck,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const product = ProductData.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product ? product.image : "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem("foodie_current_user");
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Foodie`;
    } else {
      document.title = "Product Not Found - Foodie";
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream px-4 pt-20">
        <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 text-center shadow-card">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-2xl text-ink-muted">
            <FiShoppingBag />
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">
            Dish not found
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            This dish doesn't exist or has been taken off the menu.
          </p>
          <Link
            to="/datapro"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-strong px-5 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
          >
            <FiArrowLeft /> Back to the menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/datapro"
          className="group inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
        >
          <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to the menu
        </Link>

        <div className="mt-6 grid gap-8 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          {/* Image */}
          <div className="flex flex-col">
            <div className="grid h-[20rem] place-items-center rounded-2xl bg-cream p-6 sm:h-[24rem]">
              <img
                src={mainImage}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {[product.image, product.image1, product.image2, product.image3].map(
                (img, index) =>
                  img && (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setMainImage(img)}
                      aria-label={`View ${product.name} image ${index + 1}`}
                      className={`h-20 w-16 overflow-hidden rounded-xl border-2 bg-cream p-1.5 transition-colors ${
                        mainImage === img
                          ? "border-brand"
                          : "border-line hover:border-brand/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </button>
                  )
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-flex rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
              {product.category}
            </span>

            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-brand" />
                ))}
              </span>
              <span className="font-semibold text-ink">4.5</span>
              <span className="text-ink-muted">· 128 reviews</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              {product.description || product.discription}
            </p>

            <div className="mt-6 rounded-2xl bg-cream p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold tabular-nums text-ink">
                  ${(product.price * 0.9).toFixed(2)}
                </span>
                <span className="text-sm tabular-nums text-ink-muted line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-bold text-brand-deep">
                  10% off
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                You save ${(product.price * 0.1).toFixed(2)} on this dish.
              </p>
            </div>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep"
              >
                <FiShoppingBag className="text-lg" /> Add to cart · $
                {(product.price * 0.9).toFixed(2)}
              </button>
            ) : (
              <Link
                to="/user"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep"
              >
                Log in to order
              </Link>
            )}

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line p-4">
                <dt className="flex items-center gap-2 text-sm font-bold text-ink">
                  <FiCheck className="text-brand-deep" /> In stock
                </dt>
                <dd className="mt-1 text-xs text-ink-muted">
                  Made when you order
                </dd>
              </div>
              <div className="rounded-xl border border-line p-4">
                <dt className="flex items-center gap-2 text-sm font-bold text-ink">
                  <FiTruck className="text-brand-deep" /> Free delivery
                </dt>
                <dd className="mt-1 text-xs text-ink-muted">
                  On orders over $25
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
