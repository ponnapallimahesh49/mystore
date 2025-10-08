// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productcontext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { searchQuery, setSearchQuery, cart, wishlist } =
    useContext(ProductContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
           <Link to="/" className="flex items-center gap-2">
            <img
              src="/websitelogo.png"
              alt="MyStore Logo"
              className="w-20 h- object-contain" 
            />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <input
              type="text"
              placeholder="Search products or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-96 rounded text-black"
            />
            <div className="flex gap-6 text-lg">
              <Link to="/wishlist">❤️ Wishlist ({wishlist.length})</Link>
              <Link to="/cart">🛒 Cart ({cart.length})</Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 pt-4 pb-2 space-y-2">
          <input
            type="text"
            placeholder="Search products or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full rounded text-black"
          />
          <Link to="/wishlist" className="block text-lg hover:text-gray-200">
            ❤️ Wishlist ({wishlist.length})
          </Link>
          <Link to="/cart" className="block text-lg hover:text-gray-200">
            🛒 Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>
  );
}
