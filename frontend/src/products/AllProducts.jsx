import React from "react";
import { Link } from "react-router-dom";

function AllProducts({ allpaginatedproducts }) {
  // console.log(allproducts)

  // Add other image hosting providers you expect
  function isValidImageUrl(url) {
    try {
      const supportedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const supportedDomains = [
        "imimg.com", // Images from imimg.com
        "designinfo.in", // Images from designinfo.in
        "nestroots.com", // Images from nestroots.com
        "samsung.com", // Samsung image service
        "gstatic.com", // Google Images (encrypted-tbn)
        "pexels.com", // Pexels
        "unsplash.com", // Unsplash images (optional)
        "flixcart.com", // Flipkart image domain
        "encrypted-tbn0.gstatic.com", // Google images (example domain)
        "images.pexels.com", // Pexels images (example domain)
        "i.imgur.com", // Imgur images (example domain)
        "shopifycdn.com"  // Shopify CDN image domain (added)
      ];

      const parsedUrl = new URL(url);
      const domain = parsedUrl.hostname;

      // Check if the domain is supported
      if (
        !supportedDomains.some((domainPattern) =>
          domain.includes(domainPattern)
        )
      ) {
        return false; // Reject if the domain is not one of the expected domains
      }

      // Check if URL contains supported image extensions in the pathname
      const extension = parsedUrl.pathname.split(".").pop().toLowerCase();
      if (supportedExtensions.includes(extension)) {
        return true; // Valid image URL with an extension
      }

      // If the extension is not directly found, check for image-related keywords in query params or path
      const imageKeywords = [
        "image",
        "tbn",
        "samsung",
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
      ];
      const isImage = imageKeywords.some(
        (keyword) =>
          parsedUrl.pathname.includes(keyword) ||
          parsedUrl.search.includes(keyword)
      );

      return isImage;
    } catch (err) {
      return false; // If URL parsing fails, return false
    }
  }

  return (
    <>
      {allpaginatedproducts.map((product, index) => (
        <div
          key={index}
          className="card bg-gradient-to-r from-slate-600 to-pink-500 w-full sm:w-60"
        >
          <figure className="px-6 pt-6 flex justify-center items-center">
            <img
              src={
                isValidImageUrl(product.image)
                  ? product.image
                  : "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg"
              }
              alt={product.title}
              className="rounded-xl w-32 h-40 object-cover cursor-pointer"
            />
          </figure>

          <div className="card-body flex flex-col items-center text-center p-4">
            <h2 className="card-title text-white text-lg font-bold mb-2">
              {product.title.length > 18
                ? `${product.title.slice(0, 18)}...`
                : product.title}
            </h2>

            <div className="card-actions justify-end px-2 py-1">
              <div className="badge badge-outline bg-gradient-to-r from-pink-500 to-slate-700 text-white cursor-pointer text-xs">
                {product.vendor}
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
        </div>
      ))}
    </>
  );
}

export default AllProducts;
