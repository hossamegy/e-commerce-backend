const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    replaceProduct,
    filterProduct,
    uploadImages
} = require('../controllers/productController');

const router = express.Router();

// Route for all products
router.route('/')
    .get(getAllProducts)        // Get all products
    .post(uploadImages(), createProduct);  // Handle image upload and product creation

router.route('/filter')
    .get(filterProduct);

// Route for a specific product (using product ID as a parameter)
router.route('/:id')
    .get(getProduct)            // Get a specific product
    .put(replaceProduct)        // Replace a specific product
    .patch(updateProduct)       // Update a specific product
    .delete(deleteProduct);     // Delete a specific product

module.exports = router;
