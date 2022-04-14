const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const BusinessVisitSetting = sequelize.define('BusinessVisitSetting',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      PrinaryColor : {
        type: Sequelize.STRING
      },
      SecondaryColor : {
        type: Sequelize.STRING
      },
      FontFamilyId  : {
        type: Sequelize.STRING
      },
      AutoPublishReview : {
        type: Sequelize.STRING
      },
      ValidFrom : {
        type: Sequelize.STRING
      },
      ValidTo : {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      }
      
    },{
        tableName: 'business_visit_setting',
        timestamps: false,
        scopes:{
          active:{
            where:{IsActive:1}
          },
        }
    });

    return BusinessVisitSetting;
};


