// src/pages/Wishlist.jsx
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productcontext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, removeFromCart, cart } =
    useContext(ProductContext);

  // ✅ Sync cart with localStorage so it stays after refresh
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setLocalCart(cart);
  }, [cart]);

  const isInCart = (id) => localCart.some((item) => item.id === id);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">❤️ Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {wishlist.map((p) => (
            <div key={p.id} className="w-72 bg-white p-4 rounded shadow">
              <img
                src={p.images[0]}
                alt={p.title}
                className="h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-700 font-medium">${p.price}</p>

              <div className="flex gap-3 mt-4">
                {/* ✅ Toggle add/remove from cart */}
                <button
                  onClick={() =>
                    isInCart(p.id) ? removeFromCart(p.id) : addToCart(p)
                  }
                  className={`px-3 py-1 rounded text-white ${
                    isInCart(p.id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isInCart(p.id) ? "Remove from Cart" : "Add to Cart"}
                </button>

                {/* ✅ Remove from wishlist */}
                <button
                  onClick={() => removeFromWishlist(p.id)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Remove Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
