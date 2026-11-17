import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/datapro", label: "Menu" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
];

const services = ["Food delivery", "Catering", "Mobile app", "Become a partner"];

const socials = [
  { icon: FiFacebook, label: "Facebook" },
  { icon: FiInstagram, label: "Instagram" },
  { icon: FiTwitter, label: "Twitter" },
  { icon: FiYoutube, label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="font-display text-2xl font-extrabold tracking-tight text-cream"
          >
            Foodie<span className="text-brand">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Taste the happiness in every bite. From everyday dishes to gourmet
            delights — food that speaks your language.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream/80 transition-colors hover:border-brand hover:bg-brand hover:text-ink"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-cream">
            Quick links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="transition-colors hover:text-brand-tint"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-cream">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-cream">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 shrink-0 text-brand" />
              Phnom Penh, Cambodia
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 shrink-0 text-brand" />
              +855 12 345 678
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 shrink-0 text-brand" />
              info@foodie.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Foodie. All rights reserved.</p>
          <p>
            Made for hungry people in{" "}
            <span className="text-brand-tint">Phnom Penh</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
