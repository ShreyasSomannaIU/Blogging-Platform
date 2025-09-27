import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) // Enable CORS for all routes

app.use(express.json({limit: "16kb"})) // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "20kb" })) // Middleware to parse URL-encoded bodies
app.use(express.static("public")) // Serve static files from the "public" directory
app.use(cookieParser()) // Middleware to parse cookies





export default app

