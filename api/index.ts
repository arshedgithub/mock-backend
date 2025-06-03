require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('../routes/userRoutes');
const pageRoutes = require('../routes/pageRoutes');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Use routes
app.use('/', pageRoutes);
app.use('/', userRoutes);

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
