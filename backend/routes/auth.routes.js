import express from "express"
import { logOut, Loign, signUp } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", Loign)
authRouter.get("/logout", logOut)
export default authRouter