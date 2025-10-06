// src/pages/Home.jsx
import { useContext, useState } from "react";
import { ProductContext } from "../context/productcontext";
import Filters from "../components/filters";
import ProductCard from "../components/productcard";
import Footer from "../components/footer";
export default function Home() {
  const { products, searchQuery, filters, loading } =
    useContext(ProductContext);
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryKeys = Object.keys(products); // all category keys

  const filterProducts = (items) =>
    items.filter((p) => {
      const matchesSearch =
        (p.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (p.brand?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      const matchesPrice =
        filters.price.length === 0 ||
        filters.price.some(
          (range) => p.price >= range.min && p.price <= range.max
        );

      const matchesRating =
        filters.rating.length === 0 ||
        filters.rating.some(
          (range) => p.rating >= range.min && p.rating <= range.max
        );

      return matchesSearch && matchesPrice && matchesRating;
    });

  // Decide which categories to show
  const displayCategories =
    activeCategory === "all" ? categoryKeys : [activeCategory];

  if (loading)
    return <p className="text-center mt-10 text-xl">Loading products...</p>;

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Main Layout: Sidebar + Products */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <Filters />
        </div>

        {/* Products Area */}
        <div className="w-full md:w-3/4">
          {/* Category Tabs */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {["all", ...categoryKeys].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {cat
                  .replace("-", " ")
                  .replace("womens", "Women")
                  .replace("mens", "Men")}
              </button>
            ))}
          </div>

          {/* Products */}
          {displayCategories.map((category) => {
            const categoryProducts = products[category] || [];
            const filtered = filterProducts(categoryProducts);

            if (filtered.length === 0) return null;

            return (
              <div key={category} className="mb-10">
                {activeCategory === "all" && (
                  <h2 className="text-2xl font-bold mb-4 capitalize">
                    {category.replace("-", " ")}
                  </h2>
                )}
                <div className="flex flex-wrap gap-6">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
