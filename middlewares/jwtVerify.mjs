import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const jwtVerify = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userid = decoded.id
        next();
    }
    catch (err) {
        return res.status(401).json({ message: err.message })
    }
}

export default jwtVerify;