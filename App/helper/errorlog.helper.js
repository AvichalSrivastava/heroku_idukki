const nodemailer = require('nodemailer');
const db = require("../Model/index");

const { Errorlog } = db;

const geterrorlog =async (page) => {
    return await Errorlog.findOne({
        where:{
            page:page
            
        }
    })
  }
const geterror = (page) => {
    
    const data = geterrorlog(page);
    return data;
}





exports.geterror=geterror;
