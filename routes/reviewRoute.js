const express=require('express')
const router=express.Router()
const {addReviews,deleteReviews,updateReviews}=require('../controllers/reviewController')
const isLogin=require('../middleware/isLogin')
/**
 * @swagger
 * /api/review/addReview:
 *   post:
 *     tags: [Review]
 *     summary: Add a new review
 *     description: Adds a new review to a specified course
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
 *               courseId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               description:
 *                 type: string
 *                 example: "This course is very informative!"
 *     responses:
 *       201:
 *         description: Successfully added review
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
 *                   example: "Successfully added review"
 *                 data:
 *                   type: array
 *                   example: []
 *       400:
 *         description: Bad Request
 *         
 *       500:
 *         description: Internal Server Error
 *    
 */
router.post("/addReview",addReviews)
/**
 * @swagger
 * /api/review/deleteReview/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Review]
 *     description: Deletes a review by its ID
 *     parameters:
 *       - in: header
 *         name: Auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom Authorization header
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Successfully deleted review
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
 *                   example: "Successfully deleted review"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.delete("/deleteReview/:id",isLogin,deleteReviews)



/**
 * @swagger
 * /api/review/updateReview/{id}:
 *   patch:
 *     summary: Update a review
 *     tags: [Review]
 *     description: Updates a review by its ID
 *     parameters:
 *       - in: header
 *         name: Auth
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom Authorization header
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: string
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newdescription:
 *                 type: string
 *                 example: "Updated review description"
 *     responses:
 *       200:
 *         description: Successfully updated review
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
 *                   example: "Successfully updated review"
 *                 data:
 *                   type: array
 *                   example: []
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *        
 */
router.patch("/updateReview/:id",isLogin,updateReviews);
module.exports=router