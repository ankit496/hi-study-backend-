const {instructorticket}=require('../controllers/ticketController')
const {createNewCourse,addcourseOverview, addQuiz}=require('../controllers/courseController')
const { createSection } = require('../controllers/sectionController')
const { addnewlecture } = require('../controllers/lectureController')
const express=require('express')
const router=express.Router()
const isInstructor=require('../middleware/isInstructor')
const { getInstructor } = require('../controllers/instructorController')

/**
 * @swagger
 * /api/instructor/createCourse:
 *   post:
 *     summary: Create a new course
 *     tags: [Instructor]
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
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title
 *                 example: "Introduction to JavaScript"
 *               description:
 *                 type: string
 *                 description: Course description
 *                 example: "Learn the basics of JavaScript."
 *               price:
 *                 type: number
 *                 description: Course price
 *                 example: 99.99
 *               language:
 *                 type: string
 *                 description: Course language
 *                 example: "English"
 *               level:
 *                 type: string
 *                 description: Course level
 *                 example: "Beginner"
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Successfully created the course"
 *               data: 
 *                 Section_Id: []
 *                 Title: "Machine Learning 5"
 *                 Description: "ML course for beginner"
 *                 Rating: [0]
 *                 Reviews: []
 *                 Price: "5700"
 *                 Language: ["English"]
 *                 Level: "beginner"
 *                 Category: []
 *                 _id: "666345eed7024b55dc78393f"
 *                 __v: 0
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       409: 
 *         description: Title Cannot be Same
 *       500:
 *          description: Internal Server Error
 */
router.post("/createCourse",isInstructor,createNewCourse)

/**
 * @swagger
 * /api/instructor/createSection:
 *   post:
 *     summary: Create a new section
 *     tags: [Instructor]
 *     parameters:
 *       - in: header
 *         name: Auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom Authorization header
 *     description: Creates a new section and adds it to a specified course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Biology"
 *               courseId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       201:
 *         description: Successfully added new section
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
 *                   example: "Succesfully added new section"
 *                 data:
 *                   type: array
 *                   example: []
 *                 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/createSection",isInstructor,createSection)


/**
 * @swagger
 * /api/instructor/addLecture:
 *   post:
 *     summary: Add lecture
 *     tags: [Instructor]
 *     parameters:
 *       - in: header
 *         name: Auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom Authorization header
 *     description: Creates a new section and adds it to a specified course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Biology"
 *               url:
 *                 type: string
 *                 example: "www.google.com"
 *               sectionId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       201:
 *         description: Successfully added lecture
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
 *                   example: "Added lecture"
 *                 data:
 *                   type: array
 *                   example: []
 *                 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/addlecture",isInstructor,addnewlecture)
router.get("/getInstructorById/:id",getInstructor)
router.post("/addCourseOverview",isInstructor,addcourseOverview)
router.post("/addQuiz",isInstructor,addQuiz)
module.exports=router