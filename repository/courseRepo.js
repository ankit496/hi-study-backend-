const { Courses, Section } = require('../models/index')
const Instructor=require('../models/Instructor')
const CourseOverview = require('../models/CourseOverview')
const Lectures = require('../models/Lectures')
const Quiz = require('../models/Quiz')
const createCourse = async (courseTitle, category, courseType, desc, lesson, review,level, price, offPrice, student, discount, sellsType, star, ratingNumber, studentNumber, cateSmallImg, cateBigImg, userImg, courseImg, courseListImg, awardImg, days, isActiveCate, userName, userCategory, cateDesc, date, language, courseAward, courseFor,RequirementDetails,OverviewDetails,courseOverview,instructor,courseIntro) => {
    const newCourse = await Courses.create({
        courseTitle, category, courseType, desc, lesson, review,level, price, offPrice, student, discount, sellsType, star, ratingNumber, studentNumber, cateSmallImg, cateBigImg, userImg, courseImg, courseListImg, awardImg, days, isActiveCate, userName, userCategory, cateDesc, date, language, courseAward, courseFor,RequirementDetails,OverviewDetails,courseOverview,instructor,courseIntro
    })
    const inst=await Instructor.findById(instructor)
    inst.CourseCreated.push(newCourse._id)
    inst.save();
    return { success: true, status_code: 201, message: "Successfully created the course", data: newCourse }
}
const findCourseByTitle = async (title) => {
    const course = await Courses.findOne({ Title: title }).populate({
        path: 'Section_Id',
        populate: {
            path: 'Lecture_Id',
            model: 'Lectures'
        }
    });
    return { success: true, status_code: 200, data: course };
}
const findCourses = async (id) => {
    if (!id) {
        const allCourses = await Courses.find().populate([
            { path: 'courseOverview' },
            {
                path: 'instructor',
                populate: {
                        path: 'UserId',
                    model: 'User'
                }
            }
            
        ]);
        return { success: true, status_code: 200, data: allCourses };
    }
    const course = await Courses.findById(id).populate([
        {
            path: 'instructor',
            populate: {
                path: 'UserId',
                model: 'User'
            }
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
            path:'review',
            populate:{
                path:'UserId',
                model:'User'
            }
        }

    ]);
    return { success: true, status_code: 200, data: course };
}
const getCourseContentRepo = async (id) => {
    console.log(id)
    const courseContent = await Section.findById(id).populate([
        {
            path: 'Lecture_Id'
        }
    ]);
    return { success: true, status_code: 200, data: courseContent };
}
const deleteCourse = async (id) => {
    await Courses.findByIdAndDelete(id);
    return { success: true, status_code: 200, message: "Successfully deleted Course" };
}
const addcourseOverviewRepo = async (title, description, overview, courseId) => {
    const course = await Courses.findById(courseId)
    const courseDescription = await CourseOverview.create({ title, description, overview });
    course.courseOverview = await courseDescription._id;
    await course.save()
    return { success: true, status_code: 200, message: "Successfully added course Overview" }
}
const addQuizRepo = async (question, option1, option2, option3, option4, correctOption, Lecture_Id) => {
    const quiz = await Quiz.create({ question, option1, option2, option3, option4, correctOption })
    const lecture = await Lectures.findById(Lecture_Id)
    lecture.Quizzes.push(quiz._id)
    lecture.save()
    return { success: true, status_code: 200, message: 'Successfully added quiz' }
}
module.exports = {
    createCourse,
    findCourseByTitle,
    deleteCourse,
    findCourses,
    addcourseOverviewRepo,
    getCourseContentRepo,
    addQuizRepo
}