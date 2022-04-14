
const db = require("../Model/index");
const moment = require("moment");
const { successRes, failedRes } = require("../helper/response.helper");
const {sendMail} = require("../helper/mail.helper");
const { User,EmailTemplate,Token,Rating } = db;
const { encrypt, decrypt } = require('../helper/en');






var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
var Promise = require("bluebird");
Promise.longStackTraces();

var imapConfig = {
    user: 'bavimatech@gmail.com',
    password: 'Password@123',
    host: 'smtp.gmail.com',
    port: 587,
    tls: true
};
function takecall() {
  
var imap = new Imap(imapConfig);

Promise.promisifyAll(imap);

imap.once("ready", execute);

imap.once("error", function(err) {
    console.log("5");
   console.log("Connection error: " + err);
});

imap.connect();

}
function execute() {
    imap.openBox("INBOX", false, function(err, mailBox) {
        if (err) {
            console.error(err);
            return;
        }
        imap.search(["UNSEEN"], function(err, results) {
            if(!results || !results.length){console.log("No unread mails");imap.end();return;}
            /* mark as seen
            imap.setFlags(results, ['\\Seen'], function(err) {
                if (!err) {
                    console.log("marked as read");
                } else {
                    console.log(JSON.stringify(err, null, 2));
                }
            });*/

            var f = imap.fetch(results, { bodies: "" });
            f.on("message", processMessage);
            f.once("error", function(err) {
                return Promise.reject(err);
            });
            f.once("end", function() {
                console.log("Done fetching all unseen messages.");
                imap.end();
            });
        });
    });
}


function processMessage(msg, seqno) {
    console.log("Processing msg #" + seqno);
    // console.log(msg);

    var parser = new MailParser();
    parser.on("headers", function(headers) {
        console.log("Header: " + JSON.stringify(headers));
    });

    parser.on('data', data => {
        if (data.type === 'text') {
            console.log(seqno);
            console.log(data.text);  /* data.html*/
        }

        // if (data.type === 'attachment') {
        //     console.log(data.filename);
        //     data.content.pipe(process.stdout);
        //     // data.content.on('end', () => data.release());
        // }
     });

    msg.on("body", function(stream) {
        stream.on("data", function(chunk) {
            parser.write(chunk.toString("utf8"));
        });
    });
    msg.once("end", function() {
        // console.log("Finished msg #" + seqno);
        parser.end();
    });
}












const read_inbox = async (req,res) => {
  console.log("g");
}

module.exports = {
  read_inbox,
  takecall
  
  
};
