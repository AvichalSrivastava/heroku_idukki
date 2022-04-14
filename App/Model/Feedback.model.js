const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define('feedback',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_id : {
        type: Sequelize.STRING
      },
      business_customer_id: {
        type: Sequelize.STRING
      },
      star_rating: {
        type: Sequelize.STRING
      },
      onscale_id : {
        type: Sequelize.STRING
      },
      rating_question : {
        type: Sequelize.STRING
      },
      rating_type : {
        type: Sequelize.STRING
      },
      feedback_text : {
        type: Sequelize.STRING
      },
      feedback_question : {
        type: Sequelize.STRING
      },
      created_at : {
        type: Sequelize.DATE
      }
      
      
    },{
        tableName: 'feedback',
        timestamps: false,
        
    });

    return Feedback;
};


