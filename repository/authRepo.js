const { User, Otp, UserTemp } = require('../models/index.js')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcryptjs')
const errorHandler = require('../middleware/errorHandler.js')
const sendEmail = require('../utils/sendEmail.js')
const verifyOtp = require('../utils/verifyOtp.js')
const generateOtp = require('../utils/generateOTP.js')
const CustomError = require('../utils/CustomError.js')
const create = async (data) => {
    const email = data.email;
    const password = data.password;
    const username = data.username;

    if (!email || !password || !username) {
        throw new CustomError('Missing data', 400)
    }
    const userExist = await User.findOne({ $or: [{ "email": email }, { "username": username }] })
    if (userExist) {
        throw new CustomError('Username/email already exist', 403)
    }
    const alreadySent = await UserTemp.findOne({ $or: [{ "email": email }, { "username": username }] })
    if (alreadySent) {
        throw new CustomError('OTP already sent try after sometime', 403)
    }
    const otp = generateOtp()
    const hashedPassword = await bcrypt.hash(password, 10);
    const tempUser = await UserTemp.create({ email: email, password: hashedPassword, username: username });
    const userId = await tempUser._id;
    await Otp.create({ userId: userId, otp: otp })
    const response = await sendEmail(data.email, otp);
    if (response.success) {
        return { success: true, userId };
    }
    throw new CustomError('Invalid Email', 400)
}
const verifyEmail = async (userId, otp) => {
    const record = await Otp.findOne({ userId });
    if (record && record.otp === otp) {
        const userdata = await UserTemp.findById(userId)
        const newUser = await User.create({ email: userdata.email, password: userdata.password, username: userdata.username })
        await Otp.deleteOne({ userId: userId })
        await UserTemp.deleteOne({ _id: userId })
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' })
        return { success: true, token };
    }
    throw new CustomError('Invalid OTP', 400)
}
const userLogin = async (data) => {
    const user = await User.findOne({ username: data.username })
    if (!user) {
        throw new CustomError('Invalid Credentials', 400);
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        throw new CustomError('Invalid Credentials', 400);
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })
    return { success: true, token };
}
module.exports = {
    create,
    userLogin,
    verifyEmail
}