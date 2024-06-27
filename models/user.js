import mongoose from "mongoose";


const UserDetails = new mongoose.Schema({
    Email:String,
    Name:String,
    Password:String,
    ProfileImage:String, 

  });

 export const user = mongoose.model('user', UserDetails);