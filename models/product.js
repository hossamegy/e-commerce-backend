const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imagePath: String,
    name: {
        type: String,
        required: [true, 'name is required!'],
        maxlength: [200, 'Maximum name length is 200!'],
        minlength: [3, 'Minimum name length is 3!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [5, 'The minimum price is 5'],
        max: [999999, 'The Maximum price is 999999'],
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        enum: {
            values: ['laptob', 'mobile', 'smarch watch', 'accessoreis'],
            message: '{VALUE} is not a valid category!'
        }
    },
    company: {
        type: String,
        required: [true, 'Company name is required!'],
        maxlength: [100, 'Company name cannot be longer than 100 characters!']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required!'],
        min: [1, 'The minimum quantity is 1!'],
        max: [9999, 'The maximum quantity is 9999'],
    },
    date: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format!'
        }
    },
    describtion: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    rate: {
        type: Number,
        max: [5, 'Max rate is 5!'],
        min: [0, 'Min rate is 0'],
        default: null
    },
    discount: {
        type: Number,
        default: 0,
        max: [100, 'Max discount is 100%'],
        min: [0, 'Min discount is 0%']
    },
    review: {
        type: String,
        maxlength: [300, 'Maximum review length is 300 characters!'],
        minlength: [3, 'Minimum review length is 3 characters!']
    }
});

module.exports = mongoose.model('Product', ProductSchema);
