const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const { cloudinary } = require('../cloudinary');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
            <p>${this.description.substring(0, 20)}...</p>`
});

CampgroundSchema.virtual('reviewRating')
    .get(function () {
        const rating = [];
        for (let i = 0; i < this.reviews.length; i++) {
            rating.push(this.reviews[i].rating);
        }
        const ratings = rating.reduce((total, currentItem) => {
            return (total + currentItem);
        }, 0)
        const averageRating = Math.floor(ratings / rating.length);
        return averageRating;
    });


CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
    for(let image of doc.images) {
        await cloudinary.uploader.destroy(image.filename);
    }
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);