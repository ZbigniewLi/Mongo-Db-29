const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.editProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
