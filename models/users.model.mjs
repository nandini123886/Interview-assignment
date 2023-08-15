import mongoose from 'mongoose'

// user schema
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const users = mongoose.model("Users", userSchema)

export default users;