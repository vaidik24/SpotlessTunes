const User= require('../Model/UserModel');
const ReviewModel = require('../Model/ReviewModel');

const getReviews = async (req, res) => {

    const { name } = req.body;

    try {
        const page_limit = 5;

        // Aggregate pipeline to group reviews by user name
        const reviews = await ReviewModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $sort: { ratedOn: -1 }
            },
            {
                $group: {
                    _id: '$user.name', // Group by user's name
                    reviews: {
                        $push: {
                            _id: '$_id',
                            userId: '$userId',
                            review: '$review',
                            rating: '$rating',
                            ratedOn: '$ratedOn'
                        }
                    }
                }
            }
        ]);

        // Find the reviews for the specified user
        let userReviews = null;
        reviews.forEach(review => {
            if (review._id === name) {
                userReviews = review.reviews;
            }
        });

        // Send response with user reviews and other reviews
        res.status(200).json({ userReviews, otherReviews: reviews.filter(review => review._id !== name) });
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
}

const addReview = async (req, res) => {
    try {
        const { name, review, rating } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ name });

        // If user does not exist, create a new user
        if (!user) {
            user = new User({ name });
            await user.save();
        }

        // Create a new review
        const newReview = new ReviewModel({
            userId: user._id, // Assign the user's ID to the review
            review,
            rating
        });

        // Save the review
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ message: 'Error adding review' });
    }
}

const editReview = async (req, res) => {
    try{
        const {reviewId, review, rating} = req.body;
        const reviewDoc = await ReviewModel.findOne({_id: reviewId});
        console.log(reviewDoc);
        reviewDoc.review = review;
        reviewDoc.rating = rating;
        await reviewDoc.save();
        res.json({ message: "Review edited successfully" });
    }catch (err){
        console.log("err editing review", err);
    }
}

module.exports = {getReviews, addReview, editReview};

