const Review = require('../models/Review')
const Courses = require('../models/Courses');
const User= require('../models/User');
const addReview = async (courseId, description,userId,rating) => {
    const review = await Review.create({
        Course_Id: courseId,
        UserId:userId,
        description: description,
        rating:rating
    })
    const course = await Courses.findById(courseId);
    course.review.push(review);
    const user=await User.findById(userId)
    user.reviews.push(review._id)
    await course.save();
    await user.save();
    return { success: true, message: "Successfully added review", status_code: 201 ,data:review};
}
const deleteReview = async (id) => {
    const review = await Review.findById(id);
    const courseId = review.Course_Id;
    const course = await Courses.updateOne(
        { _id: courseId },
        { $pull: { Reviews: id } }
    );
    await Review.findByIdAndDelete(id);
    return { success: true, message: "Successfully deleted review", status_code: 200 };
}
const updateReview = async (id, newdescription) => {
    const review = await Review.findByIdAndUpdate(id, { description: newdescription });
    return { success: true, message: 'Successfully updated review', status_code: 200 ,data:review}
}
module.exports = {
    addReview,
    deleteReview,
    updateReview
}