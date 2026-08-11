import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";


let app = express()
app.use(express.json())
app.use(cookieParser());

// routes
app.use("/api/auth",authRoute)

export default app