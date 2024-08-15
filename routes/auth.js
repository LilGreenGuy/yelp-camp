const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const auth = require('../controllers/auth')

router.route('/register')
    .get(auth.renderRegister)
    .post(catchAsync(auth.createUser));

router.route('/login')
    .get(auth.renderLogin)
    .post(storeReturnTo,
        passport.authenticate('local',
            { failureFlash: true, failureRedirect: '/login' }), auth.login);

router.get('/logout', auth.logout);

module.exports = router;