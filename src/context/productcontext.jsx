import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

// Predefined filter options for checkboxes
export const priceOptions = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Above $1000", min: 1000, max: 5000 },
];

export const ratingOptions = [
  { label: "1 ⭐ & above", min: 1, max: 5 },
  { label: "2 ⭐ & above", min: 2, max: 5 },
  { label: "3 ⭐ & above", min: 3, max: 5 },
  { label: "4 ⭐ & above", min: 4, max: 5 },
  { label: "5 ⭐", min: 5, max: 5 },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({}); // store products per category
  const [searchQuery, setSearchQuery] = useState("");
 const [cart, setCart] = useState(() => {
   const storedCart = localStorage.getItem("cart");
   return storedCart ? JSON.parse(storedCart) : [];
 });

 const [wishlist, setWishlist] = useState(() => {
   const storedWishlist = localStorage.getItem("wishlist");
   return storedWishlist ? JSON.parse(storedWishlist) : [];
 });

  const [loading, setLoading] = useState(true);

  // Filters state will hold arrays of selected ranges
  const [filters, setFilters] = useState({
    price: [], // array of {min,max} objects
    rating: [], // array of {min,max} objects
  });

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    
    "groceries",
    "home-decoration",
    "mens-shirts",
    "mens-shoes",
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "mens-watches",
    "sunglasses",
    "motorcycle",
  ];

  // Fetch products by category
  const fetchCategory = async (category, limit = 12) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}`
      );
      const data = await res.json();
      return data.products || [];
    } catch (err) {
      console.error(`Error fetching ${category}:`, err);
      return [];
    }
  };

  // Fetch all categories in parallel
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const promises = categories.map(async (cat) => {
        const prods = await fetchCategory(cat, 12);
        return [cat, prods];
      });

      const results = await Promise.all(promises);
      const allProducts = Object.fromEntries(results);
      setProducts(allProducts);
      setLoading(false);
    };

    fetchAll();
  }, []);
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);
  // Cart functions
   const removeFromCart = (id) =>
     setCart((prev) => prev.filter((p) => p.id !== id));
  const addToCart = (product) => {
    if (!cart.some((p) => p.id === product.id)) {
      setCart((prev) => [...prev, product]);
      alert(`${product.title} added to cart 🛒`);
    } else {
      removeFromCart(product.id);
      alert(`${product.title} removed from cart ❌`);
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.some((p) => p.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
      alert(`${product.title} added to wishlist ❤️`);
    } else {
      removeFromWishlist(product.id);
      alert(`${product.title} removed from wishlist 💔`);
    }
  };

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((p) => p.id !== id));

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        filters,
        setFilters,
        priceOptions,
        ratingOptions,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
