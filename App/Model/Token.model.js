const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define('token',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_id : {
        type: Sequelize.STRING
      },
      iv: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      }
      
      
    },{
        tableName: 'token',
        timestamps: false,
        
    });

    return Token;
};


