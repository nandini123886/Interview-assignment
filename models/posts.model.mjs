import mongoose from "mongoose";

// post schema
const postSchema = mongoose.Schema({
    username: String,
    title: String,
    content: String,
    image: Buffer
})

const posts = mongoose.model("Posts", postSchema)

export default posts