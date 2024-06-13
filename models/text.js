import mongoose from "mongoose";


const messageDetails = new mongoose.Schema({
    
        from: String,
        to: String,
        message: String,
        time: String,
    

  });

 export const messageProp = mongoose.model('messages', messageDetails);