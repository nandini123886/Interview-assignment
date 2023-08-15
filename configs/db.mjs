import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const url = 'mongodb://localhost:27017/apnakonnect'

const connect = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Database Connected!!")
        }).catch((err) => {
            throw err;
        })
    } catch (err) {
        console.log(err.message)
    }

}

export default connect;