import { useContext } from "react";
import { ProductContext } from "../context/productcontext";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import Footer from "../components/footer";

export default function Cart() {
  const { cart, removeFromCart } = useContext(ProductContext); // ✅ inside component
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">🛒 Your Cart is Empty</h2>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow p-4 rounded mb-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", { state: { product: item } })
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </>
  );
}
