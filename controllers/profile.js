const User = require('../models/user');
const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

module.exports.renderProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const campgrounds = await Campground.find({ author: req.user._id }).populate('reviews');
    console.log(user)
    res.render('profile/index', { user, campgrounds });
}

module.exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user });
    console.log(req.file)
    if (req.file) {
        if (user.image) {
                await cloudinary.uploader.destroy(user.image.filename);
        }
        user.image = { url: req.file.path, filename: req.file.filename };
        await user.save();
    }
    req.flash('success', 'Successfully updated profile information!');
    res.redirect(`/profile/${req.user._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const campgrounds = await Campground.find({ author: req.user._id }).populate('reviews');
    res.render('profile/edit', { user, campgrounds });
}
