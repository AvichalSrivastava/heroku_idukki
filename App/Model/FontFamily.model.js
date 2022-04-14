const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const FontFamily = sequelize.define('FontFamily',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      font_family : {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      }
      
    },{
        tableName: 'font_family',
        timestamps: false,
        scopes:{
          active:{
            where:{IsActive:1}
          },
        }
    });

    return FontFamily;
};


