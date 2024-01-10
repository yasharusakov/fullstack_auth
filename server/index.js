import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/authRouter.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use('/auth', authRouter)

const main = async () => {
    try {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
        await mongoose.connect(process.env.DATABASE_URL)
    } catch (err) {
        console.error(err)
    } finally { }
}

main()