const Koa = require('koa');
const app = new Koa();
let Router = require('koa-router');
const static = require('koa-static');
//const static = require('koa-static-router');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-entry.js').default;
let router = new Router();
let fs = require('fs');
let path = require('path');
let template = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf8');

// //设置静态资源的路径 
const staticPath = '../dist/';
app.use(static(
  path.join( __dirname,  staticPath)
))
// app.use(static({
//     dir: path.join( __dirname,  staticPath),    //静态资源目录对于相对入口文件index.js的路径
//     router: '/public/'   //路由命名   路由长度 =2
//  }))


router.get('/', async (ctx, next) => {
  const appString = await ReactSSR.renderToString(serverEntry);
  console.log(appString)
  console.log(path.join( __dirname,  staticPath))
  template = template.replace('<app></app>',appString);
  ctx.body = template;
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3333,() => {
	console.log('http://localhost:3333');
});