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
  }
});

let User = mongoose.model("user",userSchema)

export default User