import React from "react";
import { FiAward, FiCheckCircle, FiTruck, FiUsers } from "react-icons/fi";

const features = [
  {
    icon: FiCheckCircle,
    title: "100% organic",
    desc: "Produce grown without harmful chemicals or pesticides.",
  },
  {
    icon: FiTruck,
    title: "Fast delivery",
    desc: "Picked and cooked the same day, at your door within hours.",
  },
  {
    icon: FiUsers,
    title: "Farmer support",
    desc: "Fair trade prices and sustainable practices for local farms.",
  },
  {
    icon: FiAward,
    title: "Quality assured",
    desc: "Every dish is checked for freshness before it leaves the pass.",
  },
];

const HeroState = () => {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
            Why Foodie
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Cooked properly. Delivered properly.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            One standard from the farm to your table — no shortcuts, no
            mystery ingredients.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card transition-colors duration-200 hover:border-brand/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand-deep">
                <feature.icon className="text-xl" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroState;
