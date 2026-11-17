import React, { useEffect } from "react";
import Chef1 from "../../assets/cheffood.jpg";
import Chef2 from "../../assets/viste.jpg";
import { FiBox, FiFeather, FiShoppingBag, FiTruck } from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: FiShoppingBag,
    title: "Place your order",
    description:
      "Browse the menu and order in a few clicks — no app download, no account juggling.",
  },
  {
    number: "02",
    icon: FiFeather,
    title: "Harvest from the farm",
    description:
      "Our farmers hand-pick the ripest produce fresh from the field that morning.",
  },
  {
    number: "03",
    icon: FiBox,
    title: "Eco packaging",
    description:
      "Compostable packaging keeps the food fresh and keeps plastic out of the city.",
  },
  {
    number: "04",
    icon: FiTruck,
    title: "Quick delivery",
    description:
      "Your order leaves the kitchen hot and reaches your door in about 35 minutes.",
  },
];

const AboutUs = () => {
  useEffect(() => {
    document.title = "About us - Foodie | Fresh food delivery";
  }, []);

  return (
    <section className="bg-cream px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
            Our story
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Good food starts with good farms.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Foodie brings the freshest organic produce from local partner farms
            straight to your table — healthy living, sustainable farming and
            fair trade, one dish at a time.
          </p>
        </div>

        {/* Story */}
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-brand-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Fresh · local · organic
            </p>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base">
              <p>
                At <span className="font-bold text-ink">Foodie</span>, we work
                only with farms that follow natural, chemical-free practices.
                That means produce you can taste the season in, and meat that
                was raised properly.
              </p>
              <p>
                Our mission is simple:{" "}
                <span className="font-semibold text-ink">
                  healthy living, sustainable farming, and fair trade.
                </span>{" "}
                Every order supports the people who grow the food.
              </p>
              <p>
                We deliver pure, wholesome food straight to your door,
                guaranteed fresh.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-ink-muted">Partner farms</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums text-ink">
                  12
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Dishes daily</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums text-ink">
                  20+
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Avg. delivery</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums text-ink">
                  35m
                </dd>
              </div>
            </dl>
          </div>

          <img
            src={Chef1}
            alt="Chef preparing food in the kitchen"
            className="h-64 w-full rounded-3xl object-cover shadow-card sm:h-80 lg:h-full"
          />
        </div>

        {/* Process */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <img
            src={Chef2}
            alt="Chef plating a dish"
            className="h-64 w-full rounded-3xl object-cover shadow-card sm:h-80 lg:h-full"
          />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              From farm to your table
            </h2>

            <ol className="mt-8 divide-y divide-line">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-5 py-6 first:pt-0">
                  <span className="pt-0.5 font-display text-sm font-extrabold tabular-nums text-brand-deep">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-ink">
                      <step.icon
                        className="shrink-0 text-brand-deep"
                        aria-hidden="true"
                      />
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
