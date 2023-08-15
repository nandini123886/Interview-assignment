import express from 'express'
import expressValidator from 'express-validator'
import jwtVerify from '../middlewares/jwtVerify.mjs'
import User from '../controllers/users.controllers.mjs';
import upload from '../middlewares/fileUpload.mjs';
import Post from '../controllers/posts.controllers.mjs';
const router = express.Router();

// Checking the required fields
const createPostValidation = [
    expressValidator.check("title").notEmpty().withMessage("Title is Required!"),
    expressValidator.check("content").notEmpty().withMessage("Content is Required!"),
]

// Post creation route for a particular user
router.post("/", jwtVerify, upload.single("picture"), createPostValidation, async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        const id = req.userid;
        const user = await User.getUser(id);
        const { title, content } = req.body;
        const picture = req.file?.filename;
        const post = await Post.createPost(user.username, title, content, picture)
        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// show all posts
router.get('/', async (req, res) => {
    try {
        const post = await Post.getPosts()
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// show a particular post
router.get('/postid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.getPost(id)
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// show the count of post of each user
router.get("/counts", async (req, res) => {
    try {
        const user = await User.getAllUsers()
        const result = []
        await Promise.all(
            user.map(async (e) => {
                console.log(e.username)
                const posts = await Post.getPostByUsername(e.username)
                result.push({ username: e.username, count: posts.length })
            })
        )
        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
})

// show the count of post of a particular user on the basis of authorization
router.get("/count", jwtVerify, async (req, res) => {
    try {
        const id = req.userid
        const user = await User.getUser(id)
        const posts = await Post.getPostByUsername(user.username)
        return res.status(200).json({ username: user.username, count: posts.length })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router;