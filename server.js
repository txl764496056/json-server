const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
const process = require('./process-data')

// 设置默认的中间件 (logger, static, cors and no-cache)
server.use(middlewares)
 
/**
 * 可以把整个路由挂载到另外一个地址
 * server.user('/data',router)
 * 即，所有 /data/* 的请求，都等同于 /*请求
 */
 
/**
 * 你需要使用一个body-parser来处理POST,PUT和PATCH
 * 你可以使用JSON Server使用的那个
 */
server.use(jsonServer.bodyParser)

/**
 * 在JSON Server router之前添加自定义路由，
 * 在 server.use(jsonServer.bodyParser) 之后，才能接受参数
 * 即，除了db.json里的api之外,访问 http://localhost:3000/echo 也可以（自定义api）
 */
// 登录 post
server.post('/login', (req, res) => {
  let data = process.login(req.body);
  res.statusCode = data.code; //返回状态码
  res.jsonp({
      ...data
  })
  
});
// 登录 get
server.get('/login', (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let data = process.getAdmin(token);
  res.statusCode = data.code; //返回状态码
  res.jsonp({
      ...data
  })
  
});

// 分页数据
server.get('/business/search',(req,res) => {
  let data = process.list(req.query);
  res.statusCode = data.code; //返回状态码
  res.jsonp({
    ...data
  })
});

/**
 * next()：表示继续json-server路由
 * 可编写自己的逻辑处理，及自定义返回结果
 */
// server.use((req, res, next) => {
//   // 表示继续json-server路由
//   // next()
// })

/**
 * 修改响应，自定义响应，返回结果
 */
// router.render = (req,res)=>{
//     res.jsonp({msg:"登录成功！"});
//     // res.status(201).jsonp({msg:"登录成功！"})
// }
 
// 使用默认路由
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
});