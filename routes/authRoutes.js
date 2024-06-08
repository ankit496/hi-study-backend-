const express=require('express')
const router=express.Router()
const {signup,login, verifyemail}=require('../controllers/authController')


/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully OTP Sent
 *       400:
 *          description: Invalid data
 *       403:
 *         description: Username/email already exists
 *       500:
 *         description: Internal Server Error  
 */
router.post("/signup",signup)


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in as user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login',login)

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify email with OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - otp
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal Server Error
 */
router.post('/verify',verifyemail)
module.exports=router