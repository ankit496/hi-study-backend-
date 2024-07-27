const getInstructorRepo = require('../repository/instructorRepo')
const Instructor = require('../models/Instructor')
const getInstructor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const instructor = await Instructor.findById(id)
            .populate('UserId')
            .populate({
                path: 'CourseCreated',
                populate: [
                    {
                        path: 'instructor',
                        model: 'Instructor'
                    },
                    {
                        path: 'courseContent',
                        populate: {
                            path: 'Lecture_Id',
                            model: 'Lectures',
                            populate: {
                                path: 'Quizzes',
                                model: 'Quiz'
                            }
                        }
                    },
                    {
                        path: 'review',
                        populate: {
                            path: 'UserId',
                            model: 'User'
                        }
                    }
                ]
            });
        return res.status(200).json({ success: true, message: "Successfully fetched Instructor", data: instructor })
    }
    catch (error) {
        next(error)
    }
}
module.exports = {
    getInstructor
}