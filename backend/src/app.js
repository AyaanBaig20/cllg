import express from "express"
import authRoute from "./routes/auth.route.js"
import resumeRoute from "./routes/resume.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

let app = express()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser());

// routes
app.use("/api/auth",authRoute)
app.use("/api/resume",resumeRoute)

export default app