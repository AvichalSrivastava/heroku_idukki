const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const Errorlog = sequelize.define('Errorlog',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      page : {
        type: Sequelize.STRING
      },
      error_code: {
        type: Sequelize.STRING
      },
      error_message: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      }
    },{
        tableName: 'error_log',
        timestamps: false,
        scopes:{
          active:{
            where:{IsActive:1}
          },
        }
    });

    return Errorlog;
};


