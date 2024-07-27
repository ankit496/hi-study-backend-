const { Section, Courses } = require("../models/index.js")
const Lectures=require('../models/Lectures.js')
const mongoose=require('mongoose')
const createNewSection = async (title, courseId) => {
    // console.log(title,courseId)
    courseId=new mongoose.Types.ObjectId(courseId)
    const newSection = await Section.create({ Course_Id:courseId, Title: title });
    //push this section in the course
    const course = await Courses.findById(courseId);
    course.courseContent.push(newSection._id);
    course.save()
    return { success: true, status_code: 201, message: "Successfully added section",data:newSection }
}
const deleteSectionRepo = async (sectionId) => {
    const section=await Section.findById(sectionId)
    const Lecture=section.Lecture_Id;
    for(let i=0;i<Lecture.length;i++){
        const lectureId=Lecture[i];
        await Lectures.findByIdAndDelete(lectureId);
    }
    await Section.findByIdAndDelete(sectionId);
    return { success: true, status_code: 200, message: "Successfully deleted section"}
}
module.exports = {
    createNewSection,
    deleteSectionRepo
}