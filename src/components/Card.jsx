import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

const Card = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    quantity,
    subtotal,
    shippingFee,
    total,
  } = useContext(ShopContext);

  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    document.title = `Your cart (${quantity}) — Foodie`;
  }, [quantity]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    clearCart();
    setCheckoutMessage("Order placed. Your food is on its way!");
  };

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
              Your order
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Your cart
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              {quantity > 0
                ? `${quantity} ${quantity === 1 ? "item" : "items"} ready to go`
                : "Nothing here yet — let's fix that."}
            </p>
          </div>
          <Link
            to="/datapro"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-brand-deep"
          >
            Add more dishes
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {checkoutMessage && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand-tint/40 px-5 py-4 text-sm font-semibold text-ink">
            <FiCheckCircle className="shrink-0 text-lg text-brand-deep" />
            {checkoutMessage}
          </div>
        )}

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_21rem]">
          {/* Items */}
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {cart.length > 0 ? (
              <ul className="divide-y divide-line">
                {cart.map(({ id, name, image, price, amount }) => (
                  <li
                    key={id}
                    className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap sm:p-5"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="h-20 w-20 shrink-0 rounded-xl bg-cream object-contain p-2"
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-base font-bold leading-snug text-ink">
                        {name}
                      </h2>
                      <p className="mt-0.5 text-sm text-ink-muted">
                        ${Number(price).toFixed(2)} each
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(id)}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-ink-muted transition-colors hover:text-brand-deep"
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </div>

                    <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(id)}
                        aria-label={`Remove one ${name}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/25"
                      >
                        <FiMinus />
                      </button>
                      <span className="min-w-7 text-center text-sm font-bold tabular-nums text-ink">
                        {amount}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(id)}
                        aria-label={`Add one ${name}`}
                        className="grid h-9 w-9 place-items-center rounded-full bg-brand-strong text-white transition-colors hover:bg-brand-deep"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <p className="w-full text-right font-display text-lg font-bold tabular-nums text-ink sm:w-24">
                      ${(price * amount).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cream text-2xl text-ink-muted">
                  <FiShoppingBag />
                </span>
                <p className="mt-4 font-display text-xl font-bold text-ink">
                  Your cart is empty
                </p>
                <p className="mt-1 max-w-xs text-sm text-ink-muted">
                  Browse the menu and add something you're hungry for.
                </p>
                <Link
                  to="/datapro"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-strong px-5 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                >
                  Browse the menu <FiArrowRight />
                </Link>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="rounded-2xl border border-line bg-white p-6 shadow-card lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-bold text-ink">
              Order summary
            </h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Items</dt>
                <dd className="font-semibold tabular-nums text-ink">
                  {quantity}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-semibold tabular-nums text-ink">
                  ${(subtotal || 0).toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="font-semibold text-brand-deep">
                  {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free"}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-sm font-bold text-ink">Total</span>
              <span className="font-display text-2xl font-extrabold tabular-nums text-ink">
                ${(total || 0).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted"
            >
              Checkout
            </button>
            <p className="mt-3 text-center text-xs text-ink-muted">
              No hidden fees. Free delivery on orders over $25.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Card;
