import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
import posts from "../models/posts.model.mjs"

class Post {
    // create a post
    static createPost = (username, title, content, picture) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = new posts({
                    username,
                    title,
                    content,
                    image: picture && fs.readFileSync(path.join(__dirname, "../", "/uploads", picture))
                })
                const post = await data.save();
                picture && fs.unlinkSync(path.join(__dirname, "../", "/uploads", picture))
                resolve(post)
            } catch (err) {
                reject(err)
            }
        })
    }

    // get all posts
    static getPosts = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await posts.find({})
                resolve(post)
            } catch (err) {
                reject(err)
            }
        })
    }

    // get a particular post
    static getPost = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await posts.findOne({ _id: id })
                resolve(post)
            } catch (err) {
                reject(err)
            }
        })
    }

    // get posts on the basis of username
    static getPostByUsername = (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await posts.find({ username: username })
                resolve(post)
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default Post