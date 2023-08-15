import bcrypt from 'bcryptjs'
import users from '../models/users.model.mjs'

class User {
    // create user controller
    static createUser = (username, email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt)
                const isUser = await users.findOne({ username: username }, '-password')
                if (isUser) {
                    throw new Error("user already exists!")
                }
                const data = new users({
                    username: username,
                    email: email,
                    password: hashedPassword
                })
                const user = await data.save('-password');
                console.log(user)
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    }

    // login user controller
    static loginUser = (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userPassword = await users.findOne({ username: username }, 'password')
                if (!userPassword) {
                    throw new Error("User not found!!");
                }
                const isMatch = bcrypt.compare(password, userPassword);
                if (!isMatch) {
                    throw new Error("Invalid Credentials!!")
                }
                const user = await users.findOne({ username: username }, '-password')
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    }

    // get a particular user
    static getUser = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await users.findOne({ _id: id }, '-password');
                if (!user) {
                    throw new Error("User not found!")
                }
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    }

    // get all users
    static getAllUsers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await users.find({}, '-password')
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default User