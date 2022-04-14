const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const SocialInstantMsgApis = sequelize.define('SocialInstantMsgApis',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      master_social_id  : {
        type: Sequelize.STRING
      },
      
      status: {
        type: Sequelize.STRING
      },
      created_at:{
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      updated_at:{
        type: Sequelize.STRING
      },
      updated_by:{
        type: Sequelize.STRING
      },
      api_end_points:{
        type: Sequelize.STRING
      },
      token:{
        type: Sequelize.STRING
      }
      
    },{
        tableName: 'social_instant_msg_apis',
        timestamps: false,
        
    });

    return SocialInstantMsgApis;
};


