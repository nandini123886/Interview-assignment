import express from 'express'
import expressValidator from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../controllers/users.controllers.mjs';
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

// register validation
const validateFields = [
    expressValidator.check("username").notEmpty().withMessage("Username is required!").isString().withMessage("Username must be a String!"),
    expressValidator.check("email").notEmpty().withMessage("Email is required!").isString().withMessage("Email must be a String!"),
    expressValidator.check("password").notEmpty().withMessage("Password is required!").isString().withMessage("Password must be a String!"),
]

// route of user registration
router.post("/register", validateFields, async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, email, password } = req.body;
        const user = await User.createUser(username, email, password);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ user, token })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// route for user login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.loginUser(username, password)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ user, token })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

export default router