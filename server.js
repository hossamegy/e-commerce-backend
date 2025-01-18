require('dotenv').config();
const express = require('express');
const statusCode = require('http-status-codes');
const errorHandler = require('./middleware/error-handler')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const cors = require('cors');
// connect to mongoDB
connectDB();

const app = express();

// Allow requests from your React app on port 3000
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors({ origin: 'http://localhost:4200' }));

// Use CORS middleware with the options
app.use(cors(corsOptions));
// middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.status(statusCode.OK).json({message: 'Hello', status: statusCode.OK});
})

// routes
// products
app.use('/api/v1/products/', productRouter);
// users
app.use('/api/v1/users/', userRouter);

// custom error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || '3000';
const HOST_NAME = process.HOST_NAME || '127.0.0.1';

try {
    mongoose.connection.once('open', () => {
        app.listen(PORT, HOST_NAME, () => {
            console.log(`Server is running on http://${HOST_NAME}:${PORT}`);
        });
        
    });
} catch (err) {
    console.log(err);

}

