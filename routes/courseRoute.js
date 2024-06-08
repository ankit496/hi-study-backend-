const express=require('express')
const router=express.Router()
const {getCourse,getAllCourses}=require('../controllers/courseController')
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
 * /api/course:
 *   get:
 *     summary: Get Courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: A list of all courses
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 *       500:
 *          description: Internal Server Error
 */
router.get('/',getAllCourses)

/**
 * @swagger
 * /api/course/{id}:
 *   get:
 *     summary: Fetch information about a course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched course Information
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
 *                 data:
 *                   type: array
 *       500:
 *          description: Internal Server Error
 */
router.get("/:id",getCourse)
module.exports=router