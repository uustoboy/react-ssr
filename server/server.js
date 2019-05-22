const Koa = require('koa');
const app = new Koa();
let Router = require('koa-router');
const static = require('koa-static');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-entry.js').default;
let router = new Router();
let fs = require('fs');
let path = require('path');

const isDev = process.env.NODE_ENV = 'development';

// //设置静态资源的路径 
// const staticPath = '../dist/';
// app.use(static(
//   path.join( __dirname,  staticPath)
// ))

if(!isDev){
	let template = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf8');
	const staticPath = '../dist/';
	app.use(static(
	  path.join( __dirname,  staticPath)
	))
	router.get('/', async (ctx, next) => {
	  const appString = await ReactSSR.renderToString(serverEntry);
	  console.log(appString)
	  console.log(path.join( __dirname,  staticPath))
	  template = template.replace('<!-- app -->',appString);
	  ctx.body = template;
	});

}else{
	const devStatic = require('./util/dev-static');
	devStatic(app,);
}




app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3333,() => {
	console.log('http://localhost:3333');
});