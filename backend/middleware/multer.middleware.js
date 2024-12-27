const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Create a middleware for handling single file uploads
const singleUpload = multer({ storage }).single("file");

module.exports = { singleUpload };
