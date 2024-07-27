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
        throw new CustomError('Invalid data', 400)
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
    throw new CustomError('Invalid Data', 400)
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
    throw new CustomError('Invalid Data', 400)
}
const userLogin = async (data) => {
    const user = await User.findOne({ username: data.username })
    if (!user) {
        throw new CustomError('Invalid Credentials', 401);
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        throw new CustomError('Invalid Credentials', 401);
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })
    return { success: true, token };
}
const updateUserRepo = async (data) => {
    const { id, first_name, last_name, phone_number, skill, bio, profile_pic ,cover_pic} = data
    const user = await User.findById(id).select('-password');
    if (phone_number)
        user.phone_number = phone_number;
    if (first_name)
        user.first_name = first_name;
    if (last_name)
        user.last_name = last_name;
    if (skill)
        user.skill = skill;
    if (bio)
        user.bio = bio;
    if (profile_pic)
        user.Profile_Pic = profile_pic
    if(cover_pic)
        user.Cover_Pic=cover_pic
    if(linkedin)
        user.LinkedIn=linkedin
    if(facebook)
        user.Facebook=facebook
    if(twitter)
        user.Twitter=twitter
    if(github)
        user.Github=github
    if(website)
        user.Website=website
    user.save();
    return { success: true, user };
}
const userDetailsRepo = async (id) => {
    const user = await User.findById(id)
      .select('-password')
      .populate({
        path: 'courses_bought',
        populate: {
          path: 'instructor',
          populate: {
            path: 'UserId',
            model: 'User' // Ensure this matches the model name for User
          }
        }
      }); // Add the field to be populated
    return { success: true, user };
}
module.exports = {
    create,
    userLogin,
    userDetailsRepo,
    verifyEmail,
    updateUserRepo
}