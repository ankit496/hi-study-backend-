const { Courses, Section } = require('../models/index')
const createCourse = async (title, description, price, language, level) => {
    const newCourse = await Courses.create({
        Title: title,
        Description: description,
        Price: price,
        Language: language,
        Level: level
    })
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
        const allCourses = await Courses.find().populate({
            path: 'Section_Id',
            populate: {
                path: 'Lecture_Id',
                model: 'Lectures'
            }
        }).populate('Reviews');
        return { success: true, status_code: 200, data: allCourses };
    }

    const course = await Courses.findById(id).populate({
        path: 'Section_Id',
        populate: {
            path: 'Lecture_Id',
            model: 'Lectures'
        }
    }).populate('Reviews');;
    return { success: true, status_code: 200, data: course };
}

const deleteCourse = async (id) => {
    await Courses.findByIdAndDelete(id);
    return { success: true, status_code: 200, message: "Successfully deleted Course" };
}

module.exports = {
    createCourse,
    findCourseByTitle,
    deleteCourse,
    findCourses
}