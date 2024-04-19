const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    review: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        min: 0,
        Max: 5,
        required: true
    },

    ratedOn: {
        type: Date,
        default: Date.now
    }
});

const ReviewModel = mongoose.model("Review", reviewSchema)

module.exports = ReviewModel;