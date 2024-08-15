const express = require('express');
const router = express.Router({ mergeParams: true });
const { isReviewAuthor, isLoggedIn, validateReview } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const reviews = require('../controllers/reviews');

router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;