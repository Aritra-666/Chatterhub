import mongoose from "mongoose";


const usercookie = new mongoose.Schema({
    
        ID: String,
        value: String,
        setTime:String,
        expire:Number

});

 export const UserCookie = mongoose.model('UserCookie', usercookie );