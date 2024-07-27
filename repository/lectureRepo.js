const { Lectures, Section } = require('../models/index')
const mongoose = require('mongoose')
const addLecture = async (Title, sectionId, url) => {
    const secId = new mongoose.Types.ObjectId(sectionId);
    // console.log(type(secId))
    // console.log(Title,sectionId,url)
    const newLecture = await Lectures.create({ Title: Title, Section_ID: secId, Content_url: url })
    //adding this to section Schema
    const section = await Section.findById(sectionId);
    section.Lecture_Id.push(newLecture._id);
    section.save()
    return { success: true, status_code: 201, message: "Added lecture",data:newLecture }
}
const editLecture = async (lecture_id, Title, Content_url) => {
    const lecture = await Lectures.findById(lecture_id)
    let newTitle = Title
    let url = Content_url
    if (!Title) {
        newTitle = await lecture.Title
    }
    if (!Content_url) {
        url = await lecture.Content_url
    }
    const updatelecture = await Lectures.findByIdAndUpdate(id, { Title: newTitle, Content_url: url })
    return { success: true, status_code: 200, message: "Successfully updated the course" };
}
const deleteLectureRepo = async (id) => {
    await Lectures.findByIdAndDelete(id)
    return { success: true, status_code: 200, message: "Successfully deleted the course" };
}
module.exports = {
    addLecture,
    editLecture,
    deleteLectureRepo
}