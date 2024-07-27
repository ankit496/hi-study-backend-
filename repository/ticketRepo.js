const InstructorTicket = require('../models/InstructorTicket')
const User = require('../models/User')
const instructorTicketRequest = async (description, specialization, about, type_of_employee, qualifications, method_of_teaching, id,linkedin,twitter,facebook,instagram) => {
    const user = await User.findById(id)
    if (!user)
        return { success: false, message: 'You are authorized for this operation', status_code: 403 };

    const createTicket = await InstructorTicket.create({ description: description, Specialization: specialization, Type_of_employee: type_of_employee, Qualifications: qualifications, UserId: id, Method_of_teaching: method_of_teaching, About: about ,LinkedIn:linkedin,Twitter:twitter,Facebook:facebook,Instagram:instagram})
    return { success: true, message: "Successfully created your ticket", status_code: 201 };
}

module.exports = {
    instructorTicketRequest
}