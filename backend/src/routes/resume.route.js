import express from "express"
import {isAuth} from "../middleware/isAuth.js"
import {generateResume,getAllUser} from "../controller/resume.controller.js"

let router = express.Router()

router.post("/create",generateResume)

router.get("/get-all-user",isAuth,getAllUser)

export default router