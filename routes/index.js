const express = require('express');
const router = express.Router();
// const { getServiceDetails } = require('../middleware/auth');

// @desc Login/landing page
// @route GET /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// router.get('/', (req, res, next) => {
//   getServiceDetails()
//     .then(() => {
//       res.render('login', {
//         layout: 'login',
//       });
//       console.log('Success');
//     })
//     .catch(() => {
//       console.log('Error');
//     });
// });

// @desc /Dashboard
// @route /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
