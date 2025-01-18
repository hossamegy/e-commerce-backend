const multer = require('multer');
const path = require('path');
const asyncWrapper = require('../middleware/async-wrapper');
const products = require('../models/product');
const statusCode = require('http-status-codes');
const { BadRequest } = require('../errors/export-errors');
const productValidation = require('../validation/product-validation');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'images')); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});

// Multer instance with storage configuration
const upload = multer({ storage });

// Middleware for uploading a single image (field name 'image')
const uploadImages = () => upload.single('image');

const getAllProducts = asyncWrapper(async (req, res) => {
    const product = await products.find({});

    if (!product) throw new BadError(`No products found`);

    res.status(statusCode.CREATED).json(product);
});

const createProduct = asyncWrapper(async (req, res) => {
    const err = productValidation(req.body);
    if (err) throw new BadRequest(`${err.details[0].message}`);

    // Check if an image is uploaded
    if (!req.file) {
        throw new BadRequest('Product image is required.');
    }

    const product = await products.create({
        ...req.body,
        image: req.file.path  // Store image path if uploaded
    });

    if (!product) throw new BadRequest(`Error creating the product.`);

    res.status(statusCode.CREATED).json({ message: 'Product created successfully', product });
});


const updateProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params;

    const err = productValidation(req.body);
    if (err) throw new BadRequest(`${err.details[0].message}`);

    const product = await products.findOneAndUpdate(
        { _id: productID },
        req.body,
        { new: true, runValidators: true })

    if (!product) throw new BadRequest(`No product found with id ${productID}`);

    res.status(statusCode.OK).json({ message: "Product updated successfully", product });
});

const getProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params;

    const product = await products.find({ _id: productID });
    if (!product) throw new BadRequest(`No product found with id ${productID}`);

    res.status(statusCode.OK).json(product);
});

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params;

    const product = await products.findOneAndDelete({ _id: productID });
    if (!product) throw new BadRequest(`No product found with id ${productID}`);

    res.status(statusCode.OK).json(product);
});

const replaceProduct = asyncWrapper(async (req, res) => {
    const { id: productID } = req.params;

    const err = productValidation(req.body);
    if (err) throw new BadRequest(`${err.details[0].message}`);

    const product = await products.findOneAndUpdate(
        { _id: productID },
        req.body,
        { new: true, runValidators: true })

    if (!product) throw new BadRequest(`No product found with id ${productID}`);

    res.status(statusCode.OK).json({ message: "Product replaced successfully", product });
});

const filterProduct = asyncWrapper(async (req, res) => {
    const { name, price, date, category, company, rate, available, discount, sort } = req.query;
    const objectQuery = {};

    if (name) objectQuery.name = { $regex: name, $options: 'i' };
    if (price) objectQuery.price = price;
    if (date) objectQuery.date = date;
    if (category) objectQuery.category = category;
    if (company) objectQuery.company = company;
    if (rate) objectQuery.rate = rate;
    if (available) objectQuery.available = available;
    if (discount) objectQuery.discount = discount;

    let result = products.find(objectQuery);

    if (sort) {
        const sortList = sort.split(',').map(field => field.trim()).join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('date');
    }

    result = await result;

    res.status(statusCode.OK).json(result);
});


module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    replaceProduct,
    filterProduct,
    uploadImages

};
