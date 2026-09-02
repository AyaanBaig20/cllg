import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:"user",
    enum:["admin","user"],
    required:true
  },
  resumeCreated:{
    type:Number,
    default:0
  }
});

let User = mongoose.model("user",userSchema)

export default User