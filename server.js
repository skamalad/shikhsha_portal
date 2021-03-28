const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

// Load config
dotenv.config({ path: './config/config.env' });

// Morgan Dev Code for loggin
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Static folder for assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth.js'));

// Setting up port configuration
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
