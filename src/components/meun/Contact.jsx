import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const inputClass =
  "h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact us - Foodie | Get in touch";
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.message) return;

    const toastId = "contact-form";
    if (!toast.isActive(toastId)) {
      toast.success("Message sent. We'll get back to you shortly.", {
        toastId,
        position: "top-right",
        autoClose: 3000,
      });
    }

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Talk to us.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Questions about an order, a large booking, or partnering with us? We
            reply within one working day.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <div className="rounded-3xl bg-ink p-7 text-cream sm:p-8">
            <h2 className="font-display text-xl font-bold">Get in touch</h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">
              Prefer to call? Our kitchen line is open every day until 22:00.
            </p>

            <dl className="mt-7 space-y-5 text-sm">
              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand">
                  <FiMapPin />
                </span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-cream/50">
                    Address
                  </dt>
                  <dd className="mt-0.5">123 Foodie Street, Phnom Penh</dd>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand">
                  <FiPhone />
                </span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-cream/50">
                    Phone
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href="tel:+85512345678"
                      className="transition-colors hover:text-brand-tint"
                    >
                      +855 12 345 678
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand">
                  <FiMail />
                </span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-cream/50">
                    Email
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href="mailto:contact@foodie.com"
                      className="transition-colors hover:text-brand-tint"
                    >
                      contact@foodie.com
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand">
                  <FiClock />
                </span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-cream/50">
                    Opening hours
                  </dt>
                  <dd className="mt-0.5">Every day · 10:00 – 22:00</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"
          >
            <h2 className="font-display text-xl font-bold text-ink">
              Send a message
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Tell us what you need and we'll take it from there.
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-semibold text-ink"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Sokha"
                    value={form.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-semibold text-ink"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Chan"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+855 12 345 678"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="What can we help with?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-line bg-white p-3.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep"
              >
                <FiSend /> Send message
              </button>
            </div>
          </form>
        </div>

        {/* Map */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-card">
          <iframe
            title="Foodie location in Phnom Penh"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.681376045193!2d104.8990464746716!3d11.556373988644962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109512e4d528a89%3A0x3c41b90597d8a986!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1697350000000!5m2!1sen!2skh"
            width="100%"
            height="320"
            className="rounded-2xl"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
