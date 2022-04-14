const dbConfig=require('../../DatabaseConfig/dbConfig');
const Sequelize=require('sequelize');
const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
   // operatorsAliases: false,
   
   dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};



db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./user.model.js")(sequelize, Sequelize);
db.EmailTemplate = require("./emailTemplate.model.js")(sequelize, Sequelize)
db.Token = require("./Token.model.js")(sequelize, Sequelize)

db.Feedback = require("./Feedback.model.js")(sequelize, Sequelize)
db.Errorlog = require("./Errorlog.model.js")(sequelize, Sequelize)
db.CommonMaster = require("./CommomMaster.model.js")(sequelize, Sequelize)
db.HomeKpi = require("./HomeKpi.model.js")(sequelize, Sequelize)
db.RatingResponse = require("./StarResponse.model.js")(sequelize, Sequelize)
db.FontFamily = require("./FontFamily.model.js")(sequelize, Sequelize)
db.BusinessVisitSetting = require("./BusinessVisitSetting.model.js")(sequelize, Sequelize)
db.SocialInstantMsgApis = require("./SocialInstantMsgApis.model.js")(sequelize, Sequelize)















module.exports = db;
