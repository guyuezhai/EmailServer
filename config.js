module.exports = {
    
    name: 'send-email',
    version: '1.0.0',
    port: 5007,
    intervalTime: 5000,

    cache: {
        host: 'localhost',
        port: 6379
    },

    email:{
        host: 'smtp.163.com',
        port:  465,
        from: 'from@163Email', // sender address
        authorizationCode: '发邮箱授权密码',
        queueEmail: "queue_email"  //邮件消息队列
  
    }
    
}

    