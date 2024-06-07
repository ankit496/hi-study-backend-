const { Section, Courses } = require("../models/index.js")
const createNewSection = async (title, courseId) => {
    const newSection = await Section.create({ Course_Id: courseId, Title: title });
    //push this section in the course
    const course = await Courses.findById(courseId);
    await course.Section_Id.push(newSection._id);
    course.save()
    return { success: true, status_code: 201, message: "Successfully added section" }
}
const deleteSection = async (sectionId) => {
    await Section.findByIdAndDelete(sectionId);
    return { success: true, status_code: 200, message: "Successfully deleted course" }
}
module.exports = {
    createNewSection,
    deleteSection
}