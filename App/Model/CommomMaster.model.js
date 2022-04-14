const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const CommonMaster = sequelize.define('CommonMaster',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      text : {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      }
      
    },{
        tableName: 'common_master',
        timestamps: false,
        scopes:{
          active:{
            where:{IsActive:1}
          },
        }
    });

    return CommonMaster;
};


