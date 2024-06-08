const { User } = require('../models');
const Instructor = require('../models/Instructor');
const InstructorTickets = require('../models/InstructorTicket')
const getInstructorTickets = async () => {
    const tickets = await InstructorTickets.find({}).populate({ path: 'UserId', select: '-password' });
    return { success: true, tickets };
}
const verifyTicket = async (id, operation) => {
    const ticket = await InstructorTickets.findById(id);
    console.log(ticket)
    if (operation === 'rejected') {
        await InstructorTickets.findByIdAndUpdate(id, { status: operation });
        return { success: true, message: "Successfully updated the ticket", status_code: 200 }
    }
    ticket.status = operation
    ticket.save();
    const { description, UserId, Specialization, About, Type_of_employee, Qualifications, Method_of_teaching, status } = ticket;
    const newInstructor = await Instructor.create({ UserId: UserId, Specialization: Specialization, About: About, Type_of_employee: Type_of_employee, Qualifications: Qualifications, Method_of_teaching: Method_of_teaching, description: description })

    //change the role in user table
    const user = await User.findById(UserId)
    user.role = 'instructor';
    user.save()
    return { success: true, message: "Successfully created Instructor", status_code: 201 }
}
module.exports = {
    getInstructorTickets,
    verifyTicket
}