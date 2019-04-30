const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// const db = require('./db.json')
// const users = db.login;

const process = require('./process-data')

// 设置默认的中间件 (logger, static, cors and no-cache)
server.use(middlewares)

/**
 * 可以把整个路由挂载到另外一个地址
 * server.use('/data', router);
 * 即，所有/data/*的请求，都等同于/*请求。
 */

//在JSON Server router之前添加自定义路由
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })

/**
 * 你需要使用一个body-parser来处理POST，PUT和PATCH
 * 你可以使用JSON Server使用的那个 
 */
server.use(jsonServer.bodyParser)

/**
 * next():表示继续json-server路由
 * 可编写自己的逻辑处理，及自定义返回结果
 */
server.use((req, res, next) => {
    // console.log(req.url)
    let data = process.login(req.body);
    
    res.statusCode = data.code; //返回状态码
    res.jsonp({ //返回结果数据
        result:{
          code:data.code,
          msg:data.msg,
          admin:data.admin 
        }
    });

    // 表示继续json-server路由
    //   next();

  });
 
/**
 * 修改响应,自定义响应后返回的结果
 */
// router.render = (req,res) => {
//     res.jsonp({
//         msg:"登录成功！"
//     })
//     // res.status(201).jsonp({
//     //     msg:"登录成功！"
//     // })
// }

// 使用默认路由
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
});