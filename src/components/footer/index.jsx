import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-10 p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-3 text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:underline">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:underline">
                Cart / Buy
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Add to Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* About / Info */}
        <div>
          <h3 className="font-bold mb-3 text-lg">About MyStore</h3>
          <p className="text-sm">
            MyStore is a responsive e-commerce app built with React,
            TailwindCSS, and Context API. Browse products, manage your cart and
            wishlist, and enjoy a seamless shopping experience.
          </p>
        </div>

        {/* Contact / Socials (Optional) */}
        <div>
          <h3 className="font-bold mb-3 text-lg">Contact</h3>
          <p className="text-sm">Email: ponnapallimahesh49@gmail.com</p>
          <p className="text-sm">Github: ponnapallimahesh49</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-6 text-sm text-gray-200">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
