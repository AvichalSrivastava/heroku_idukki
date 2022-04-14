const userController = require('../Controller/user.controller');
const reademail = require('../Controller/ReadInbox.Controller');
const responseController = require('../Controller/Response.Cotroller');
const emailController = require('../Controller/Email.controller');
const home = require('../Controller/Home.Controller');



module.exports = (app) => {
    var router = require("express").Router();
    router.post("/user_registration",userController.user_registration);
    router.post("/email_verify",userController.email_verify);
    
    router.post("/multi_rating_submit",userController.multi_rating_submit);
    router.get("/get_response",responseController.get_response);
    router.post("/getprofile",userController.getprofile);
    router.post("/updateprofile",userController.updateprofile);
    router.post("/changepassword",userController.changepassword);
    router.post("/login",userController.userlogin);
    router.post("/checkuserbyusername",userController.checkuserbyusername);
    router.post("/verifyforgotlink",userController.verifyforgotlink);
    router.post("/changeforgotpassword",userController.changeforgotpassword);
    router.get("/masterdata",userController.masterdata);
    //email route
    router.post("/singleQuestion",emailController.singleQuestion);
    router.post("/multipleQuestion",emailController.multipleQuestion);
    router.post("/rating_submit",emailController.rating_submit);
    router.post("/sendmailbycsv",emailController.sendmailbycsv);
    //Home route
    router.post("/homekpi",home.gethomekpi);
    router.post("/getresponsedetails",home.getresponsedetails);
    router.get("/getFontFamily",home.getFontFamily);
    router.get("/getBusinessVisitSetting",home.getBusinessVisitSetting);
    router.post("/saveFontFamily",home.saveFontFamily);
    router.get("/saveBusinessVisitSetting",home.saveBusinessVisitSetting);
    router.post("/getSocialInstantMsgApis",home.getSocialInstantMsgApis);

   router.post("/takecall",reademail.takecall);
   

 

    app.use("/", router);
};
