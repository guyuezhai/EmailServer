const nodemailer = require('nodemailer');
const RegUtils = require('./reg_utils');
const config = require('../config');

const HOST = config.email.host;
const PORT = config.email.port;
const USER = config.email.from;
const PASS = config.email.authorizationCode;

const params = {
    host: HOST,
    port: PORT,
    auth: {
        user: USER,
        pass: PASS
    }
}

const transporter = nodemailer.createTransport(params);

const send = async function(fromEmail, name, toEmail, subject, content){

    if(!fromEmail || !toEmail || !subject || !content || !name){
        console.error('必要参数不存在！');
        return;
    }
    if(!RegUtils.isEmail(fromEmail) || !RegUtils.isEmail(toEmail)){
        console.error('参数不合法');
        return;
    }
   
    let mail = {
  
        from: `${name}<${fromEmail}>`,
        to: toEmail,
        subject: subject,
        html: content
    
    }

    return  transporter.sendMail( mail )
            .then(function(data){
                console.log(data);
                return true;
            })
            .catch(function(err){
                console.error(err);
                return false
            });

   
}

module.exports = {
    send
}