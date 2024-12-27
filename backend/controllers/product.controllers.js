const productModel = require("../models/product.models");

exports.createProduct = async (req, res) => {
  const { badge_text, compare_at_price, image, price, title, vendor } =
    req.body;

  try {
    // Check if all required fields are provided
    if (
      !title ||
      !vendor ||
      !badge_text ||
      !compare_at_price ||
      !image ||
      !price
    ) {
      return res
        .status(422)
        .json({ message: "All fields are required", success: false });
    }

    // Check if any fields contain only spaces
    if (
      title.trim() === "" ||
      vendor.trim() === "" ||
      badge_text.trim() === "" ||
      image.trim() === "" ||
      price.toString().trim() === "" ||
      compare_at_price.toString().trim() === ""
    ) {
      return res
        .status(422)
        .json({ message: "Fields cannot contain only spaces", success: false });
    }

    // Validate if price is a valid number
    if (isNaN(price) || price <= 0) {
      return res.status(422).json({
        message: "Price must be a valid positive number",
        success: false,
      });
    }

    // Validate if compare_at_price is a valid number (if applicable)
    if (isNaN(compare_at_price) || compare_at_price < 0) {
      return res.status(422).json({
        message: "Compare at price must be a valid number",
        success: false,
      });
    }

    // Validate if image is a valid URL (basic validation)
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    // const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    
    if (!urlPattern.test(image)) {
      return res.status(422).json({ 
        message: "Image must be a valid URL", 
        success: false 
      });
    }
    
    // Check if URL has a valid image extension
    // const extension = image.split(".").pop().toLowerCase();
    // if (!imageExtensions.includes(extension)) {
    //   return res.status(422).json({
    //     message: "Imgae Only supported (jpg, jpeg, png, gif and web) these extension",
    //     success: false,
    //   });
    // }
    

    // Check if product already exists in the database
    const existingProduct = await productModel.findOne({ title: title.trim() });
    if (existingProduct) {
      return res
        .status(409)
        .json({ message: "Product already exists", success: false });
    }

    // Create the new product object
    const newProduct = new productModel({
      badge_text: badge_text.trim(),
      compare_at_price: parseFloat(compare_at_price.trim()),
      image: image.trim(),
      price: parseFloat(price.trim()),
      title: title.trim(),
      vendor: vendor.trim(),
    });

    // Save the product to the database
    const product = await newProduct.save({});

    return res.status(200).json({
      message: "Product created successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to create product", success: false });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find().sort({ createdAt: -1 });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    // Calculate the number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Count the total number of products to determine total pages
    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch the products for the current page
    const paginatedData = await productModel.find().skip(skip).limit(limit);

    return res.status(200).json({
      message: "Products fetched successfully",
      product,
      paginatedProduct: paginatedData,
      currentPage: page,
      totalPages,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Failed to fetch products",
      success: false,
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(422)
        .json({ message: "Product not Found", success: false });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch product", success: false });
  }
};

exports.updateProduct = async (req, res) => {
  const { badge_text, compare_at_price, image, price, title, vendor } =
    req.body;
  const { id } = req.params;

  try {
    // Find the product by ID
    const productId = await productModel.findById(id);

    if (!productId) {
      return res
        .status(422)
        .json({ message: "Product not Found", success: false });
    }

    // Initialize an empty object to store the fields that need to be updated
    const updateFields = {};

    // Conditionally add fields to the update object if they are not empty or only spaces
    if (title && typeof title === "string" && title.trim() !== "")
      updateFields.title = title.trim();
    if (vendor && typeof vendor === "string" && vendor.trim() !== "")
      updateFields.vendor = vendor.trim();
    if (
      badge_text &&
      typeof badge_text === "string" &&
      badge_text.trim() !== ""
    )
      updateFields.badge_text = badge_text.trim();

    if (compare_at_price !== undefined && compare_at_price !== null) {
      const compareAtPriceStr = compare_at_price.toString().trim();
      if (!isNaN(compareAtPriceStr) && parseFloat(compareAtPriceStr) >= 0) {
        updateFields.compare_at_price = parseFloat(compareAtPriceStr);
      } else {
        return res.status(422).json({
          message: "Compare at price must be a valid number",
          success: false,
        });
      }
    }

    if (image && typeof image === "string" && image.trim() !== "") {
      const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
      if (urlPattern.test(image.trim())) {
        updateFields.image = image.trim();
      } else {
        return res
          .status(422)
          .json({ message: "Image must be a valid URL", success: false });
      }
    }

    if (price !== undefined && price !== null) {
      const priceStr = price.toString().trim();
      if (!isNaN(priceStr) && parseFloat(priceStr) > 0) {
        updateFields.price = parseFloat(priceStr);
      } else {
        return res.status(422).json({
          message: "Price must be a valid positive number",
          success: false,
        });
      }
    }

    // If there are no valid fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(422).json({
        message: "No valid fields provided to update",
        success: false,
      });
    }

    // Check if the existing product data is the same as updateFields
    const isAlreadyUpdated = Object.keys(updateFields).every(
      (key) => updateFields[key] === productId[key]
    );

    if (isAlreadyUpdated) {
      return res.status(200).json({
        message: "Already updated, add changes to update",
        success: true,
      });
    }

    // Update the product with the provided fields
    const updatedProduct = await productModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(500)
        .json({ message: "Failed to update product", success: false });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update product", success: false });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(422)
        .json({ message: "Product has been deleted", success: false });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete product", success: false });
  }
};
