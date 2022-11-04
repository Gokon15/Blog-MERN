import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'
/*import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'*/

const app = express()
dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
/*
app.use('/api/comments', commentRoute)*/

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://eugene:eugenehfndf48@cluster0.0tz7zic.mongodb.net/blog-mern?retryWrites=true&w=majority`,
        )

        app.listen(3002, () => console.log(`Server started on port: ${3002}`))
    } catch (error) {
        console.log(error)
    }
}

start()