
const express = require('express');
// const {Product} = require('../models/product');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/product'); // Import Product model
const cors = require('cors')
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const dotenv = require('dotenv');
// require('dotenv').config();


app.use(cors())
app.options('*', cors())


// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

dotenv.config();

const api = process.env.API_URL;
const categoriesRoutes = require('./routers/categories'); // Import product router
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');
// Routes
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready');
})
.catch((error) => {
    console.error('Connection to MongoDB failed:', error);
});

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


