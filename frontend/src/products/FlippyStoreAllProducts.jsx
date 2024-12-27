import React, { useCallback, useEffect, useRef, useState } from "react";
import useGetAllProduct from "../hooks/useGetAllProducts";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Link } from "react-router-dom";

function FlippyStoreAllProducts() {
  useGetAllProduct();
  const { allproducts } = useSelector((state) => state.product);
  // console.log(allproducts);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const observerRef = useRef();

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    const applySortAndFilter = () => {
      let products = [...allproducts];

      // Apply search filter
      if (products) { // we can add filtering functionality using searchQuery state
        products = products.filter(
          (product) =>
            product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product?.vendor?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Check if no products are found after filtering
      if (products.length === 0) {
        setNoResults(true); // Set noResults to true if no products match
      } else {
        setNoResults(false); // Reset noResults if products are found
      }

      // Apply sorting
      if (sortOption === "Low - High") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortOption === "High - Low") {
        products.sort((a, b) => b.price - a.price);
      } else if (sortOption === "Popular") {
        products.sort((a, b) => a.price - b.price); // Adjust sorting logic for "Popular" if needed
      }

      setFilteredProducts(products);
    };

    applySortAndFilter();
  }, [sortOption, searchQuery, allproducts]);


  // IntersectionObserver callback to load more items
  const loadMore = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prevCount) => prevCount + 8);
          setIsLoading(false); // End loading state
        }, 1500);
      }
    },
    [setVisibleCount]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0, // Trigger when the sentinel is fully visible
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMore]);

  return (
    <>
      <Navbar />
      {!allproducts ? (
        <div
          style={{
            backgroundImage:
              "url(https://img.freepik.com/premium-vector/pink-watercolor-background-with-white-background_664601-2883.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="min-h-screen px-4 flex justify-center items-center shine-effect"
        >
          <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
            Hmmm!!! Something is Wrong 🧐
          </h1>
        </div>
      ) : (
        <div
          style={{
            backgroundImage:
              "url(https://img.freepik.com/premium-vector/pink-watercolor-background-with-white-background_664601-2883.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="min-h-screen px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <div className="form-control w-full max-w-md mt-8 mb-10">
                <div className="flex items-center justify-center">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full focus:border-pink-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle ml-2"
                      title="filter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-pink-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                      <li onClick={() => handleSortChange("Popular")}>
                        <a>Popular</a>
                      </li>
                      <li onClick={() => handleSortChange("Low - High")}>
                        <a>Low - High</a>
                      </li>
                      <li onClick={() => handleSortChange("High - Low")}>
                        <a>High - Low</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl pb-10">
                {noResults ? (
                  <div className="col-span-full text-center text-lg text-blue-500">
                    No search results found for "{searchQuery}"<br />
                    Do you know the meaning of "{searchQuery}"?
                  </div>
                ) : (
                  (filteredProducts.length > 0
                    ? filteredProducts.slice(0, visibleCount)
                    : allproducts.slice(0, visibleCount)
                  ).map((product, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      key={index}
                      className="card bg-gradient-to-r from-slate-600 to-pink-500 w-full"
                    >
                      <figure className="px-6 pt-6 flex justify-center items-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="rounded-xl w-32 h-40 sm:w-48 sm:h-52 object-cover cursor-pointer"
                        />
                      </figure>
                      <div className="card-body flex flex-col items-center text-center p-4">
                        <h2 className="card-title text-white text-sm sm:text-lg font-bold mb-1">
                          {product.title.length > 18
                            ? `${product.title.slice(0, 18)}...`
                            : product.title}
                        </h2>
                        <div className="card-actions justify-end px-2 py-1">
                          <div className="badge badge-outline bg-gradient-to-r from-pink-500 to-slate-700 text-white cursor-pointer text-xs">
                            {product.vendor}
                          </div>
                        </div>
                        <div className="card-actions justify-end px-2 py-1">
                          <div className="text-white font-semibold text-xs">
                          ₹{new Intl.NumberFormat('en-IN').format(product.price)}
                          </div>
                          <div className="text-slate-400 font-semibold text-xs line-through">
                          ₹{new Intl.NumberFormat('en-IN').format(product.compare_at_price)}
                          </div>
                        </div>
                        <div className="card-actions mt-4 justify-center">
                          <Link
                            to={`/products/viewProductDetails/${product._id}`}
                            className="relative font-semibold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent 
                              before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-white before:transition-all before:duration-300 
                              hover:before:w-full"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <span className="loading loading-dots loading-lg text-pink-800 shine-effect"></span>
              )}

              {/* Sentinel element for automatic loading */}
              <div ref={observerRef} className="h-1"></div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default FlippyStoreAllProducts;
