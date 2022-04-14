const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      role_id : {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      hash: {
        type: Sequelize.STRING
      },
      fb_link: {
        type: Sequelize.STRING
      },
      twitter_link: {
        type: Sequelize.STRING
      },
      linkedin_link: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      changed_at: {
        type: Sequelize.STRING
      },
      changed_by: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      email_verify:{
        type: Sequelize.STRING
      },
      type:{
        type: Sequelize.STRING
      },
      no_of_emp:{
        type: Sequelize.STRING
      },
      revenue:{
        type: Sequelize.STRING
      },
      industry:{
        type: Sequelize.STRING
      },
      address1:{
        type: Sequelize.STRING
      },
      address2:{
        type: Sequelize.STRING
      },
      address3:{
        type: Sequelize.STRING
      },
      country:{
        type: Sequelize.STRING
      },
      pincode:{
        type: Sequelize.STRING
      },
      clientName:{
        type: Sequelize.STRING
      },
      deviceId:{
        type: Sequelize.STRING
      },
      license_type_id:{
        type: Sequelize.STRING
      }
     
      
    },{
        tableName: 'users',
        timestamps: false,
        scopes:{
          active:{
            where:{status:1}
          },
        }
    });
    //for associate with Rating response and user table
    User.associate = function(models) {
      Rating_response.belongsTo(models.User, {foreignKey: 'id'});

  }
    return User;
};


