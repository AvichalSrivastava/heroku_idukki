module.exports = {
  HOST: "us-cdbr-east-04.cleardb.com",//"localhost"
  USER: "b7d8f210f6b136",//"root"
  PASSWORD: "98684788",//""
  DB: "heroku_ae2eb40bf9e6945",//"dev1"
  dialect: "mysql", //"mysql"
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// module.exports = {
//   HOST: "localhost",//"localhost"
//   USER: "root",//"root"
//   PASSWORD: "",//""
//   DB: "dev1",//"dev1"
//   dialect: "mysql", //"mysql"
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
