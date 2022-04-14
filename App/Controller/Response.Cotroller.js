
const db = require("../Model/index");
const moment = require("moment");
const { successRes, failedRes } = require("../helper/response.helper");
const {sendMail} = require("../helper/mail.helper");
const { Feedback } = db;
const { encrypt, decrypt } = require('../helper/en');
const { Op } = require("sequelize");



//Response filter
const get_response = async (req,res) => {
    const {business_customer_id,from,to,pics }=req.body;
    Feedback.findAll({ where: 
        {
             business_customer_id: business_customer_id, 
             created_at: {
                [Op.between]: [from, to]
            }
        }
     }).then((data) => {
       if(data.length != 0) {
        const data = {
          result:data,
          status:true,
          message:"Found!"
    
        } 
        res.send(data);
       } else {
        const data = {
          status:false,
          message:"no data found!"
    
        }
        res.send(data);
      }
         //console.log(data);
     
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
    
  
}






module.exports = {
    get_response
  
  
};
