import express from "express"
import {login,signup,logout,getMe,deleteUser} from "../controller/auth.controller.js"
import {isAuth} from "../middleware/isAuth.js"
let router = express.Router()

router.post("/login",login)

router.post("/signup",signup)

router.get("/logout",logout)

router.get("/get-me",isAuth,getMe)

router.delete("/delete",isAuth,deleteUser)

export default router