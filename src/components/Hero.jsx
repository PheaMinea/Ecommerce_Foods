import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiCoffee,
  FiHome,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import hero_img from "../assets/Chef.png";
import dish_img from "../assets/Food1.png";

const steps = [
  { icon: FiShoppingBag, title: "You order", detail: "Pick a dish, 2 minutes" },
  { icon: FiCoffee, title: "Kitchen fires", detail: "Cooked to order, 8 minutes" },
  { icon: FiTruck, title: "Rider sets off", detail: "Straight to you, 15 minutes" },
  { icon: FiHome, title: "At your door", detail: "Hot and ready, about 35 min" },
];

const Hero = () => {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-20 lg:pt-36">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            Now delivering in Phnom Penh
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] text-ink sm:text-6xl lg:text-[4rem]">
            Real food,
            <br />
            delivered{" "}
            <span className="relative whitespace-nowrap text-brand-deep">
              fast
              <svg
                aria-hidden="true"
                viewBox="0 0 120 12"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-brand/50"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9c28-6 62-8 116-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            From wood-fired pizza to slow-cooked curry — order from the city's
            best kitchens and get it hot at your door in about 35 minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/datapro"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand-strong px-6 text-sm font-bold text-white shadow-card transition-colors hover:bg-brand-deep"
            >
              Browse the menu
              <FiArrowRight className="text-lg transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-bold text-ink transition-colors hover:border-ink/20"
            >
              How it works
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-ink">4.9</span>
              <span className="text-brand">★★★★★</span>
              <span>from 2,300+ orders</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock className="text-brand-deep" /> 35 min average
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-x-3 bottom-10 top-8 rounded-[3rem] bg-brand-tint/70"
          />
          <div
            aria-hidden="true"
            className="absolute -left-3 top-10 hidden h-24 w-24 rounded-full border border-brand/40 sm:block"
          />

          <img
            src={hero_img}
            alt="Chef plating a freshly cooked dish"
            className="relative mx-auto w-[78%] max-w-[21rem] drop-shadow-[0_32px_36px_rgba(41,37,36,0.18)]"
          />

          <div className="absolute right-0 top-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft shadow-card">
            <FiClock className="text-brand" /> 35 min avg
          </div>

          <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-5 shadow-lift">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-cream">
              <img src={dish_img} alt="" className="h-10 w-10 object-contain" />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-deep">
                Chef's pick
              </span>
              <span className="block text-sm font-semibold text-ink">
                Beef Steak · $5.00
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Delivery rail */}
      <div className="mt-4 border-y border-line bg-white">
        <ol className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`border-line px-5 py-6 sm:px-8 ${
                index === 1
                  ? "border-l"
                  : index === 2
                  ? "border-t md:border-l md:border-t-0"
                  : index === 3
                  ? "border-l border-t md:border-t-0"
                  : ""
              }`}
            >
              <step.icon className="text-xl text-brand-deep" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold text-ink">{step.title}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Hero;
