const express=require('express')
const router=express.Router()
const {getInstructorRequests,verifyInstructorTicket}=require('../controllers/adminController')
const {isAdmin}=require('../middleware/isAdmin')
/**
 * @swagger
 * components:
 *   parameters:
 *     AuthorizationHeader:
 *       -in: header
 *       name: Auth
 *       required: true
 *       schema:
 *         type: string
 *       description: Custom Authorization header
 * /api/admin/getInstructorTickets:
 *   get:
 *     summary: Get all instructor tickets
 *     tags: [Admin]
 *     parameters:
 *       - name: Auth
 *         in: header
 *         description: authorization token
 *         required: true
 *     responses:
 *       200:
 *         description: A list of instructor tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tickets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 *       401:
 *          description: Unauthorized
 *       403:
 *          description: Login to Continue
 *       500:
 *          description: Internal Server Error
 */
router.get("/getInstructorTickets",isAdmin,getInstructorRequests);

/**
 * @swagger
 * /api/admin/verifyInstructorTicket/{id}:
 *   patch:
 *     summary: Verify or reject an instructor ticket
 *     tags: [Admin]
 *     parameters:
 *       - name: Auth
 *         in: header
 *         description: authorization token
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: operation
 *         required: true
 *         description: Operation to be performed (accepted or rejected)
 *         schema:
 *           type: object
 *           properties:
 *             operation:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully updated the ticket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 status_code:
 *                   type: integer
 *       201:
 *         description: Successfully created Instructor
 *         headers:
 *           Authorization:
 *             description: Authorization token
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 status_code:
 *                   type: integer
 */

router.patch("/verifyInstructorTicket/:id",isAdmin,verifyInstructorTicket)
module.exports=router