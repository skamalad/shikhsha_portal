'use strict';

const express = require('express');
const router = express.Router();
const listUsers = require('./auth');

// @desc Login/landing page
// @route GET /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc /Dashboard
// @route /dashboard
router.get('/dashboard', (req, res) => {
  console.log(req.headers);
  listUsers(res);
  res.render('dashboard');
});

module.exports = router;
