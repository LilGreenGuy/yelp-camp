const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_100');
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },    
    displayname: {
        type: String,
        required: true,
    },
    image: ImageSchema,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)