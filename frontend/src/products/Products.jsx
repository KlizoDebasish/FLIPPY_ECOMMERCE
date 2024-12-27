import React from "react";
import { useSelector } from "react-redux";
import AllProducts from "./AllProducts";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { motion } from "framer-motion";
import useGetAllPaginatedProducts from "../hooks/useGetAllPaginatedProducts";

function Products() {
  const { currentPage, totalPages, setCurrentPage } =
    useGetAllPaginatedProducts();
  const { allpaginatedproducts } = useSelector((state) => state.product);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      {!allpaginatedproducts ? (
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
          className="min-h-screen"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className=" text-center font-semibold text-2xl pt-10 bg-gradient-to-r from-pink-400 to-black bg-clip-text text-transparent">
              Special Deals
            </h1>
            <div className="flex justify-center px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl pt-10 pb-10 sm:mt-28">
                <AllProducts allpaginatedproducts={allpaginatedproducts} />
              </div>
            </div>
          </motion.div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 mb-4 space-x-4 px-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              className={`px-3 py-2 text-sm sm:text-base font-semibold rounded-full ${
                currentPage === 1
                  ? "bg-gradient-to-r from-pink-300 to-slate-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-slate-700 text-white hover:from-pink-600 hover:to-slate-800"
              }`}
            >
              Prev
            </button>

            {/* Page Number */}
            <span className="text-sm sm:text-lg font-semibold text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              className={`px-3 py-2 text-sm sm:text-base font-semibold rounded-full ${
                currentPage === totalPages
                  ? "bg-gradient-to-r from-pink-300 to-slate-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-slate-700 text-white hover:from-pink-600 hover:to-slate-800"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Products;
