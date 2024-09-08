const User = require('../models/user');

module.exports.renderRegister = (req, res, next) => {
    res.render('auth/register');
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, displayname, username, password } = req.body;
        const user = new User({ email, displayname, username })
        const registeredUser = await User.register(user, password);
        if(!req.file) {
            user.image = { url: '', filename: '' };
            await user.save();
        }
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}