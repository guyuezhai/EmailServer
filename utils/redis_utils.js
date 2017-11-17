const redis = require('redis');
const util = require('util');
const redisWrapper = require('co-redis');
const config = require('../config');

const redisConf = config.cache;

let client;

const initClient = () => {

    let redisClient = redis.createClient( redisConf.port, redisConf.host );

    client = redisWrapper( redisClient );

    redisClient.on( 'error', err => {

        console.log( 'redis创建失败' );

        return initClient();

    })
}

const lpop = async function(key, callback){
    
    if(!client) initClient();

    return await client.lpop(key);

}

exports.lpop = lpop;


