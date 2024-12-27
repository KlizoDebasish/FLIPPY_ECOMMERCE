const express = require('express');
const router = express.Router();
const {createProduct, getAllProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/product.controllers');
const { login, signup } = require('../controllers/user.controllers');
// const isAuthenticated = require('../middleware/isAuthenticated');


router.post('/createProduct', createProduct);
router.get('/getAllProduct', getAllProduct);
router.get('/getProduct/:id', getProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

router.post('/login', login);
router.post('/signup', signup);
module.exports = router;


// All Api Routes are here
// http://localhost:4005/flippy/createProduct
// http://localhost:4005/flippy/getAllProduct
// http://localhost:4005/flippy/getProduct/:id
// http://localhost:4005/flippy/updateProduct/:id
// http://localhost:4005/flippy/deleteProduct/:id