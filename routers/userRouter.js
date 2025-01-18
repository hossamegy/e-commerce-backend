const express = require('express');
const {
    getAllUsers,
    CreateUser,
    updateUser,
    replaceUser,
    deleteUser,
    getInfoUser
} = require('../controllers/userController');

const router = express.Router();

// Route to handle all users
router.route('/')
    .get(getAllUsers)    // Get all users
    .post(CreateUser);   // Create a new user

// Route to handle a specific user by ID
router.route('/:id')
    .get(getInfoUser)    // Get user by ID
    .put(updateUser)     // Update user by ID
    .delete(deleteUser)  // Delete user by ID
    .patch(replaceUser); // Replace user by ID (optional)

module.exports = router;
