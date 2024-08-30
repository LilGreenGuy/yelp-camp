const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

router.route('/:id')
    .get(isLoggedIn, catchAsync(profile.renderProfile))
    .put(isLoggedIn, catchAsync(profile.updateProfile));


router.route('/:id/edit')
    .get(isLoggedIn, catchAsync(profile.renderEditForm));

module.exports = router;