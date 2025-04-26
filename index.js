const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Resolve paths relative to server directory
const SERVER_DIR = __dirname;
const PUBLIC_DIR = path.join(SERVER_DIR, 'public');
const PRODUCTS_DIR = path.join(PUBLIC_DIR, 'img', 'products');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/img/products', express.static(PRODUCTS_DIR));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});