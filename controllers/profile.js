const User = require('../models/user');
const Campground = require('../models/campground');

module.exports.renderProfile = async (req, res) => {
    const campgrounds = await Campground.find({ author: req.user._id }).populate('reviews');
    res.render('profile/index', { campgrounds });
}

module.exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user });
    console.log(req.user);
    res.redirect(`/profile/${req.user._id}`)
}

module.exports.renderEditForm = async (req, res) => {
    const campgrounds = await Campground.find({ author: req.user._id }).populate('reviews');
    res.render('profile/edit', { campgrounds });
}
