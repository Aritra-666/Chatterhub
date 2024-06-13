import mongoose from "mongoose";


const UserDetails = new mongoose.Schema({
    Email:String,
    Name:String,
    Password:String,
    Date: String

  });

 export const user = mongoose.model('user', UserDetails);