const { createCourse, findCourses, addcourseOverviewRepo, getCourseContentRepo, addQuizRepo } = require('../repository/courseRepo')
const CustomError = require('../utils/CustomError')
const jwt = require('jsonwebtoken')
const Instructor = require('../models/Instructor')
const createNewCourse = async (req, res, next) => {
    try {
        const { courseTitle, category, courseType, desc, lesson, review, level, price, offPrice, student, discount, sellsType, star, ratingNumber, studentNumber, cateSmallImg, cateBigImg, userImg, courseImg, courseListImg, awardImg, days, isActiveCate, userName, userCategory, cateDesc, date, language, courseAward, courseFor, RequirementDetails, OverviewDetails, courseOverview, courseIntro } = req.body
        const authHeader = req.headers.auth;
        const token = authHeader
        const decodedString = jwt.verify(token, process.env.JWT_SECRET)
        const id = decodedString.userId
        const instructorDetail = await Instructor.findOne({ UserId: id })
        const instructor = await instructorDetail._id
        const response = await createCourse(courseTitle, category, courseType, desc, lesson, review, level, price, offPrice, student, discount, sellsType, star, ratingNumber, studentNumber, cateSmallImg, cateBigImg, userImg, courseImg, courseListImg, awardImg, days, isActiveCate, userName, userCategory, cateDesc, date, language, courseAward, courseFor, RequirementDetails, OverviewDetails, courseOverview, instructor, courseIntro);
        if (response.success) {
            return res.status(response.status_code).json({
                success: true,
                message: response.message,
                data: response.data
            })
        }
        throw new CustomError('Failed to create Course', 400)
    }
    catch (error) {
        next(error)
    }
}
const getAllCourses = async (req, res, next) => {
    try {
        const response = await findCourses();
        return res.status(response.status_code).json({ success: true, message: "Successfully fetched all Courses", data: response.data });
    }
    catch (error) {
        next(error)
    }
}
const getCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await findCourses(id);
        return res.status(response.status_code).json({ success: true, message: "Successfully fetched Course", data: response.data });
    }
    catch (error) {
        next(error)
    }
}
const getInstructor=async(req,res,next)=>{
    try{
        
    }
    catch(error){
        next(error)
    }
}
const addcourseOverview = async (req, res, next) => {
    try {
        const { title, description, overview, courseId } = req.body
        const response = await addcourseOverviewRepo(title, description, overview, courseId)
        return res.status(response.status_code).json({ success: true, message: "Successfully added Course Overview" });
    }
    catch (error) {
        next(error);
    }
}
const getCourseContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await getCourseContentRepo(id);
        return res.status(response.status_code).json({ success: true, message: "Successfully fetched course", data: response.data })
    }
    catch (error) {
        next(error)
    }
}
const addQuiz = async (req, res, next) => {
    // try{
    const { question, option1, option2, option3, option4, correctOption, Lecture_Id } = req.body;
    const response = await addQuizRepo(question, option1, option2, option3, option4, correctOption, Lecture_Id)
    return res.status(response.status_code).json({ success: true, message: response.message })
    // }
    // catch(error){
    //     next(error)
    // }
}
module.exports = {
    createNewCourse,
    getCourse,
    getAllCourses,
    addcourseOverview,
    getCourseContent,
    addQuiz
}