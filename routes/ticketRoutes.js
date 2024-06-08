const express=require('express')
const router=express.Router();
const isLogin=require('../middleware/isLogin')
const {instructorticket}=require('../controllers/ticketController')
/**
 * @swagger
 * /api/ticket/createInstructorTicket:
 *   post:
 *     summary: Be an Instructor
 *     description: Endpoint to create a new instructor ticket.
 *     tags:
 *       - Instructor
 *     parameters:
 *       - in: header
 *         name: Auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - specialization
 *               - about
 *               - type_of_employee
 *               - qualifications
 *               - method_of_teaching
 *               - id
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the ticket.
 *               specialization:
 *                 type: string
 *                 description: Specialization of the instructor.
 *               about:
 *                 type: string
 *                 description: Information about the instructor.
 *               type_of_employee:
 *                 type: string
 *                 description: Type of employee.
 *               qualifications:
 *                 type: string
 *                 description: Qualifications of the instructor.
 *               method_of_teaching:
 *                 type: string
 *                 description: Method of teaching.
 *     responses:
 *       201:
 *         description: Successfully created your ticket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 status_code:
 *                   type: integer
 *       403:
 *         description: You are authorized for this operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 status_code:
 *                   type: integer
 */
router.post("/createInstructorTicket",instructorticket);
module.exports=router