const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const Emailtemplate = sequelize.define('Emailtemplate',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      type : {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      sender_email: {
        type: Sequelize.STRING
      },
      sender_name: {
        type: Sequelize.STRING
      },
      reply_to_email: {
        type: Sequelize.STRING
      },
      business_owner: {
        type: Sequelize.STRING
      },
      question_type: {
        type: Sequelize.STRING
      },
      header: {
        type: Sequelize.STRING
      },
      footer: {
        type: Sequelize.STRING
      },
      IsActive: {
        type: Sequelize.STRING
      }
      
    },{
        tableName: 'emailtemplate',
        timestamps: false,
        scopes:{
          active:{
            where:{IsActive:1}
          },
        }
    });

    return Emailtemplate;
};


