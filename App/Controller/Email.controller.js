
const db = require("../Model/index");
const moment = require("moment");
const { successRes, failedRes } = require("../helper/response.helper");
const {sendMail} = require("../helper/mail.helper");
const { User,EmailTemplate,Token,RatingResponse,CommonMaster } = db;
const { encrypt, decrypt } = require('../helper/en');
const { geterror } = require('../helper/errorlog.helper');
var jwt = require('jsonwebtoken');
const {jwtKey}= require('../../DatabaseConfig/app.config');
const RequestModel = require('../helper/responseModel');
const responseModel = require("../helper/responseModel");

//get template function
const gettemplate =async (type,qtype) => {
    return await EmailTemplate.findOne({
        where:{
          type:type,
          question_type:qtype
            
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
    return await RatingResponse.findOne({
        where:{
          user_id:id
            
        }
    })
  }
//Single Question Mail
const singleQuestion = async (req,res) => {
    try {
    const {fname,email}=req.body;
    const templatedata = await gettemplate("RATING",1);
    var mail_body = templatedata._previousDataValues.body;
    fmail = mail_body.replace("{fname}",fname);
    sendMail(templatedata._previousDataValues.subject,fmail,email,templatedata._previousDataValues.sender_name,templatedata._previousDataValues.sender_email,templatedata._previousDataValues.reply_to_email);
    responseModel(200,"","Success!",res);
    } 
    catch (error) 
    {
    responseModel(500,"","Server exception. "+error.message,res);
    }
}
const multipleQuestion = async (req,res) => {
    try {
    const {fname,email}=req.body;
    const templatedata = await gettemplate("RATING",2);
    var mail_body = templatedata._previousDataValues.body;
    fmail = mail_body.replace("{fname}",fname);
    console.log(fmail);
    sendMail(templatedata._previousDataValues.subject,fmail,email,templatedata._previousDataValues.sender_name,templatedata._previousDataValues.sender_email,templatedata._previousDataValues.reply_to_email);
    responseModel(200,"","Success!",res);
    } 
    catch (error) 
    {
    responseModel(500,"","Server exception. "+error.message,res);
    }
}

const rating_submit = async (req,res) => {
    try {
    const rating = req.body.rating;
    const business_owner = req.body.business_owner;
    var {token} = req.headers;
    var json = jwt.decode(token);
    var id = json.uid;
    var userdata = await check_user_by_id(json.uid);
   
    if(userdata){
      const rating_data = await check_rating_by_user_id(id);
      
      if(rating_data) {
        console.log(rating_data);
        responseModel(401,"","Rating Already Submitted!!",res);
      } else {
      const storeData = {
        user_id:id,
        rating:rating,
        business_owner:business_owner
      }
      await RatingResponse.create(storeData).then((rs)=>{
        
        responseModel(200,storeData,"success",res);
      })
     
    }
    } else {
      
      responseModel(404,"","Invild Link!!",res);
    }
  } catch (error) {
    responseModel(500,"","Server exception. "+error.message,res);
  }
   
  }

//multiple email
const sendmailbycsv = async (req,res) => {
  try {
  const {data}=req.body;
  
  for(var i=0;i<data.length;i++) {
    var name = data[i].fname+" "+data[i].lname;
    var email = data[i].receipient_mail_id;
    //console.log(name);
    const templatedata = await gettemplate("RATING",3);
    var mail_body = templatedata._previousDataValues.body;
    fmail = mail_body.replace("{fname}",name);
    console.log(fmail);
    var st = sendMail(templatedata._previousDataValues.subject,fmail,email,templatedata._previousDataValues.sender_name,templatedata._previousDataValues.sender_email,templatedata._previousDataValues.reply_to_email);
    console.log(st);
  }
   responseModel(200,data,"Success!",res);
  } 
  catch (error) 
  {
  responseModel(500,"","Server exception. "+error.message,res);
  }
}


module.exports = {
    singleQuestion,
    multipleQuestion,
    rating_submit,
    sendmailbycsv
  
};
