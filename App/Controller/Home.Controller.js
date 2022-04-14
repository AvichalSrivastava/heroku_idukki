
const db = require("../Model/index");
const moment = require("moment");
const { successRes, failedRes } = require("../helper/response.helper");
const {sendMail} = require("../helper/mail.helper");
const { HomeKpi,User,RatingResponse,FontFamily,BusinessVisitSetting,SocialInstantMsgApis } = db;
const { encrypt, decrypt } = require('../helper/en');
const { geterror } = require('../helper/errorlog.helper');
var jwt = require('jsonwebtoken');
const {jwtKey}= require('../../DatabaseConfig/app.config');
const RequestModel = require('../helper/responseModel');
const responseModel = require("../helper/responseModel");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op; 
const { sequelize, Speciality,Transaction, Skill, Notification, God, Temple, Booking, Bookinghistory, Priest, Supervisor, DateWise, Bookingrequest, FAQ, Support, Language } = require("../Model/index");
const check_user_by_id =async (id) => {
    console.log(id);
    return await User.findOne({
        where:{
          id:id
            
        }
    })
  }
//Home Kpi
const gethomekpi = async (req,res) => {
    try {
      const {from_date,to_date }=req.body;
        var {token} = req.headers;
        var json = jwt.decode(token);
        var user = await check_user_by_id(json.uid);
        
       console.log(user.license_type_id);
        if(user)
        {
          //and home_kpi.created_at between '"+from_date+"' and '"+to_date+"'
          var query;
        query = "select home_kpi.kpi_name,home_kpi.tiles_unit,home_kpi.tiles_title,home_kpi.tiles_sub_title,home_kpi.created_at,license_type.license_code,license_type.license_type_description,license_type.base_cost_per_month,'' as avg_response,'' as total_response from home_kpi left join license_type on license_type.id=home_kpi.license_type_id where home_kpi.license_type_id="+user.license_type_id;
        const Home = await sequelize.query(query, {
          model: HomeKpi,
          mapToModel: false // pass true here if you have any mapped fields 
        });
        var total_data = Home.length;
        
        //for(var i=0;i<total_data;i++) {
          query1 = "SELECT sum(rating) as s,count(*) as c,round(sum(rating)/count(*),2) as avg FROM rating_response where created_at between '"+from_date+"' and '"+to_date+"'";
          const ResponseData = await sequelize.query(query1, {
            model: RatingResponse,
            mapToModel: false // pass true here if you have any mapped fields 
          });
         
          Home[0].dataValues.total_response = ResponseData[0]._previousDataValues.c;
          Home[0].dataValues.avg_response = (ResponseData[0]._previousDataValues.avg)?(ResponseData[0]._previousDataValues.avg):0;
        
       //console.log(Home[0].dataValues.kpi_name); 
        //}
         
        
      //       var ResponseData = await RatingResponse.findAll({
      //         where:{
      //           business_owner:user.license_type_id
      //         }
      //     });
      //     var total_data = ResponseData.length;
      //     var total_rating = 0;
      //     for(var i=0;i<total_data;i++) {
      //     // total_rating += parseFloat(ResponseData[i].rating);
           
      //     }
      //    // avg_response :avg.toFixed(2),
      //    // total_response :total_data
      //     var avg = total_rating/total_data;
      //     var model = {
      //       result:Home
           
            
      // }
            responseModel(200,Home,"success",res);
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
const getresponsedetails = async (req,res) => {
  try {
    const {from_date,to_date }=req.body;
      var {token} = req.headers;
      var json = jwt.decode(token);
      var user = await check_user_by_id(json.uid);
     //console.log(user.license_type_id);
      if(user)
      {
        var query;
        query = "SELECT rating_response.rating,rating_response.text as user_comment,users.fname,users.lname,rating_response.created_at FROM rating_response left join users on users.id=rating_response.user_id where rating_response.created_at between '"+from_date+"' and '"+to_date+"'";
        const ResponseData = await sequelize.query(query, {
          model: RatingResponse,
          mapToModel: true // pass true here if you have any mapped fields 
        });
       // var ResponseData = RatingResponse.belongsTo(User, {foreignKey: 'user_id'});
        //   var ResponseData = await RatingResponse.findAll({
        //     //join to User table
        //     // include: [{
        //     //   model: User,
        //     //   required: true
        //     //  }],
        //     where:{
        //       business_owner:user.license_type_id,
        //       created_at: {
        //         [Op.between]: [from_date, to_date]
        //       }
        //     }
          
        // });
       
        
          responseModel(200,ResponseData,"success",res);
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
const getFontFamily = async (req,res) => {
  try {
    
      var {token} = req.headers;
      var json = jwt.decode(token);
      var user = await check_user_by_id(json.uid);
      
      if(user)
      {
        const FontFamilyData = await FontFamily.findAll({
          where:{
            status:1
              
          }
      });
          responseModel(200,FontFamilyData,"success",res);
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

const getBusinessVisitSetting = async (req,res) => {
  try {
    
      var {token} = req.headers;
      var json = jwt.decode(token);
      var user = await check_user_by_id(json.uid);
      
      if(user)
      {

        var query;
        query = "select b.*,f.font_family from business_visit_setting as b left join font_family as f on f.id=b.FontFamilyId";
        const ResponseData = await sequelize.query(query, {
          model: BusinessVisitSetting,
          mapToModel: true // pass true here if you have any mapped fields 
        });
        
          responseModel(200,ResponseData,"success",res);
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
const saveFontFamily = async (req,res) => {
  try {
    const {font_family} = req.body;
      var {token} = req.headers;
      var json = jwt.decode(token);
      var user = await check_user_by_id(json.uid);
      
      if(user)
      {
        const storeData = {
          font_family:font_family,
          status:1
      }
      await FontFamily.create(storeData).then((rs)=>{
      })
          responseModel(200,'',"success",res);
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
const saveBusinessVisitSetting = async (req,res) => {
  try {
    const {PrinaryColor,SecondaryColor,FontFamilyId,AutoPublishReview,ValidFrom,ValidTo} = req.body;
      var {token} = req.headers;
      var json = jwt.decode(token);
      var user = await check_user_by_id(json.uid);
      
      if(user)
      {
        const storeData = {
          PrinaryColor:PrinaryColor,
          SecondaryColor:SecondaryColor,
          FontFamilyId:FontFamilyId,
          AutoPublishReview:AutoPublishReview,
          ValidFrom:ValidFrom,
          ValidTo:ValidTo,
          status:1
      }
      await BusinessVisitSetting.create(storeData).then((rs)=>{
      })
          responseModel(200,'',"success",res);
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
const getSocialInstantMsgApis = async (req,res) => {
  try {
    
      var {token} = req.headers;
      var json = jwt.decode(token);
      var user = await check_user_by_id(json.uid);
      
      if(user)
      {
        query = "SELECT s.*,m.social_media_name FROM social_instant_msg_apis as s left join master_social m on m.id=s.master_social_id ";
        const data = await sequelize.query(query, {
          model: SocialInstantMsgApis,
          mapToModel: false // pass true here if you have any mapped fields 
        });
          responseModel(200,data,"success",res);
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
    gethomekpi,
    getresponsedetails,
    getFontFamily,
    getBusinessVisitSetting,
    saveFontFamily,
    saveBusinessVisitSetting,
    getSocialInstantMsgApis
    
  
};
