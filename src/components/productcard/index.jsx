import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/productcontext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useContext(ProductContext);

  const navigate = useNavigate();

  // ✅ Save cart & wishlist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const inCart = cart.some((p) => p.id === product.id);
  const inWishlist = wishlist.some((p) => p.id === product.id);

  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.id);
      alert("🛒 Removed from cart!");
    } else {
      addToCart(product);
      alert("✅ Added to cart!");
    }
  };

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      alert("💔 Removed from wishlist!");
    } else {
      addToWishlist(product);
      alert("❤️ Added to wishlist!");
    }
  };

  const handleBuyNow = () => {
    alert("Go to Purchase page!");
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className="w-72 bg-white p-4 rounded shadow flex flex-col justify-between">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600">{product.brand}</p>
      <p className="font-bold">${product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>

      {/* ✅ Cart & Wishlist buttons side-by-side */}
      <div className="flex gap-2 justify-between mt-4">
        <button
          onClick={handleCartClick}
          className={`flex-1 px-3 py-1 rounded text-white ${
            inCart
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>

        <button
          onClick={handleWishlistClick}
          className={`flex-1 px-3 py-1 rounded text-white ${
            inWishlist
              ? "bg-gray-500 hover:bg-gray-700"
              : "bg-pink-500 hover:bg-pink-700"
          }`}
        >
          {inWishlist ? "Remove Wishlist" : "Wishlist"}
        </button>
      </div>

      {/* ✅ Buy button goes to bottom */}
      <button
        onClick={handleBuyNow}
        className="mt-4 w-full px-3 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold"
      >
        Buy Now
      </button>
    </div>
  );
}
