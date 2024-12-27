const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controllers/user.controllers');
const { singleUpload } = require('../middleware/multer.middleware');

router.post('/login', login);
router.post('/signup', singleUpload, signup);
router.get('/logout', logout);
module.exports = router;


// All Api Routes are here
// http://localhost:4005/flippy/login
// http://localhost:4005/flippy/signup