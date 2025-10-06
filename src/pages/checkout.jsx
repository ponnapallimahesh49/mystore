import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function Checkout() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  if (!product) return <p>No product selected</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-4 py-2 rounded mb-4"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} className="w-64 h-64" />
      <p className="mt-2 text-lg">Price: ${product.price}</p>

      <button
        onClick={() => {
          alert("✅ Item purchased successfully!");
          navigate("/");
        }}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Purchase
          </button>
          <Footer/>
    </div>
  );
}
