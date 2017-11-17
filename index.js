let Router = require('koa-router');
let config = require('./config');

let router = new Router();

router.get('/info', function(ctx){

    ctx.body = {

        version: config.version

    };

})

module.exports = router;