# E-Commerce API

This project provides a RESTful API for an e-commerce platform. It includes the ability to manage products, users, and other related operations such as CRUD functionality for both users and products, image upload, and filtering products based on various criteria.

## Features

- **Product Management**:
  - CRUD operations (Create, Read, Update, Delete, Replace)
  - Image upload functionality (for product images)
  - Product filtering by multiple attributes (e.g., price, category, etc.)
  
- **User Management**:
  - CRUD operations for users
  - User info retrieval and management
  
- **Error Handling**:
  - Custom error handling middleware
  - Validation error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Multer for image uploads
- Joi for request validation
- CORS for cross-origin requests
- dotenv for environment variable management

## Installation

To get the project up and running locally:

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <project-folder>


2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add your MongoDB connection string:

```bash
CONNECTION_URL=mongodb://localhost:27017/e-commerce
```

4. Run the project:

    ```bash
    npm start
    ```

    This will start the server at http://localhost:3000.

## API Documentation
Products API

   - GET /api/v1/products: Retrieve all products.
   - POST /api/v1/products: Create a new product (requires image upload).
   - GET /api/v1/products/:id: Retrieve a specific product by ID.
   - PUT /api/v1/products/:id: Replace a specific product by ID.
   - PATCH /api/v1/products/:id: Update a specific product by ID.
   - DELETE /api/v1/products/:id: Delete a specific product by ID.
   - GET /api/v1/products/filter: Filter products based on query parameters (e.g., category, price).

Users API

   - GET /api/v1/users: Retrieve all users.
   - POST /api/v1/users: Create a new user.
   - GET /api/v1/users/:id: Retrieve a specific user by ID.
   - PUT /api/v1/users/:id: Replace a specific user by ID.
   - PATCH /api/v1/users/:id: Update a specific user by ID.
   - DELETE /api/v1/users/:id: Delete a specific user by ID.

## Environment Variables

The following environment variables are required:

  CONNECTION_URL: MongoDB connection string (default is mongodb://localhost:27017/e-commerce).
