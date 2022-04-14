
const db = require("../Model/index");
const moment = require("moment");
const { successRes, failedRes } = require("../helper/response.helper");
const {sendMail} = require("../helper/mail.helper");
const { User,EmailTemplate,Token,CommonMaster } = db;
const { encrypt, decrypt } = require('../helper/en');
const { geterror } = require('../helper/errorlog.helper');
var jwt = require('jsonwebtoken');
const {jwtKey,tokenValidity}= require('../../DatabaseConfig/app.config');
const RequestModel = require('../helper/responseModel');
const responseModel = require("../helper/responseModel");


exports.findAll = (req, res) => {
  User.findAll({ where: { status: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
  
//get template function
const gettemplate =async (type,qtype) => {
  return await EmailTemplate.findOne({
      where:{
        type:type,
        question_type:qtype
          
      }
  })
}
const gettoken =async (id) => {
  return await Token.findOne({
      where:{
        user_id:id
          
      }
  })
}
const check_user_by_email =async (email) => {
  return await User.findOne({
      where:{
        email:email
          
      }
  })
}
const check_user_by_id =async (id) => {
  console.log(id);
  return await User.findOne({
      where:{
        id:id
          
      }
  })
}
const check_rating_by_user_id =async (id) => {
  console.log(id);
  return await Rating.findOne({
      where:{
        user_id:id
          
      }
  })
}
const replaceAll =async (search, replacement,mail_body) => {
  var target = mail_body;
  return target.replace(new RegExp(search, 'g'), replacement);
}
// String.prototype.replaceAll = function(search, replacement) {
//   var target = this;
//   return target.replace(new RegExp(search, 'g'), replacement);
// };
//User Registration
const user_registration = async (req,res) => {

  const {fname,lname,email,mobile,fb_link,twitter_link,linkedin_link,type,no_of_emp,revenue,industry,address1,address2,address3,country,pincode}=req.body;
  console.log(req.body);


  const userdata = await check_user_by_email(email);
  if(userdata){
    RequestModel(1000,"","User Already Exit",res);
    return;
  }
   const dateTime = moment().format();
   if(type == 1) {
  var storeData = {
      role_id:1,
      fname:fname,
      lname:lname,
      email:email,
      mobile:mobile,
      fb_link:fb_link,
      twitter_link:twitter_link,
      linkedin_link:linkedin_link,
      type:type,
      status:1, //1=Active,2-InActive
      email_verify:1, //1=unverify,2=verify
      created_by:1,
      address1:address1,
      address2:address2,
      address3:address3,
      country:country,
      pincode:pincode
  }
} else {
  var storeData = {
    role_id:1,
    fname:fname,
    lname:lname,
    email:email,
    mobile:mobile,
    fb_link:fb_link,
    twitter_link:twitter_link,
    linkedin_link:linkedin_link,
    no_of_emp:no_of_emp,
    revenue:revenue,
    industry:industry,
    type:type,
    status:1, //1=Active,2-InActive
    email_verify:1, //1=unverify,2=verify
    created_by:1,
    address1:address1,
    address2:address2,
    address3:address3,
    country:country,
    pincode:pincode
}
}
console.log(storeData);
  const templatedata = await gettemplate("REG",1);
  //sendMail(templatedata._previousDataValues.subject,templatedata._previousDataValues.body,email);
  await User.create(storeData).then((rs)=>{
    var resp = { uid:rs.id};
    var jwttoken = jwt.sign(resp, jwtKey);
    
    var mail_body = templatedata._previousDataValues.body;
    var fmail = mail_body.replace("{token}",jwttoken);
    fmail = fmail.replace("{fname}",fname);
    
    
    sendMail(templatedata._previousDataValues.subject,fmail,email,templatedata._previousDataValues.sender_name,templatedata._previousDataValues.sender_email,templatedata._previousDataValues.reply_to_email);
    
    RequestModel(200,rs,"Succesfully registered.",res);
  })
  .catch((err)=>RequestModel(201,err,"Server exceptiom."+err.message,res))
  
}
//Email Verify function
const email_verify = async (req,res) => {
  try {
    console.log("body",req.body);
    var {token} = req.headers;
    var json = jwt.decode(token);
    var currentEpoch = new Date().valueOf() - 1000*60*60*tokenValidity;
    console.log(currentEpoch);
    console.log(json.iat);
    //json.iat += 24*60*60*2;
    if(currentEpoch=json.iat)
    {
      var userdata = await check_user_by_id(json.uid);
   
      if(userdata){
        if(userdata.email_verify == 2) {
          responseModel(1000,"","Already Verified.",res);
          
        }  else if(userdata){
          var fname = userdata.fname;
          var password = Math.random().toString(36).slice(-8);
          const hash = encrypt(password);
          userdata.update({
            email_verify: 2,
            password:hash
          })
         
          const templatedata = await gettemplate("PASSWORD",1);
         
          var mail_body = templatedata._previousDataValues.body;
         
         const fmail = await replaceAll("{password}",password,mail_body);
         const fmail2 = await replaceAll("{fname}",fname,fmail);
         //console.log(fmail2);
          sendMail(templatedata._previousDataValues.subject,fmail2,userdata.email,templatedata._previousDataValues.sender_name,templatedata._previousDataValues.sender_email,templatedata._previousDataValues.reply_to_email);
          responseModel(200,"","Email Verify Successfully!.",res);
        } else {
          responseModel(401,"","Invild Link!",res);
        
        }
      } else {
        responseModel(401,"","Invild Link!",res);
      }
    }
    else
    {
      responseModel(401,"","Token expired!",res);
    }
    
  
} catch (error) {
  responseModel(500,"","Server exception. "+error.message,res);
}
}


const multi_rating_submit = async (req,res) => {
  try {
  const rating = req.body.rating;
  const commentText = req.body.commentText;
  const headline = req.body.headline;
  console.log(rating);
  const id = decrypt(req.body);
  const userdata = await check_user_by_id(id);
  
  
  if(userdata){
    const rating_data = await check_rating_by_user_id(id);
    if(rating_data) {
      const data = {
        status:false,
        message:"Rating Already Submitted!!"
  
      }
      res.send(data);
    } else {
    const storeData = {
      user_id:id,
      rating:rating,
      text:commentText,
      headline:headline
    }
    await Rating.create(storeData).then((rs)=>{
      const data = {
        status:true,
        message:"Rating Submit Successfully!"
  
      }
      res.send(data);
    })
  }
  } else {
    const data = {
      status:false,
      message:"Invild Link!!"

    }
    res.send(data);
  }
} catch (error) {
  const data = {
    status:false,
    message:"Invild Link!!"

  }
  res.send(data);
}
 
}
const getprofile = async (req,res) => {
  try {
  
  const id = req.body.user_id;
  
  console.log(id);
  const userdata = await check_user_by_id(id);
  
  console.log(userdata);
  if(userdata){
   
      responseModel(200,userdata,"success",res);
  }  else {
    responseModel(401,"","Guest users not allowed.",res);
  }
} catch (error) {
  responseModel(500,"","Server exception. "+error.message,res);
}
 
}
const updateprofile = async (req,res) => {
  const {fname,lname,email,mobile,fb_link,twitter_link,linkedin_link,user_id }=req.body;
const errorlogdata = await geterror("signup");
console.log(errorlogdata.error_code);
  const storeData = {
      role_id:1,
      fname:fname,
      lname:lname,
      email:email,
      mobile:mobile,
      fb_link:fb_link,
      twitter_link:twitter_link,
      linkedin_link:linkedin_link,
     
  }
  await User.update(storeData, {
    where: { id: user_id },
  }) .catch((err)=>res.json(failedRes('something went wrong',err)))
  const resdata = {
    status:true,
    code:errorlogdata.error_code,
    message:errorlogdata.error_message
  }
  res.send(resdata);
}

const changepassword = async (req,res) => {
  const {old_password,password,confirm_password,user_id }=req.body;
  if(password != confirm_password) {
    const data = {
      status:false,
      message:"Password and Confirm Password should be same!"
  
    }
    res.send(data);
  }
  const hash = encrypt(jwtKey+password);
  const userdata = await check_user_by_id(user_id); 
  const oldhash = {
    iv:userdata.password,
    content:userdata.hash
  }
  const depass = decrypt(oldhash);
  
  if(depass == jwtKey+old_password) {
  
  const storeData = {
    password:hash.iv,
    hash:hash.content
  }
  await User.update(storeData, {
    where: { id: user_id },
  }) .catch((err)=>res.json(failedRes('something went wrong',err)))
  res.json(successRes('updated!!',user_id))
 } else {
  const data = {
    status:false,
    message:"Wrong Old Password!"

  }
  res.send(data);
 }
}

const userlogin = async (req,res) =>
{
  try
  {
    console.log("login post:",req.body);
    const {userName,password,clientName,deviceId} = req.body;
    var data={};
    const userdata = await check_user_by_email(userName);
    if(userdata)//user found
    { 
      if(userdata.password == password) { // match password
        var id =userdata.id;
        const storeData = {
          clientName:clientName,
          deviceId:deviceId
      }
      await User.update(storeData, {
        where: { id: id },
      });
           
            var resp = { uid:id};
            var jwttoken = jwt.sign(resp, jwtKey);
            data={status:true,message:"login success.", jwttoken:jwttoken,userType:userdata.type,userName:userdata.fname};
            console.log(data);
            res.status(200);
          }
          else
          {
            data={status:false,message:"Incorrect email address and / or password."};
            console.log(data);
            res.status(201);
          }
    }
    else
    {
      data={status:false,message:"User not found."};
      console.log(data);
      res.status(201);
    }
  }
  catch(e)
  {
    data={status:false,message:"server exception "+e.message};
    console.log(data);
    res.status(500);
  }

  res.send(data);
};
const checkuserbyusername = async (req,res) => {
  try {
  
  const username = req.body.username;
  
  const userdata = await check_user_by_email(username);
  
  if(userdata){
    const templatedata = await gettemplate("FORGOT",1);
    const hash = encrypt(jwtKey+userdata.id);
   var fname = userdata.fname;
   var email = userdata.email;
    var mail_body = templatedata._previousDataValues.body;
    var fmail = mail_body.replace("{token}","token="+hash.iv+"&hash="+hash.content);
    fmail = fmail.replace("{fname}",fname);
    
    
    sendMail(templatedata._previousDataValues.subject,fmail,email,templatedata._previousDataValues.sender_name,templatedata._previousDataValues.sender_email,templatedata._previousDataValues.reply_to_email);
      
      const data = {
     
        status:true,
        message:"User Found"
  
      }
      res.send(data);
    
  }  else {
    const data = {
     
      status:false,
      message:"User Not Found!!"

    }
    res.send(data);
  }
} catch (error) {
  const data = {
    status:false,
    message:"Some thing went wrong!"

  }
  res.send(data);
}
 
}

const verifyforgotlink = async (req,res) => {
  try {
  
 // const username = req.body.username;
  
  //const userdata = await check_user_by_email(username);
  
  if(true){ //user found

    const data = {
     
        status:true,
        message:"Token valid"
  
      }
      res.send(data);
    
  }  else {
    const data = {
     
      status:false,
      message:"User Not Found!!"

    }
    res.send(data);
  }
} catch (error) {
  const data = {
    status:false,
    message:"Some thing went wrong!"

  }
  res.send(data);
}
 
}

const changeforgotpassword = async (req,res) => {
  try {
    const {token,password,confirm_password }=req.body;
    var json = jwt.decode(token,jwtKey);
    var user_id = json.uid;
    if(password != confirm_password) {
      const data = {
        status:false,
        message:"Password and Confirm Password should be same!"
    
      }
      res.send(data);
    }
 // const username = req.body.username;
  
  //const userdata = await check_user_by_email(username);
  if(true){ //user found
    const hash = encrypt(jwtKey+password);
    const storeData = {
      password:hash.iv,
      hash:hash.content
    }
    await User.update(storeData, {
      where: { id: user_id },
    }) .catch((err)=>res.json(failedRes('something went wrong',err)))
    res.json(successRes('updated!!',user_id))
    
  }  else {
    const data = {
     
      status:false,
      message:"User Not Found!!"

    }
    res.send(data);
  }
} catch (error) {
  const data = {
    status:false,
    message:"Some thing went wrong!"

  }
  res.send(data);
}
 
}
const masterdata = async (req,res) => {
  try {
    console.log("body",req.body);
    var {token} = req.headers;
    var json = jwt.decode(token);
    var user = await check_user_by_id(json.uid);
    if(user)
    {
          const numEmp = await CommonMaster.findAll({
            where:{
              type:1
                
            }
        });
          const Industry = await CommonMaster.findAll({
            where:{
              type:2
                
            }
        });
        const revenue = await CommonMaster.findAll({
          where:{
            type:3
              
          }
        });
        const currency = await CommonMaster.findAll({
          where:{
            type:4
              
          }
        });
          var model = {
              numEmp:numEmp,
              Industry:Industry,
              revenue:revenue,
              currency:currency
        }
        responseModel(200,model,"success",res);
    }
    else
    {
      responseModel(404,"","Guest users not allowed.",res);
    }
   
  } 
  catch (error) 
  {
    responseModel(500,"","Server exception. "+error.message,res);
  }
}

module.exports = {
  user_registration,
  email_verify,
  multi_rating_submit,
  getprofile,
  updateprofile,
  changepassword,
  userlogin,
  checkuserbyusername,
  verifyforgotlink,
  changeforgotpassword,
  masterdata
  
};
