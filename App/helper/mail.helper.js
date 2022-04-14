const nodemailer = require('nodemailer');

const sendMail = (subject,body,email,sender_name,sender_email,reply_to_email) => {

   
    console.log('Email message hitting');
   // console.log(template);
    async function main(){
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'bravimatechtest1@Gmail.com',
                pass: 'Idukki@1'
            }
        });
   //{ name: sender_name, address: sender_email } "'"+sender_name+" <"+sender_email+">'",
        let info = await transporter.sendMail({
            from:  'bravimatechtest1@Gmail.com',
            to:email,
            replyTo:reply_to_email,
            subject: subject,
            html: body,
         
           
        })
       // return info.messageId;
        console.log("Message sent: %s",info.messageId);
       console.log("'"+sender_name+" "+sender_email+"'"+" "+reply_to_email);
   
       // res.status(200).send({
           // message: "Mail sent"
       // });
    }
    main().catch(console.error);

}





exports.sendMail=sendMail;
