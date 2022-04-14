const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const RatingResponse = sequelize.define('rating_response',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_id : {
        type: Sequelize.STRING
      },
      
      rating: {
        type: Sequelize.STRING
      },
      text:{
        type: Sequelize.STRING
      },
      business_owner: {
        type: Sequelize.STRING
      },
      created_at:{
        type: Sequelize.STRING
      }
      
    },{
        tableName: 'rating_response',
        timestamps: false,
        
    });

    return RatingResponse;
};


