import express from 'express';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import bodyParser from 'body-parser';
import _ from 'lodash'
import mongoose from 'mongoose';
import { user } from './models/user.js'
import { messageProp } from './models/text.js'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
var OTP;

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.listen(3000, () => console.log('listening on port 3000'))

app.use(express.static("public"))

app.use(express.json())
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/chattterhub');
}


app.post('/data', (req, res) => {

 console.log("--//---//---//---//--sign in--//---//---//---//--")

  console.log(req.body.email)

  user.findOne({ Name: req.body.name })
  .then(data => {
    
   
    if(data !== null){  
      res.json(false)
     
    }else{
      const email = req.body.email

      OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
      console.log("Generated:", OTP);
    
      let mail = 'Your 4 digit OTP is ' + OTP;
      console.log(mail);
    
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dev.Bold2006@gmail.com',
          pass: 'csnc qzqp zfpq dogh'
        }
      });
    
      var mailOptions = {
        from: 'codeboldy',
        to: email,
        subject: 'OTP for chatterhub sign in ',
        text: mail
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.json(error)
        } else {
          console.log('Email sent: ' + info.response);
          res.json(true)
        }
        
      });
    } 
  })

  

})


app.post('/dataCheck', (req, res) => {

  console.log("-//--//---//---//-otp check--//---//----//--//-")

  console.log(req.body);

  let responseData = { message: 'false' };

  if (OTP == req.body.otp) {

    responseData = { message: 'true' };
    const USER = new user({
      Email: req.body.email,
      Name: req.body.name,
      Password: req.body.password,
      ProfileImage:null,
    });
    USER.save();

  }
  res.json(responseData)
 })

   app.post('/login', (req, res) => {

    console.log("--//--//--//--//--log in--//---//---//---//--")

  console.log(req.body)

  user.findOne({ Name: req.body.name, Password:req.body.password })
  .then(data => {
    console.log(data);
    res.json(data);
  })
  .catch(err => {
    console.error(err);
  });
 })
 
 app.post('/search', (req, res) => {
  console.log(req.body);
  user.findOne({ Name: req.body.name })
 .then(data => {
   console.log(data);
   
   if(data!== null){
    let result={
      Name:data.Name,
      ProfileImage:data.ProfileImage
     }
     res.json(result);
    }else{
      res.json(data)
    }   
  })
 })
 app.post('/loadchats',(req,res)=>{
  messageProp.find({$or: [
    { from: req.body.Name },  
    {  to: req.body.Name }   
] })
  .then(data => {
    const keyGenerator = data => {
      if (data.from === req.body.Name) {
        return data.to;
      } else if (data.to === req.body.Name) {
        return data.from;
      }
     
    };
    const groupedData = _.groupBy(data, keyGenerator);
    const groupNames = Object.keys(groupedData)
    console.log(groupNames)
    res.json(groupNames)
  })
   
   
 })
 app.post('/message', (req, res) => {
  console.log(req.body)

  const URL={ url:'message.html?messageTo='+ req.body.Name,}
  
  res.json(URL);

 })
 app.post('/sendMessage', (req, res) => {

  console.log(req.body)
  const NewMessage = new messageProp({
   
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        time: req.body.time,   

  });
  NewMessage.save();
  res.json({status:'done'})
 })
 app.post('/ChatHistory', (req, res) => {
 
  messageProp.find({ $or: [
    { from: req.body.user1, to: req.body.user2  },  
    { from: req.body.user2, to: req.body.user1 }   
] })
  .then(data => {
    console.log(data)
    console.log(typeof(data));
    res.json(data)
  })
  

 })

app.post('/updatePP', (req, res) => {
  console.log(req.body.base64URL);

  user.findOne({ Name: req.body.Name })
    .then(data => {
      console.log(data);

      return user.updateOne({ Name: req.body.Name }, { $set: { ProfileImage: req.body.base64URL } });
    })
    .then(updateResult => {
      console.log("Update done", updateResult);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred while updating the profile image");
    });
});

  app.post('/profileImage', (req, res) => {
    user.findOne({Name:req.body.Name})
    .then(data=>{
      res.json(data.ProfileImage)
    })
  })
  
 