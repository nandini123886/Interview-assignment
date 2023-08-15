import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './configs/db.mjs';
dotenv.config();
const app = express();
connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
const port = 8000;

import auth from "./routes/auth.routes.mjs"
import posts from "./routes/posts.routes.mjs"

app.use("/auth", auth)
app.use("/posts", posts)
app.get("/", (req, res) => {
    res.send("Server is Running...")
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})
