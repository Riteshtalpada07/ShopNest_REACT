import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-sky-400">
              ShopNest
            </h2>

            <p className="mt-4 text-slate-300 text-sm leading-6">
              Your one-stop destination for electronics, fashion,
              groceries, and daily essentials at the best prices.
            </p>

            <div className="flex gap-4 mt-5 text-2xl">
              <i className="ri-facebook-circle-fill hover:text-sky-400 cursor-pointer transition-colors"></i>

              <i className="ri-instagram-fill hover:text-sky-400 cursor-pointer transition-colors"></i>

              <i className="ri-twitter-x-fill hover:text-sky-400 cursor-pointer transition-colors"></i>

              <i className="ri-linkedin-box-fill hover:text-sky-400 cursor-pointer transition-colors"></i>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>
                <a
                  href="/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Customer Service
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li className="hover:text-sky-400 cursor-pointer transition-colors">
                Help Center
              </li>

              <li className="hover:text-sky-400 cursor-pointer transition-colors">
                Return Policy
              </li>

              <li className="hover:text-sky-400 cursor-pointer transition-colors">
                Shipping Information
              </li>

              <li className="hover:text-sky-400 cursor-pointer transition-colors">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <i className="ri-mail-line text-xl text-sky-400"></i>
                <span>talpadaritesh776@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <i className="ri-phone-line text-xl text-sky-400"></i>
                <span>+91 8320796086</span>
              </div>

              <div className="flex items-center gap-3">
                <i className="ri-map-pin-line text-xl text-sky-400"></i>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} ShopNest. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="/"
              className="hover:text-sky-400 transition-colors"
            >
              Terms
            </a>

            <a
              href="/"
              className="hover:text-sky-400 transition-colors"
            >
              Privacy
            </a>

            <a
              href="/"
              className="hover:text-sky-400 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;