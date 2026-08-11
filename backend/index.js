import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv"

dotenv.config()
let PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})
connectDB()