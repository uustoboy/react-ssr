let Router = require('koa-router');
let router = new Router();
const webpack = require('webpack');

const ReactDomServer = require('react-dom/server');
const axios = require('axios');
const MemoryFs = require('memory-fs');
const path = require('path');
let  proxy = require('http-proxy-middleware');
const Module = module.constructor;

const mfs = new MemoryFs; 
 
const serverConfig = require('../../build/webpack.config.server.js');
const getTemplate = () => {
	return new Promise((resolve, reject)=>{
		axios.get('http://localhost:8888/index.html').then(res => {
			resolve(res.data)
		})
	}).catch(reject)
}

const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs
let serverBudle;
serverCompiler.watch({},(err, stats) => {
	if(err) t hrow err;
	data = stats.toJson()
	stats.errors.forEach(err => console.error(err));
	stats.warnings.forEach(warn => console.error(warn));
	const hundlePath = path.join(
		serverConfig.output.path,
		serverConfig.output.filename
	)
	const bundle = mfs.readFileSync(hundlePath, 'utf-8');
	const m = new Module();
	console.log(bundle)
	m._compile(bundle,'server-entry.js);
	serverBudle = m.exports.default;
}) 
module.exports = function(app){
	// app.use('/public',proxy({
	// 	target: 'http://localhost:8888'
	// }))
	app.use('/',proxy({
		target: 'http://localhost:8888'
	}))
	router.get('*',async (ctx, next) => {
		getTemplate().then(template => {
			const content = ReactDomServer.renderToString(serverBudle );
			template = template.replace('<!-- app -->',content);
	  		ctx.body = template;
		})
	})
}