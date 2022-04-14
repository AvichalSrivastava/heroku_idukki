const { DataTypes } = require("sequelize");
const { User } = require(".");
const { imagePaths } = require("../../DatabaseConfig/app.config");
module.exports = (sequelize, Sequelize) => {
    const HomeKpi = sequelize.define('home_kpi',{

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      license_type_id : {
        type: Sequelize.STRING
      },
      kpi_name: {
        type: Sequelize.STRING
      },
      kpi_id: {
        type: Sequelize.STRING
      },
      
      tiles_type: {
        type: Sequelize.STRING
      },
      tiles_unit: {
        type: Sequelize.STRING
      },
      tiles_title: {
        type: Sequelize.STRING
      },
      tiles_sub_title: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
      },
      updated_at: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
      
     
      
    },{
        tableName: 'home_kpi',
        timestamps: false,
        scopes:{
          active:{
            where:{status:1}
          },
        }
    });

    return HomeKpi;
};


