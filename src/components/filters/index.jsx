import { useContext } from "react";
import {
  ProductContext,
  priceOptions,
  ratingOptions,
} from "../../context/productcontext";

export default function Filters() {
  const { filters, setFilters } = useContext(ProductContext);

  const handlePriceChange = (option) => {
    setFilters((prev) => {
      const exists = prev.price.some(
        (range) => range.min === option.min && range.max === option.max
      );
      return {
        ...prev,
        price: exists
          ? prev.price.filter(
              (range) => !(range.min === option.min && range.max === option.max)
            )
          : [...prev.price, option],
      };
    });
  };

  const handleRatingChange = (option) => {
    setFilters((prev) => {
      const exists = prev.rating.some(
        (range) => range.min === option.min && range.max === option.max
      );
      return {
        ...prev,
        rating: exists
          ? prev.rating.filter(
              (range) => !(range.min === option.min && range.max === option.max)
            )
          : [...prev.rating, option],
      };
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow sticky top-4">
      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-lg">Price</h3>
        <div className="flex flex-col gap-2">
          {priceOptions.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={() => handlePriceChange(opt)}
                checked={filters.price.some(
                  (range) => range.min === opt.min && range.max === opt.max
                )}
                className="accent-blue-600"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-bold mb-2 text-lg">Rating</h3>
        <div className="flex flex-col gap-2">
          {ratingOptions.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                onChange={() => handleRatingChange(opt)}
                checked={filters.rating.some(
                  (range) => range.min === opt.min && range.max === opt.max
                )}
                className="accent-blue-600"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
