// getting-started.js
import mongoose from "mongoose"

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/cllg-mini-project').then(()=>{
    console.log("db connected");
    
  }).catch((err)=>{
    console.log(err);
    
  })
}

export default connectDB