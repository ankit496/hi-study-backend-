const User = require('../models/User');
const { userLogin } = require('../repository/authRepo');

const setLogin = async (req, res, next) => {
    try {
        const response = await userLogin(req.body);

        if (response.success) {
            // req.user = response.token; // Attach token or user info to req.user
            return next(); // Call the next middleware or route handler
        }

        return res.status(403).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    setLogin
};
