const EmailUtils = require('../utils/email_utils');
const RegUtils = require('../utils/reg_utils');
const RedisUtils = require('../utils/redis_utils');

const config = require( "../config");

const FROM = config.email.from;
const QUEUE_EMAIL = config.email.queueEmail;
const intervalTime = config.intervalTime | 1000;

const sendEmail = async function(from, name, to, subject, content){
    
    if(!from || !name || !to || !subject || !content){

        console.error('必要参数不存在！');
        return;
    }
    if(!RegUtils.isEmail(from) || !RegUtils.isEmail(to)){

        console.error('参数不合法');
        return;
    }

    let result = await EmailUtils.send(from, name, to, subject, content);

    if(result){

        console.log('发送成功！');
        return;
    }

    console.log('发送失败！');
    return;

}

setInterval( async function(){

    let queueEmail = await RedisUtils.lpop(QUEUE_EMAIL);
    
    if(queueEmail){
        
        let queueMsg = JSON.parse(queueEmail);
        let name = queueMsg.name;
        let toEmail = queueMsg.toEmail;
        let subject = queueMsg.subject;
        let emailContent = queueMsg.content;
        name = name?name:'默认主题名';
        return await sendEmail(FROM, name, toEmail, subject, emailContent);
        
    }

}, intervalTime);
