const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cp = require('child_process');

const config = require('./config');

let index = require('./index');

let app = new Koa();

app.use(bodyParser({
	jsonLimit: '1mb',
    formLimit: '1mb'
}));

app.use( index.routes() );
cp.fork('./email/email.js');

let port = config.port;

app.listen(port,function(){
    console.log(' Email Service is running on port ' + port);
});