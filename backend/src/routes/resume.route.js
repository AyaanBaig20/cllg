import express from "express"
import {isAuth} from "../middleware/isAuth.js"
import {generateResume} from "../controller/resume.controller.js"

let router = express.Router()

router.post("/create",generateResume)

export default router